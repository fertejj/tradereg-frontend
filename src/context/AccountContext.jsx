import { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios';

// Crear el contexto
const AccountContext = createContext();

// Hook personalizado para usar el contexto
export const useAccounts = () => useContext(AccountContext);

// Proveedor del contexto
export const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar cuentas desde API
  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoading(true);
      try {
        // En producción reemplazar con tu llamada API real
        // const response = await axios.get('/api/accounts');
        // const data = response.data;
        
        // Simulación de datos
        const mockAccounts = [
          { id: 1, name: 'Cuenta Principal', balance: 1250.45 },
          { id: 2, name: 'Cuenta USDT', balance: 824.33 },
          { id: 3, name: 'Cuenta Demo', balance: 10000.00 },
        ];
        
        setAccounts(mockAccounts);
        setSelectedAccount(mockAccounts[0]);
        setError(null);
      } catch (err) {
        console.error('Error al cargar cuentas:', err);
        setError('No se pudieron cargar las cuentas');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  // Función para cambiar la cuenta seleccionada
  const selectAccount = (accountId) => {
    const account = accounts.find(acc => acc.id === parseInt(accountId));
    if (account) {
      setSelectedAccount(account);
    }
  };

  // Función para crear una nueva cuenta
  const createAccount = async (accountName) => {
    if (!accountName.trim()) {
      throw new Error('El nombre de la cuenta no puede estar vacío');
    }

    // Validar duplicados
    if (accounts.some(acc => acc.name.toLowerCase() === accountName.toLowerCase())) {
      throw new Error('Ya existe una cuenta con este nombre');
    }

    try {
      // En producción, hacer la llamada API real
      // const response = await axios.post('/api/accounts', { name: accountName });
      // const newAccount = response.data;
      
      // Simulación de creación
      const newAccount = {
        id: accounts.length + 1,
        name: accountName,
        balance: 0.00
      };

      const updatedAccounts = [...accounts, newAccount];
      setAccounts(updatedAccounts);
      setSelectedAccount(newAccount);
      
      return newAccount;
    } catch (err) {
      console.error('Error al crear cuenta:', err);
      throw new Error('No se pudo crear la cuenta');
    }
  };

  // Función para eliminar una cuenta
  const deleteAccount = async (accountId) => {
    if (accounts.length <= 1) {
      throw new Error('No puedes eliminar tu única cuenta');
    }

    try {
      // En producción, hacer la llamada API real
      // await axios.delete(`/api/accounts/${accountId}`);
      
      const updatedAccounts = accounts.filter(acc => acc.id !== accountId);
      setAccounts(updatedAccounts);
      
      // Si se eliminó la cuenta seleccionada, seleccionar otra
      if (selectedAccount && selectedAccount.id === accountId) {
        setSelectedAccount(updatedAccounts[0]);
      }
      
      return true;
    } catch (err) {
      console.error('Error al eliminar cuenta:', err);
      throw new Error('No se pudo eliminar la cuenta');
    }
  };

  // Valores a proporcionar a través del contexto
  const value = {
    accounts,
    selectedAccount,
    isLoading,
    error,
    selectAccount,
    createAccount,
    deleteAccount
  };

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
};