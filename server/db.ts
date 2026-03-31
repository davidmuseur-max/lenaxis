import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, leads, demoRequests, InsertLead, InsertDemoRequest } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================
// LEADS - Fonctions de gestion des prospects
// ============================================

/**
 * Créer un nouveau lead dans la base de données
 */
export async function createLead(lead: InsertLead) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create lead: database not available");
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(leads).values(lead);
    return { id: result[0].insertId, ...lead };
  } catch (error) {
    console.error("[Database] Failed to create lead:", error);
    throw error;
  }
}

/**
 * Récupérer un lead par son ID
 */
export async function getLeadById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get lead: database not available");
    return undefined;
  }

  const result = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * Récupérer un lead par son email
 */
export async function getLeadByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get lead: database not available");
    return undefined;
  }

  const result = await db.select().from(leads).where(eq(leads.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * Récupérer tous les leads (pour l'admin)
 */
export async function getAllLeads(limit = 100) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get leads: database not available");
    return [];
  }

  return await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(limit);
}

/**
 * Mettre à jour le statut d'un lead
 */
export async function updateLeadStatus(id: number, statut: "nouveau" | "contacte" | "qualifie" | "converti" | "perdu", notes?: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update lead: database not available");
    throw new Error("Database not available");
  }

  const updateData: Record<string, unknown> = { statut };
  if (notes) {
    updateData.notes = notes;
  }
  if (statut === "contacte") {
    updateData.contactedAt = new Date();
  }

  await db.update(leads).set(updateData).where(eq(leads.id, id));
  return getLeadById(id);
}

/**
 * Mettre à jour les résultats du simulateur pour un lead
 */
export async function updateLeadSimulatorResults(
  id: number, 
  risquesIdentifies: unknown, 
  modulesRecommandes: unknown, 
  scoreExposition: number
) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update lead: database not available");
    throw new Error("Database not available");
  }

  await db.update(leads).set({
    risquesIdentifies,
    modulesRecommandes,
    scoreExposition,
  }).where(eq(leads.id, id));
  
  return getLeadById(id);
}

// ============================================
// DEMO REQUESTS - Demandes de démonstration
// ============================================

/**
 * Créer une demande de démo
 */
export async function createDemoRequest(demoRequest: InsertDemoRequest) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create demo request: database not available");
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(demoRequests).values(demoRequest);
    return { id: result[0].insertId, ...demoRequest };
  } catch (error) {
    console.error("[Database] Failed to create demo request:", error);
    throw error;
  }
}

/**
 * Récupérer toutes les demandes de démo (pour l'admin)
 */
export async function getAllDemoRequests(limit = 100) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get demo requests: database not available");
    return [];
  }

  return await db.select().from(demoRequests).orderBy(desc(demoRequests.createdAt)).limit(limit);
}

/**
 * Mettre à jour le statut d'une demande de démo
 */
export async function updateDemoRequestStatus(
  id: number, 
  statut: "en_attente" | "planifiee" | "realisee" | "annulee",
  dateDemo?: Date
) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update demo request: database not available");
    throw new Error("Database not available");
  }

  const updateData: Record<string, unknown> = { statut };
  if (dateDemo) {
    updateData.dateDemo = dateDemo;
  }

  await db.update(demoRequests).set(updateData).where(eq(demoRequests.id, id));
}
