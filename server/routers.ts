import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { 
  createLead, 
  getLeadById, 
  getLeadByEmail, 
  getAllLeads, 
  updateLeadStatus, 
  updateLeadSimulatorResults,
  createDemoRequest,
  getAllDemoRequests,
  updateDemoRequestStatus
} from "./db";
import { notifyOwner } from "./_core/notification";

// Schéma de validation pour la création d'un lead
const createLeadSchema = z.object({
  prenom: z.string().min(1, "Le prénom est requis"),
  nom: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().optional(),
  entreprise: z.string().min(1, "L'entreprise est requise"),
  poste: z.string().optional(),
  codeNaf: z.string().optional(),
  secteur: z.string().optional(),
  tailleEntreprise: z.string().optional(),
  adresse: z.string().optional(),
  codePostal: z.string().optional(),
  ville: z.string().optional(),
  source: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  consentementMarketing: z.boolean().optional(),
  consentementContact: z.boolean().optional(),
});

// Schéma pour la mise à jour des résultats du simulateur
const updateSimulatorResultsSchema = z.object({
  leadId: z.number(),
  risquesIdentifies: z.any(),
  modulesRecommandes: z.any(),
  scoreExposition: z.number(),
});

// Schéma pour la demande de démo
const createDemoRequestSchema = z.object({
  leadId: z.number().optional(),
  prenom: z.string().min(1),
  nom: z.string().min(1),
  email: z.string().email(),
  telephone: z.string().optional(),
  entreprise: z.string().min(1),
  datePreferee: z.string().optional(),
  creneauPrefere: z.string().optional(),
  modulesInteresses: z.array(z.string()).optional(),
  message: z.string().optional(),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Routes pour la gestion des leads
  leads: router({
    // Créer un nouveau lead (public - pour le formulaire)
    create: publicProcedure
      .input(createLeadSchema)
      .mutation(async ({ input }) => {
        // Vérifier si le lead existe déjà
        const existingLead = await getLeadByEmail(input.email);
        if (existingLead) {
          return { 
            success: true, 
            lead: existingLead, 
            isExisting: true,
            message: "Vous êtes déjà enregistré. Accès au simulateur autorisé." 
          };
        }

        // Créer le nouveau lead
        const lead = await createLead(input);

        // Notifier le propriétaire (David Museur)
        try {
          await notifyOwner({
            title: `🎯 Nouveau lead LENAXIS: ${input.prenom} ${input.nom}`,
            content: `
**Nouveau prospect capturé via le site LENAXIS**

👤 **Contact:**
- Nom: ${input.prenom} ${input.nom}
- Email: ${input.email}
- Téléphone: ${input.telephone || 'Non renseigné'}
- Poste: ${input.poste || 'Non renseigné'}

🏢 **Entreprise:**
- Nom: ${input.entreprise}
- Secteur: ${input.secteur || 'Non renseigné'}
- Code NAF: ${input.codeNaf || 'Non renseigné'}
- Taille: ${input.tailleEntreprise || 'Non renseigné'}

📍 **Localisation:**
- Adresse: ${input.adresse || 'Non renseigné'}
- Code postal: ${input.codePostal || 'Non renseigné'}
- Ville: ${input.ville || 'Non renseigné'}

📊 **Source:** ${input.source || 'Simulateur'}

---
*Connectez-vous au dashboard LENAXIS pour voir les détails complets et contacter ce prospect.*
            `.trim()
          });
        } catch (error) {
          console.error("Failed to notify owner:", error);
        }

        return { 
          success: true, 
          lead, 
          isExisting: false,
          message: "Merci pour votre inscription ! Accès au simulateur autorisé." 
        };
      }),

    // Mettre à jour les résultats du simulateur
    updateSimulatorResults: publicProcedure
      .input(updateSimulatorResultsSchema)
      .mutation(async ({ input }) => {
        const lead = await updateLeadSimulatorResults(
          input.leadId,
          input.risquesIdentifies,
          input.modulesRecommandes,
          input.scoreExposition
        );
        return { success: true, lead };
      }),

    // Récupérer un lead par email (pour vérifier si déjà inscrit)
    checkEmail: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .query(async ({ input }) => {
        const lead = await getLeadByEmail(input.email);
        return { exists: !!lead, lead };
      }),

    // Routes admin (protégées)
    list: protectedProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ input }) => {
        const leads = await getAllLeads(input?.limit || 100);
        return leads;
      }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const lead = await getLeadById(input.id);
        return lead;
      }),

    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        statut: z.enum(["nouveau", "contacte", "qualifie", "converti", "perdu"]),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const lead = await updateLeadStatus(input.id, input.statut, input.notes);
        return { success: true, lead };
      }),
  }),

  // Routes pour les demandes de démo
  demoRequests: router({
    create: publicProcedure
      .input(createDemoRequestSchema)
      .mutation(async ({ input }) => {
        // Si pas de leadId, créer d'abord un lead
        let leadId = input.leadId;
        
        if (!leadId) {
          const existingLead = await getLeadByEmail(input.email);
          if (existingLead) {
            leadId = existingLead.id;
          } else {
            const newLead = await createLead({
              prenom: input.prenom,
              nom: input.nom,
              email: input.email,
              telephone: input.telephone,
              entreprise: input.entreprise,
              source: "demande_demo",
            });
            leadId = newLead.id;
          }
        }

        // Créer la demande de démo
        const demoRequest = await createDemoRequest({
          leadId,
          datePreferee: input.datePreferee ? new Date(input.datePreferee) : undefined,
          creneauPrefere: input.creneauPrefere,
          modulesInteresses: input.modulesInteresses,
          message: input.message,
        });

        // Notifier le propriétaire
        try {
          await notifyOwner({
            title: `📅 Nouvelle demande de démo LENAXIS: ${input.prenom} ${input.nom}`,
            content: `
**Nouvelle demande de démonstration LENAXIS**

👤 **Contact:**
- Nom: ${input.prenom} ${input.nom}
- Email: ${input.email}
- Téléphone: ${input.telephone || 'Non renseigné'}
- Entreprise: ${input.entreprise}

📅 **Préférences:**
- Date souhaitée: ${input.datePreferee || 'Non spécifié'}
- Créneau: ${input.creneauPrefere || 'Non spécifié'}

🎯 **Modules intéressés:** ${input.modulesInteresses?.join(', ') || 'Non spécifié'}

💬 **Message:**
${input.message || 'Aucun message'}

---
*Contactez ce prospect rapidement pour planifier la démonstration.*
            `.trim()
          });
        } catch (error) {
          console.error("Failed to notify owner:", error);
        }

        return { success: true, demoRequest };
      }),

    // Routes admin
    list: protectedProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ input }) => {
        const requests = await getAllDemoRequests(input?.limit || 100);
        return requests;
      }),

    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        statut: z.enum(["en_attente", "planifiee", "realisee", "annulee"]),
        dateDemo: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await updateDemoRequestStatus(
          input.id, 
          input.statut, 
          input.dateDemo ? new Date(input.dateDemo) : undefined
        );
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
