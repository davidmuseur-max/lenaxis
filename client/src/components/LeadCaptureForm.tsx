import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Building2, Briefcase, MapPin, CheckCircle, Loader2, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";

interface LeadCaptureFormProps {
  onSuccess: (leadId: number) => void;
  source?: string;
  sector?: string;
  title?: string;
  subtitle?: string;
}

const sectors = [
  { id: "industrie", name: "Industrie" },
  { id: "agroalimentaire", name: "Agroalimentaire" },
  { id: "transport", name: "Transport & Logistique" },
  { id: "sante", name: "Santé & Pharma" },
  { id: "energie", name: "Énergie & Environnement" },
  { id: "commerce", name: "Commerce & Distribution" },
  { id: "finance", name: "Assurance & Finance" },
  { id: "btp", name: "BTP & Construction" },
  { id: "autre", name: "Autre" },
];

const tailleOptions = [
  { id: "tpe", name: "TPE (< 10 salariés)" },
  { id: "pme", name: "PME (10-250 salariés)" },
  { id: "eti", name: "ETI (250-5000 salariés)" },
  { id: "ge", name: "Grande Entreprise (> 5000)" },
];

export default function LeadCaptureForm({ 
  onSuccess, 
  source = "simulateur",
  sector,
  title = "Accédez au simulateur d'exposition aux risques",
  subtitle = "Remplissez ce formulaire pour découvrir votre niveau d'exposition et les solutions LENAXIS adaptées à votre entreprise."
}: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    entreprise: "",
    poste: "",
    secteur: sector || "",
    tailleEntreprise: "",
    consentementMarketing: false,
    consentementContact: true,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const createLead = trpc.leads.create.useMutation({
    onSuccess: (data) => {
      setSubmitSuccess(true);
      if (data.lead?.id) {
        setTimeout(() => {
          onSuccess(data.lead.id);
        }, 1500);
      }
    },
    onError: (error) => {
      setErrors({ submit: error.message });
      setIsSubmitting(false);
    },
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis";
    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.entreprise.trim()) newErrors.entreprise = "L'entreprise est requise";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrors({});
    
    createLead.mutate({
      ...formData,
      source,
    });
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Merci {formData.prenom} !</h3>
        <p className="text-gray-600 mb-4">
          Votre inscription a été enregistrée avec succès.
        </p>
        <p className="text-sm text-gray-500">
          Redirection vers le simulateur en cours...
        </p>
      </motion.div>
    );
  }

  return (
    <Card className="border-0 shadow-xl">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Space Grotesk' }}>
            {title}
          </h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nom et Prénom */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prénom <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${
                    errors.prenom ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Jean"
                  value={formData.prenom}
                  onChange={(e) => handleChange("prenom", e.target.value)}
                />
              </div>
              {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${
                  errors.nom ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Dupont"
                value={formData.nom}
                onChange={(e) => handleChange("nom", e.target.value)}
              />
              {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email professionnel <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="jean.dupont@entreprise.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder="06 12 34 56 78"
                value={formData.telephone}
                onChange={(e) => handleChange("telephone", e.target.value)}
              />
            </div>
          </div>

          {/* Entreprise */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Entreprise <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${
                  errors.entreprise ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Nom de votre entreprise"
                value={formData.entreprise}
                onChange={(e) => handleChange("entreprise", e.target.value)}
              />
            </div>
            {errors.entreprise && <p className="text-red-500 text-xs mt-1">{errors.entreprise}</p>}
          </div>

          {/* Poste */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fonction / Poste
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder="Directeur HSE, Risk Manager..."
                value={formData.poste}
                onChange={(e) => handleChange("poste", e.target.value)}
              />
            </div>
          </div>

          {/* Secteur et Taille */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secteur d'activité
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                value={formData.secteur}
                onChange={(e) => handleChange("secteur", e.target.value)}
              >
                <option value="">Sélectionnez...</option>
                {sectors.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Taille de l'entreprise
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                value={formData.tailleEntreprise}
                onChange={(e) => handleChange("tailleEntreprise", e.target.value)}
              >
                <option value="">Sélectionnez...</option>
                {tailleOptions.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Consentements */}
          <div className="space-y-3 pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                checked={formData.consentementContact}
                onChange={(e) => handleChange("consentementContact", e.target.checked)}
              />
              <span className="text-sm text-gray-600">
                J'accepte d'être contacté par l'équipe LENAXIS pour discuter de mes besoins en gestion des risques.
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                checked={formData.consentementMarketing}
                onChange={(e) => handleChange("consentementMarketing", e.target.checked)}
              />
              <span className="text-sm text-gray-600">
                J'accepte de recevoir des informations et actualités sur LENAXIS par email.
              </span>
            </label>
          </div>

          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-6 text-lg font-semibold shadow-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                Accéder au simulateur
              </>
            )}
          </Button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 pt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Lock className="h-3 w-3" /> Données sécurisées
            </span>
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3" /> Conforme RGPD
            </span>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
