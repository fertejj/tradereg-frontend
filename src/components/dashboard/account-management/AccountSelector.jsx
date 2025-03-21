import React, { useState } from "react";
import { useAccounts } from "../../../context/AccountContext";
import AccountModal from "./AccountModal";

const AccountSelector = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedAccount, isLoading } = useAccounts();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="relative my-4">
        <div className="flex items-center justify-between w-full max-w-md px-4 py-3 bg-gray-800 text-white rounded-lg">
          <span className="text-gray-400">Cargando cuentas...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative my-4">
      <button
        className="flex items-center justify-between w-full max-w-md px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        onClick={openModal}
      >
        {selectedAccount ? (
          <>
            <span className="font-medium">{selectedAccount.name}</span>
            <span className="text-blue-400 font-semibold">10236,76</span>
            <svg
              className="w-4 h-4 text-gray-500 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </>
        ) : (
          <span>Seleccionar cuenta</span>
        )}
      </button>

      <AccountModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default AccountSelector;
