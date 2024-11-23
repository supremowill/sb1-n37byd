import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Home() {
  const hairdressers = useStore((state) => state.hairdressers);

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Encontre os Melhores Profissionais
        </h1>
        <p className="text-xl text-gray-600">
          Agende seu horário com os melhores cabeleireiros da região
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hairdressers.map((hairdresser) => (
          <Link
            key={hairdresser.id}
            to={`/hairdresser/${hairdresser.id}`}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={hairdresser.profileImage}
              alt={hairdresser.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {hairdresser.name}
              </h3>
              <div className="flex items-center space-x-1 text-yellow-500">
                <Star className="h-5 w-5 fill-current" />
                <span>{hairdresser.rating}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Horários disponíveis</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {hairdresser.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}