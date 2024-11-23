import { create } from 'zustand';
import type { User, Hairdresser, Appointment } from '../types';

interface Store {
  user: User | null;
  appointments: Appointment[];
  hairdressers: Hairdresser[];
  setUser: (user: User | null) => void;
  addAppointment: (appointment: Appointment) => void;
  setHairdressers: (hairdressers: Hairdresser[]) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  appointments: [],
  hairdressers: [],
  setUser: (user) => set({ user }),
  addAppointment: (appointment) =>
    set((state) => ({ appointments: [...state.appointments, appointment] })),
  setHairdressers: (hairdressers) => set({ hairdressers }),
}));