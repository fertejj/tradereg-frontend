import { createContext, useState, useEffect, useContext } from "react";
import apiClient from "../utils/apiClient";

// Crear el contexto
const AccountContext = createContext();

// Hook personalizado para usar el contexto
export const useAccounts = () => useContext(AccountContext);

// Proveedor del contexto
export const AccountProvider = ({ children }) => {
  const userId = localStorage.getItem("userId");
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar cuentas desde API
  useEffect(() => {
    const fetchAccountsById = async () => {
      if (!userId) return;
      setIsLoading(true);
      try {
        const response = await apiClient.get(`accounts/user/${userId}`);
        const fetchedAccounts = response.data.data;

        if (fetchedAccounts.length > 0 && !selectedAccount) {
          setSelectedAccount(fetchedAccounts[0]);
        }
        setError(null);
      } catch (err) {
        console.error("Error al cargar cuentas:", err);
        setError("No se pudieron cargar las cuentas");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccountsById();
  }, [userId, selectedAccount]);

  const deleteAccount = async (accountId) => {
    if (!accountId) {
      throw new Error("ID de cuenta no válido");
    }

    try {
      // Llamada a la API para eliminar la cuenta
      await apiClient.delete(`/accounts/${accountId}`);

      // Actualizar el estado local eliminando la cuenta
      const updatedAccounts = accounts.filter(
        (account) => account._id !== accountId
      );
      setAccounts(updatedAccounts);

      // Si la cuenta eliminada era la seleccionada, seleccionar otra si existe
      if (selectedAccount && selectedAccount._id === accountId) {
        if (updatedAccounts.length > 0) {
          setSelectedAccount(updatedAccounts[0]);
        } else {
          setSelectedAccount(null);
        }
      }

      return true;
    } catch (err) {
      console.error("Error al eliminar la cuenta:", err);
      throw new Error("No se pudo eliminar la cuenta");
    }
  };

  // Función para crear una nueva cuenta
  const createAccount = async (accountName, balanceValue) => {
    if (!accountName.trim()) {
      throw new Error("El nombre de la cuenta no puede estar vacío");
    }
    try {
      const accountData = {
        name: accountName,
        initialBalance: balanceValue,
        user: userId,
      };
      const response = await apiClient.post("/accounts", accountData);
      const newAccount = response.data;
      console.log("Cuenta creada con exito:", newAccount);
      // Asegurarse de que accounts es un array antes de usar el operador spread
      const currentAccounts = Array.isArray(accounts) ? accounts : [];
      const updatedAccounts = [...currentAccounts, newAccount];

      setAccounts(updatedAccounts);
      setSelectedAccount(newAccount);

      return newAccount;
    } catch (err) {
      console.error("Error al crear cuenta:", err);
      throw new Error("No se pudo crear la cuenta");
    }
  };

  // Función para cambiar la cuenta seleccionada

  // Valores a proporcionar a través del contexto
  const value = {
    accounts,
    selectedAccount,
    setSelectedAccount,
    isLoading,
    deleteAccount,
    error,
    createAccount,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
