import React, { useState } from 'react';
import AccountList from './AccountList';
import NewAccountForm from './NewAccountForm';

const AccountModal = ({ isOpen, onClose }) => {
  const [errorMessage, setErrorMessage] = useState('');
  
  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-gray-900 rounded-xl w-11/12 max-w-lg shadow-2xl overflow-hidden transform transition-all">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700 bg-gray-800">
          <h3 className="text-lg font-medium text-white">Gestionar Cuentas de Trading</h3>
          <button 
            className="text-gray-400 hover:text-white text-2xl font-semibold focus:outline-none"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-base font-medium text-gray-200 mb-3">Seleccionar Cuenta</h4>
            <AccountList onAccountSelected={() => onClose()} />
          </div>

          <div>
            <h4 className="text-base font-medium text-gray-200 mb-3">Crear Nueva Cuenta</h4>
            <NewAccountForm 
              onSuccess={() => {
                setErrorMessage('');
                onClose();
              }}
              onError={(message) => setErrorMessage(message)}
            />
            {errorMessage && (
              <p className="mt-2 text-red-400 text-sm">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;