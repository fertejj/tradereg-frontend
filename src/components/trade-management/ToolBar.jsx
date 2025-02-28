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
    <nav className="flex justify-between p-3 bg-secondary">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className=" flex flex-col gap-2 items-center p-4 py-2 w-[120px]  bg-primary-200 text-white rounded hover:bg-primary-dark transition"
        >
          <span className="text-5xl">{button.icon}</span>
          {button.label}
        </button>
      ))}
    </nav>
  );
};

export default ToolBar;
