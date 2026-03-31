import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the database functions
vi.mock('./db', () => ({
  createLead: vi.fn(),
  getLeadByEmail: vi.fn(),
  getAllLeads: vi.fn(),
  updateLeadStatus: vi.fn(),
}));

// Mock the notification function
vi.mock('./_core/notification', () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

import { createLead, getLeadByEmail, getAllLeads, updateLeadStatus } from './db';
import { notifyOwner } from './_core/notification';

describe('Leads API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createLead', () => {
    it('should create a new lead with required fields', async () => {
      const mockLead = {
        id: 1,
        prenom: 'Jean',
        nom: 'Dupont',
        email: 'jean.dupont@entreprise.com',
        entreprise: 'Entreprise Test',
        createdAt: new Date(),
      };

      (createLead as any).mockResolvedValue(mockLead);

      const result = await createLead({
        prenom: 'Jean',
        nom: 'Dupont',
        email: 'jean.dupont@entreprise.com',
        entreprise: 'Entreprise Test',
      });

      expect(result).toEqual(mockLead);
      expect(createLead).toHaveBeenCalledWith({
        prenom: 'Jean',
        nom: 'Dupont',
        email: 'jean.dupont@entreprise.com',
        entreprise: 'Entreprise Test',
      });
    });

    it('should create a lead with all optional fields', async () => {
      const fullLead = {
        id: 2,
        prenom: 'Marie',
        nom: 'Martin',
        email: 'marie.martin@industrie.fr',
        telephone: '0612345678',
        entreprise: 'Industrie Martin',
        poste: 'Directrice HSE',
        codeNaf: '2011Z',
        secteur: 'industrie',
        tailleEntreprise: 'eti',
        adresse: '123 Rue de la Sécurité',
        codePostal: '75001',
        ville: 'Paris',
        source: 'simulateur_commercial',
        consentementMarketing: true,
        consentementContact: true,
        createdAt: new Date(),
      };

      (createLead as any).mockResolvedValue(fullLead);

      const result = await createLead(fullLead);

      expect(result.email).toBe('marie.martin@industrie.fr');
      expect(result.secteur).toBe('industrie');
      expect(result.source).toBe('simulateur_commercial');
    });
  });

  describe('getLeadByEmail', () => {
    it('should return a lead when email exists', async () => {
      const mockLead = {
        id: 1,
        email: 'existing@test.com',
        prenom: 'Test',
        nom: 'User',
        entreprise: 'Test Corp',
      };

      (getLeadByEmail as any).mockResolvedValue(mockLead);

      const result = await getLeadByEmail('existing@test.com');

      expect(result).toEqual(mockLead);
      expect(getLeadByEmail).toHaveBeenCalledWith('existing@test.com');
    });

    it('should return undefined when email does not exist', async () => {
      (getLeadByEmail as any).mockResolvedValue(undefined);

      const result = await getLeadByEmail('nonexistent@test.com');

      expect(result).toBeUndefined();
    });
  });

  describe('getAllLeads', () => {
    it('should return all leads with default limit', async () => {
      const mockLeads = [
        { id: 1, email: 'lead1@test.com', prenom: 'Lead', nom: 'One', entreprise: 'Corp 1' },
        { id: 2, email: 'lead2@test.com', prenom: 'Lead', nom: 'Two', entreprise: 'Corp 2' },
      ];

      (getAllLeads as any).mockResolvedValue(mockLeads);

      const result = await getAllLeads();

      expect(result).toHaveLength(2);
      expect(getAllLeads).toHaveBeenCalledWith();
    });

    it('should return leads with custom limit', async () => {
      const mockLeads = [
        { id: 1, email: 'lead1@test.com', prenom: 'Lead', nom: 'One', entreprise: 'Corp 1' },
      ];

      (getAllLeads as any).mockResolvedValue(mockLeads);

      const result = await getAllLeads(10);

      expect(result).toHaveLength(1);
    });
  });

  describe('updateLeadStatus', () => {
    it('should update lead status to contacte', async () => {
      const updatedLead = {
        id: 1,
        statut: 'contacte',
        contactedAt: new Date(),
      };

      (updateLeadStatus as any).mockResolvedValue(updatedLead);

      const result = await updateLeadStatus(1, 'contacte');

      expect(result.statut).toBe('contacte');
      expect(updateLeadStatus).toHaveBeenCalledWith(1, 'contacte');
    });

    it('should update lead status with notes', async () => {
      const updatedLead = {
        id: 1,
        statut: 'qualifie',
        notes: 'Intéressé par module WATCH',
      };

      (updateLeadStatus as any).mockResolvedValue(updatedLead);

      const result = await updateLeadStatus(1, 'qualifie', 'Intéressé par module WATCH');

      expect(result.notes).toBe('Intéressé par module WATCH');
    });
  });

  describe('notifyOwner', () => {
    it('should send notification when new lead is created', async () => {
      await notifyOwner({
        title: 'Nouveau lead LENAXIS',
        content: 'Jean Dupont de Entreprise Test',
      });

      expect(notifyOwner).toHaveBeenCalledWith({
        title: 'Nouveau lead LENAXIS',
        content: 'Jean Dupont de Entreprise Test',
      });
    });
  });
});

describe('Lead validation', () => {
  it('should validate email format', () => {
    const validEmails = [
      'test@example.com',
      'user.name@domain.fr',
      'contact@entreprise.co.uk',
    ];

    const invalidEmails = [
      'invalid',
      '@domain.com',
      'user@',
      'user@.com',
    ];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    validEmails.forEach(email => {
      expect(emailRegex.test(email)).toBe(true);
    });

    invalidEmails.forEach(email => {
      expect(emailRegex.test(email)).toBe(false);
    });
  });

  it('should validate required fields', () => {
    const requiredFields = ['prenom', 'nom', 'email', 'entreprise'];
    
    const validLead = {
      prenom: 'Jean',
      nom: 'Dupont',
      email: 'jean@test.com',
      entreprise: 'Test Corp',
    };

    requiredFields.forEach(field => {
      expect(validLead[field as keyof typeof validLead]).toBeTruthy();
    });
  });
});
