import { useState } from "react";
import { FaPlus, FaTrash, FaFileExport } from "react-icons/fa";
import Modal from "../../common/Modal";


const ToolBarAcc = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const buttons = [
    {
      label: "Nueva Cuenta",
      onClick: () => openModal(<p>FASITO</p>),
      icon: <FaPlus />,
    },
    {
      label: "Eliminar Cuenta",
      onClick: () =>
        openModal(<p>¿Estás seguro de que deseas eliminar esta cuenta?</p>),
      icon: <FaTrash />,
    },
    {
      label: "Exportar Trades",
      onClick: () => openModal(<p>Exportando trades...</p>),
      icon: <FaFileExport />,
    },
  ];

  return (
    <nav className="flex gap-1 xl:justify-between m-1 bg-secondary">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className="flex-1 flex flex-col gap-2 items-center p-4 py-2 bg-gray-800 text-gray-400 rounded hover:bg-primary-300 hover:text-white-100 transition"
        >
          <span className="text-4xl">{button.icon}</span>
          {button.label}
        </button>
      ))}

      {/* 🔥 Modal único que se renderiza fuera del loop */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Operando">
        {modalContent}
      </Modal>
    </nav>
  );
};

export default ToolBarAcc;
