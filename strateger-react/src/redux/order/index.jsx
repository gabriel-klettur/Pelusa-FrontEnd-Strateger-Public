// Path: redux/orders/index.js

// Importaciones del slice
import orderReducer from './orderSlice'; // Importar `setFilters`
import { setFilters, setPage, setFilteredOrders, setSelectedOrderId } from './orderSlice'; // Importar `setFilters`

// Importaciones de Thunks (acciones asíncronas)
import { fetchOrdersUsdtm } from './orderThunks';

// Importaciones de Selectores
import { 
  selectOrders, 
  selectFilters, 
  selectFilteredOrders 
} from './orderSelectors';

// Exportar Thunks
export { fetchOrdersUsdtm };

// Exportar Selectores
export { selectOrders, selectFilters, selectFilteredOrders };

// Exportar Acciones
export { setFilters, setPage, setFilteredOrders, setSelectedOrderId }; // Aquí exportamos `setFilters`

// Exportar Reducer por defecto
export default orderReducer;
