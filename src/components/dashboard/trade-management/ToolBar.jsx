import { FaPlus, FaEdit, FaTrash, FaFileExport } from "react-icons/fa";

const ToolBar = () => {
  const buttons = [
    {
      label: "Nuevo Trade",
      onClick: () => console.log("Nuevo Trade"),
      icon: <FaPlus />,
    },
    {
      label: "Editar Trade",
      onClick: () => console.log("Editar Trade"),
      icon: <FaEdit />,
    },
    {
      label: "Eliminar Trade",
      onClick: () => console.log("Eliminar Trade"),
      icon: <FaTrash />,
    },
    {
      label: "Exportar Trades",
      onClick: () => console.log("Exportar"),
      icon: <FaFileExport />,
    },
  ];

  return (
    <nav className="flex gap-1 xl:justify-between m-1 bg-secondary">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className="flex-1 flex flex-col gap-2 items-center p-4 py-2   bg-white-100 text-bg rounded hover:bg-primary-300 hover:text-white-100 transition"
        >
          <span className="text-4xl">{button.icon}</span>
          {button.label}
        </button>
      ))}
    </nav>
  );
};

export default ToolBar;
