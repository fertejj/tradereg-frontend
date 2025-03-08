import { useState, useEffect, useCallback, useContext } from 'react';
import { accountService } from '../services/accountService';
import { AuthContext } from '../contexts/AuthContext'; // Ajusta la ruta según tu estructura

/**
 * Hook personalizado para administrar cuentas de trading
 * @returns {Object} Métodos y estados para gestionar cuentas
 */
const useAccounts = () => {

  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  // Obtener todas las cuentas
  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await accountService.getAccounts();
      setAccounts(data);
      return data;
    } catch (err) {
      setError(err.message || 'Error al obtener las cuentas');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener cuentas por ID de usuario
  const fetchAccountsByUserId = useCallback(async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await accountService.getAccountsByUserId(userId);
      setAccounts(data);
      return data;
    } catch (err) {
      setError(err.message || `Error al obtener las cuentas del usuario ${userId}`);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear una nueva cuenta
  const createAccount = useCallback(async (accountData) => {
    setLoading(true);
    setError(null);
    try {
      // Añadir el userId automáticamente si está disponible
      const accountWithUserId = user?.id 
        ? { ...accountData, userId: user.id }
        : accountData;
        
      const newAccount = await accountService.createAccount(accountWithUserId);
      setAccounts(prevAccounts => [...prevAccounts, newAccount]);
      return newAccount;
    } catch (err) {
      setError(err.message || 'Error al crear la cuenta');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Actualizar una cuenta existente
  const updateAccount = useCallback(async (id, accountData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedAccount = await accountService.updateAccount(id, accountData);
      setAccounts(prevAccounts => 
        prevAccounts.map(account => 
          account.id === id ? updatedAccount : account
        )
      );
      return updatedAccount;
    } catch (err) {
      setError(err.message || `Error al actualizar la cuenta ${id}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar una cuenta
  const deleteAccount = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await accountService.deleteAccount(id);
      setAccounts(prevAccounts => 
        prevAccounts.filter(account => account.id !== id)
      );
      return true;
    } catch (err) {
      setError(err.message || `Error al eliminar la cuenta ${id}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar las cuentas del usuario al montar el componente o cuando cambie el usuario
  useEffect(() => {
    if (user && user.id) {
      // Cargar automáticamente las cuentas del usuario actual
      fetchAccountsByUserId(user.id);
    }
  }, [user, fetchAccountsByUserId]);

  // Resetear el error
  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    accounts,
    loading,
    error,
    fetchAccounts,
    fetchAccountsByUserId,
    createAccount,
    updateAccount,
    deleteAccount,
    resetError
  };
};

export default useAccounts;