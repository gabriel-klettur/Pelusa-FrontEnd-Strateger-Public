// Path: strateger-react/src/components/Orders/Orders.js

import React from 'react';
import OrderList from './OrderList';
// Puedes importar otros componentes de tablas aquí, como FutureTable, PastTable, etc.

const Orders = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Order Management</h1>
      <OrderList />
      {/* Aquí puedes añadir otros componentes de tablas */}
    </div>
  );
};

export default Orders;
