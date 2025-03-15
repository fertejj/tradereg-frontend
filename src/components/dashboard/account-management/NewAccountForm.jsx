import React, { useState } from 'react';
import { useAccounts } from '../../../context/AccountContext';

const NewAccountForm = ({ onSuccess, onError }) => {
  const [newAccountName, setNewAccountName] = useState('');
  const [initialBalance, setInitialBalance] = useState('10000');
  const { createAccount } = useAccounts();

  const handleCreateAccount = async () => {
    try {
      // Validar que el balance sea un número válido
      const balanceValue = parseFloat(initialBalance);
      if (isNaN(balanceValue) || balanceValue < 0) {
        throw new Error("El balance inicial debe ser un número válido mayor o igual a cero");
      }

      // Pasamos el nombre y el balance inicial
      await createAccount(newAccountName, balanceValue);
      
      // Reiniciar campos
      setNewAccountName('');
      setInitialBalance('10000');
      
      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) onError(error.message);
    }
  };

  // Validar valor del input para el balance (solo números y un punto decimal)
  const handleBalanceChange = (e) => {
    const value = e.target.value;
    // Permitir solo números y un punto decimal
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setInitialBalance(value);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
        <input
          type="text"
          placeholder="Nombre de la cuenta"
          className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-md sm:rounded-l-md sm:rounded-r-none border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newAccountName}
          onChange={(e) => setNewAccountName(e.target.value)}
        />
        <div className="relative flex-shrink-0 min-w-[100px] sm:min-w-[150px]">
          <input
            type="text"
            placeholder="Balance inicial"
            className="w-full px-4 py-2 bg-gray-800 text-white sm:rounded-none border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-8"
            value={initialBalance}
            onChange={handleBalanceChange}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
        </div>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-md sm:rounded-l-none sm:rounded-r-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0"
          onClick={handleCreateAccount}
          disabled={!newAccountName.trim() || isNaN(parseFloat(initialBalance))}
        >
          Crear
        </button>
      </div>
      
      <div className="text-xs text-gray-400">
        * El balance inicial es obligatorio. Si no se especifica, será $10.000.
      </div>
    </div>
  );
};

export default NewAccountForm;