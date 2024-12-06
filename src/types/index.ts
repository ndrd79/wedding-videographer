export interface Plan {
  id: string;
  name: 'Bronze' | 'Prata' | 'Ouro' | 'Diamante';
  price: number;
  features: string[];
  description: string;
  isPopular?: boolean;
}

export interface Video {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnail: string;
  description: string;
  category: string;
  featured: boolean;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  planId?: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}
