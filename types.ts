export enum AppMode {
  GENERATE = 'GENERATE',
  EDIT = 'EDIT',
}

export interface GeneratedImage {
  id: string;
  url: string; // Base64 data URL
  prompt: string;
  createdAt: Date;
  type: 'creation' | 'edit';
}

export interface UserProfile {
  name: string;
  credits: number;
  email: string;
}

export interface PaymentRequest {
  plan: string;
  amount: number;
  trxId: string;
}
