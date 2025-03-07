import React, { useState, useEffect } from 'react';

const AccountSelector = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [newAccountName, setNewAccountName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Simular carga de cuentas desde API
  useEffect(() => {
    // Aquí harías tu llamada API real
    const fetchAccounts = async () => {
      try {
        // Simulación de datos
        const mockAccounts = [
          { id: 1, name: 'Cuenta Principal', balance: 1250.45 },
          { id: 2, name: 'Cuenta USDT', balance: 824.33 },
          { id: 3, name: 'Cuenta Demo', balance: 10000.00 },
        ];
        
        setAccounts(mockAccounts);
        setSelectedAccount(mockAccounts[0]);
      } catch (error) {
        console.error('Error al cargar cuentas:', error);
      }
    };

    fetchAccounts();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewAccountName('');
    setErrorMessage('');
  };

  const handleAccountChange = (accountId) => {
    const account = accounts.find(acc => acc.id === parseInt(accountId));
    setSelectedAccount(account);
    closeModal();
  };

  const createAccount = () => {
    if (!newAccountName.trim()) {
      setErrorMessage('El nombre de la cuenta no puede estar vacío');
      return;
    }

    // Validar duplicados
    if (accounts.some(acc => acc.name.toLowerCase() === newAccountName.toLowerCase())) {
      setErrorMessage('Ya existe una cuenta con este nombre');
      return;
    }

    // Crear nueva cuenta (en producción, aquí harías una llamada API)
    const newAccount = {
      id: accounts.length + 1,
      name: newAccountName,
      balance: 0.00
    };

    setAccounts([...accounts, newAccount]);
    setSelectedAccount(newAccount);
    setNewAccountName('');
    setErrorMessage('');
  };

  const deleteAccount = (accountId) => {
    if (accounts.length <= 1) {
      setErrorMessage('No puedes eliminar tu única cuenta');
      return;
    }

    // Confirmar eliminación
    if (window.confirm('¿Estás seguro de que deseas eliminar esta cuenta? Esta acción no se puede deshacer.')) {
      const updatedAccounts = accounts.filter(acc => acc.id !== accountId);
      setAccounts(updatedAccounts);
      
      // Si se eliminó la cuenta seleccionada, seleccionar otra
      if (selectedAccount && selectedAccount.id === accountId) {
        setSelectedAccount(updatedAccounts[0]);
      }
    }
  };

  return (
    <div className="relative my-4">
      <button 
        className="flex items-center justify-between w-full max-w-md px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        onClick={openModal}
      >
        {selectedAccount ? (
          <>
            <span className="font-medium">{selectedAccount.name}</span>
            <span className="text-blue-400 font-semibold">{selectedAccount.balance.toFixed(2)} USDT</span>
            <svg className="w-4 h-4 text-gray-500 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </>
        ) : (
          <span>Seleccionar cuenta</span>
        )}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-gray-900 rounded-xl w-11/12 max-w-lg shadow-2xl overflow-hidden transform transition-all">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700 bg-gray-800">
              <h3 className="text-lg font-medium text-white">Gestionar Cuentas de Trading</h3>
              <button 
                className="text-gray-400 hover:text-white text-2xl font-semibold focus:outline-none"
                onClick={closeModal}
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-base font-medium text-gray-200 mb-3">Seleccionar Cuenta</h4>
                {accounts.map(account => (
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
                      onClick={() => deleteAccount(account.id)}
                      title="Eliminar cuenta"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-base font-medium text-gray-200 mb-3">Crear Nueva Cuenta</h4>
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
                    onClick={createAccount}
                  >
                    Crear
                  </button>
                </div>
                {errorMessage && (
                  <p className="mt-2 text-red-400 text-sm">{errorMessage}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSelector;