export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'hairdresser';
  phone: string;
}

export interface Hairdresser extends User {
  specialties: string[];
  rating: number;
  availableHours: string[];
  description: string;
  profileImage: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  hairdresserId: string;
  date: string;
  time: string;
  service: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}