import React from 'react';
import { useAccounts } from '../../../context/AccountContext';

const AccountList = ({ onAccountSelected }) => {
  const { accounts, selectedAccount, selectAccount, deleteAccount } = useAccounts();

  const handleAccountChange = (accountId) => {
    selectAccount(accountId);
    if (onAccountSelected) onAccountSelected();
  };

  const handleDeleteAccount = async (e, accountId) => {
    e.stopPropagation(); // Evitar que se propague al contenedor y seleccione la cuenta
    
    if (window.confirm('¿Estás seguro de que deseas eliminar esta cuenta? Esta acción no se puede deshacer.')) {
      try {
        await deleteAccount(accountId);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div>
      asd
      {console.log(accounts)}
      {/* {accounts.map(account => (
        <div key={account.id} className="flex items-center mb-2">
          <div
            className={`flex justify-between items-center flex-1 px-4 py-3 rounded-md cursor-pointer transition-colors ${
              selectedAccount && selectedAccount.id === account.id 
                ? 'bg-blue-700 text-white' 
                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            }`}
            onClick={() => handleAccountChange(account.id)}
          >
            <span className="font-medium">{account.name}</span>
            <span className="text-blue-300 font-semibold">{account.balance.toFixed(2)} USDT</span>
          </div>
          <button
            className="ml-2 p-2 text-red-400 hover:bg-red-900 hover:bg-opacity-30 rounded focus:outline-none"
            onClick={(e) => handleDeleteAccount(e, account.id)}
            title="Eliminar cuenta"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))} */}

    </div>
  );
};

export default AccountList;