import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useStore } from '../store/useStore';

export default function HairdresserProfile() {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const hairdressers = useStore((state) => state.hairdressers);
  const user = useStore((state) => state.user);
  const addAppointment = useStore((state) => state.addAppointment);

  const hairdresser = hairdressers.find((h) => h.id === id);

  if (!hairdresser) {
    return <div>Profissional não encontrado</div>;
  }

  const handleBooking = () => {
    if (!user || !selectedTime) return;

    const appointment = {
      id: Math.random().toString(36).substr(2, 9),
      clientId: user.id,
      hairdresserId: hairdresser.id,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime,
      service: 'Corte de Cabelo',
      status: 'pending',
    };

    addAppointment(appointment);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={hairdresser.profileImage}
              alt={hairdresser.name}
            />
          </div>
          <div className="p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {hairdresser.name}
              </h2>
              <div className="flex items-center space-x-1 text-yellow-500">
                <Star className="h-5 w-5 fill-current" />
                <span>{hairdresser.rating}</span>
              </div>
            </div>
            <p className="mt-2 text-gray-600">{hairdresser.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {hairdresser.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Agendar Horário</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Data
            </label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={format(selectedDate, 'yyyy-MM-dd')}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Horário
            </label>
            <div className="mt-1 grid grid-cols-4 gap-2">
              {hairdresser.availableHours.map((time) => (
                <button
                  key={time}
                  className={`p-2 text-sm rounded-md ${
                    selectedTime === time
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleBooking}
            disabled={!user || !selectedTime}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {user ? 'Confirmar Agendamento' : 'Faça login para agendar'}
          </button>
        </div>
      </div>
    </div>
  );
}