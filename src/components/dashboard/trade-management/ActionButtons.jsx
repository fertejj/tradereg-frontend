import { FilterButton } from './FilterPanel'
import { Download, Plus } from 'lucide-react'
import TradeForm from './TradeForm'
import PropTypes from 'prop-types'

const ActionButtons = ({toggleFilters, showFilters, openModal}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
    <button
      onClick={() => openModal(<TradeForm />)}
      className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
    >
      <Plus size={16} />
      <span className="hidden sm:inline">Nuevo Trade</span>
      <span className="sm:hidden">Nuevo</span>
    </button>
    <FilterButton
      toggleFilters={toggleFilters}
      showFilters={showFilters}
    />
    <button className="flex items-center gap-2 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 ml-auto">
      <Download size={16} />
      <span className="hidden sm:inline">Exportar</span>
    </button>
  </div>
  )
}
ActionButtons.propTypes = {
    toggleFilters: PropTypes.func.isRequired,
    showFilters: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired
  }


export default ActionButtons