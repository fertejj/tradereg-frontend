import React, { useState } from 'react';
import { useAccounts } from '../../../context/AccountContext';

const NewAccountForm = ({ onSuccess, onError }) => {
  const [newAccountName, setNewAccountName] = useState('');
  const { createAccount } = useAccounts();

  const handleCreateAccount = async () => {
    try {
      await createAccount(newAccountName);
      setNewAccountName('');
      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) onError(error.message);
    }
  };

  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Nombre de la cuenta"
        className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-l-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={newAccountName}
        onChange={(e) => setNewAccountName(e.target.value)}
      />
      <button 
        className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleCreateAccount}
      >
        Crear
      </button>
    </div>
  );
};

export default NewAccountForm;