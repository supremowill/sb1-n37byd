import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Calendar, User } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Navbar() {
  const user = useStore((state) => state.user);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Scissors className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">HairStyle</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/appointments"
                  className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Agendamentos</span>
                </Link>
                <div className="flex items-center space-x-1 text-gray-700">
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}