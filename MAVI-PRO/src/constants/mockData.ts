// src/constants/mockData.ts

// 1. Interfaces das entidades
export interface Service {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  category?: string;
  description?: string;
}

export interface Professional {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  rating?: number;
  availableDays?: string[];
}

// 2. Mocks Exportados e Tipados
export const MOCK_SERVICES: Service[] = [
  {
    id: "s1",
    name: "Corte de Cabelo Masculino",
    price: 45.0,
    durationMinutes: 30,
    category: "Cabelo",
    description: "Corte moderno com lavagem inclusa.",
  },
  {
    id: "s2",
    name: "Barba Completa",
    price: 35.0,
    durationMinutes: 25,
    category: "Barba",
    description: "Modelagem de barba com toalha quente e óleo.",
  },
  {
    id: "s3",
    name: "Combo (Corte + Barba)",
    price: 70.0,
    durationMinutes: 50,
    category: "Combos",
    description: "O serviço completo com desconto exclusivo.",
  },
];

export const MOCK_PROFESSIONALS: Professional[] = [
  {
    id: "p1",
    name: "Carlos Silva",
    role: "Barbeiro Master",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 4.9,
  },
  {
    id: "p2",
    name: "Rafael Souza",
    role: "Especialista em Barba",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 4.8,
  },
];