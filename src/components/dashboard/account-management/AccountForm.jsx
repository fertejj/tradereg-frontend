import { useContext, useState, useEffect } from "react";
import { accountService } from "../../../services/accountService";
import { AuthContext } from "../../../context/AuthContext";

export default function AccountForm({ onClose }) {
  const { user } = useContext(AuthContext);
  
  // Añadimos más logs para debugging
  
  // Extraemos el ID correctamente (podría ser null si user o user.user son undefined)
  const userId = user?.user?.id || user?.user?._id;

  const [account, setAccount] = useState({
    name: "",
    exchange: "Binance",
    accountType: "Spot",
    initialBalance: 0,
    currency: "USD",
    isDemo: false,
    user: userId,
    status: "active",
  });

  // Actualizar el user ID si cambia el contexto
  useEffect(() => {
    const currentUserId = user?.user?.id || user?.user?._id;
    setAccount(prev => ({
      ...prev,
      user: currentUserId
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAccount({
      ...account,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de cuenta a enviar:", account);
    
    // Si el ID de usuario es undefined o null, mostrar un mensaje
    if (!account.user) {
      console.error("Error: No hay un ID de usuario válido");
      alert("Error: No hay un usuario autenticado o el ID no es válido");
      return;
    }
    
    accountService.createAccount(account)
      .then(response => {
        console.log("Cuenta creada exitosamente:", response);
        onClose && onClose();
      })
      .catch(error => {
        console.error("Error al crear la cuenta:", error);
        alert("Error al crear la cuenta: " + (error.response?.data?.message || error.message || "Error desconocido"));
      });
  };

  // El resto del componente permanece igual
  return (
    <div className="overflow-y-auto max-h-[70vh] bg-gray-900 px-6 text-gray-300">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Crear Cuenta de Trading</h2>
        {/* Añadimos un indicador visual de si tenemos o no un ID válido */}
        {!userId && <div className="ml-2 text-red-500 text-xs">(Sin ID de usuario)</div>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Resto del formulario permanece igual */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre de la cuenta */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Nombre de la cuenta</label>
            <input
              type="text"
              name="name"
              value={account.name}
              onChange={handleChange}
              placeholder="Mi cuenta principal"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Exchange */}
          <div>
            <label className="block text-sm font-medium mb-1">Exchange</label>
            <select
              name="exchange"
              value={account.exchange}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Binance">Binance</option>
              <option value="Bybit">Bybit</option>
              <option value="Bitget">Bitget</option>
              <option value="OKX">OKX</option>
              <option value="KuCoin">KuCoin</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          {/* Tipo de cuenta */}
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de cuenta</label>
            <select
              name="accountType"
              value={account.accountType}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Spot">Spot</option>
              <option value="Futuros">Futuros</option>
              <option value="Margen">Margen</option>
              <option value="Opciones">Opciones</option>
            </select>
          </div>

          {/* Saldo inicial */}
          <div>
            <label className="block text-sm font-medium mb-1">Saldo inicial</label>
            <input
              type="number"
              step="0.01"
              name="initialBalance"
              value={account.initialBalance}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Moneda */}
          <div>
            <label className="block text-sm font-medium mb-1">Moneda</label>
            <select
              name="currency"
              value={account.currency}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="USD">USD</option>
              <option value="USDT">USDT</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          {/* Cuenta Demo */}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="isDemo"
              name="isDemo"
              checked={account.isDemo}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
            />
            <label htmlFor="isDemo" className="ml-2 text-sm font-medium">
              Cuenta demo/práctica
            </label>
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium mb-1">Estado</label>
            <select
              name="status"
              value={account.status}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="active">Activa</option>
              <option value="inactive">Inactiva</option>
              <option value="closed">Cerrada</option>
            </select>
          </div>
        </div>

        {/* Instrucciones adicionales */}
        <div className="mt-4 p-3 bg-gray-800 rounded text-gray-400 text-sm">
          <p>
            <span className="font-semibold text-blue-400">Nota:</span> Las cuentas de trading te ayudan a organizar tus operaciones y realizar un seguimiento independiente de cada estrategia o exchange que utilices.
          </p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md font-medium transition-colors duration-300"
            disabled={!account.user} // Deshabilitamos el botón si no hay usuario
          >
            Crear Cuenta
          </button>
        </div>
      </form>
    </div>
  );
}