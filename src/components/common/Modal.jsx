import React from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes

// Modal reusable component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // No renderiza el modal si está cerrado

  return (
    <div className="fixed inset-0 bg-bg/70 flex justify-center items-center z-50 ">
      <div className="bg-gray-900 p-3 rounded-lg w-[85%] max-h-[80vh] overflow-hidden">
        <div className="flex justify-end items-center ">

          <button
            onClick={onClose}
            className="text-gray-500 mb-2 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className='text-black'>{children}</div>
      </div>
    </div>
  );
};

// Definir los PropTypes
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Espera un valor booleano y es obligatorio
  onClose: PropTypes.func.isRequired, // Espera una función y es obligatorio
  title: PropTypes.string.isRequired, // Espera una cadena de texto y es obligatorio
  children: PropTypes.node.isRequired, // Espera cualquier tipo de contenido como hijos y es obligatorio
};

export default Modal;
