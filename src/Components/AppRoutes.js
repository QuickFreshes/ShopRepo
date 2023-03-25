import React from "react";
import { Route, Routes } from "react-router-dom";
import DetailedOrder from "../modules/DetailedOrder";
import ShopItems from "../modules/ShopItems";
import CreateMenuItem from "../modules/CreateMenuItem";
import OrderHistory from "../modules/OrderHistory";
import Orders from "../modules/Orders";
import Settings from "../modules/Settings";
import DetailedHistoryOrder from "../modules/DetailedHistoryOrder";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Orders />} />
      <Route path="order/:id" element={<DetailedOrder />} />
      <Route path="menu" element={<ShopItems />} />
      <Route path="menu/create" element={<CreateMenuItem />} />
      <Route path="order-history" element={<OrderHistory />} />
      <Route path="orderhistory/:id" element={<DetailedHistoryOrder />} />
      <Route path="settings" element={<Settings />} />
    </Routes>
  );
};

export default AppRoutes;
