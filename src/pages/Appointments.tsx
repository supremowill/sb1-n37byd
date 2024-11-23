import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, User, CheckCircle, XCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Appointments() {
  const { user, appointments, hairdressers } = useStore();

  const userAppointments = appointments.filter(
    (appointment) =>
      user?.role === 'client'
        ? appointment.clientId === user.id
        : appointment.hairdresserId === user.id
  );

  const getHairdresserName = (id: string) => {
    return hairdressers.find((h) => h.id === id)?.name || 'Profissional';
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pendente' },
      confirmed: { color: 'bg-green-100 text-green-800', text: 'Confirmado' },
      cancelled: { color: 'bg-red-100 text-red-800', text: 'Cancelado' },
      completed: { color: 'bg-gray-100 text-gray-800', text: 'Concluído' },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span className={`px-2 py-1 rounded-full text-sm ${config.color}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {user?.role === 'client' ? 'Meus Agendamentos' : 'Agenda de Atendimentos'}
      </h2>

      <div className="space-y-4">
        {userAppointments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Nenhum agendamento encontrado
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Você ainda não possui agendamentos {user?.role === 'client' ? 'realizados' : 'recebidos'}.
            </p>
          </div>
        ) : (
          userAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">
                      {getHairdresserName(appointment.hairdresserId)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span>
                      {format(new Date(appointment.date), 'dd/MM/yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
                <div className="space-y-2 text-right">
                  {getStatusBadge(appointment.status)}
                  <p className="text-sm text-gray-500">{appointment.service}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}