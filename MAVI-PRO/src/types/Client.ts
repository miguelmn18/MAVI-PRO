export type ClientStatus = 'ativo' | 'resgate' | 'inativo';

export interface Client {
  id: number;
  name: string;
  phone: string;
  points: number;
  cuts: number;
  challenges: number;
  last: string;
  lastDays: number;
  status: ClientStatus;
}