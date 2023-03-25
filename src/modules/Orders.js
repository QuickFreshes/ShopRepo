import React from "react";
import { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Order, OrderStatus, User } from "../models";
import { Card, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import "../Styles/Orders.css";
import { useShopContext } from "../contexts/ShopContexts";
import moment from "moment";
import "../Styles/Orders.css";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { shop } = useShopContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shop) {
      return;
    }
    async function fetchOrders() {
      const ordersData = await DataStore.query(Order, (order) =>
        order.orderShopId.eq(shop.id)
      );
      const ordersWithUserData = await Promise.all(
        ordersData.map(async (order) => {
          const userData = await DataStore.query(User, order.userID);
          return {
            ...order,
            user: userData,
            key: order.orderID,
          };
        })
      );
      const filteredOrders = ordersWithUserData.filter((order) =>
        [
          OrderStatus.NEW,
          OrderStatus.PACKED,
          OrderStatus.READY_FOR_PICKUP,
          OrderStatus.ACCEPTED,
        ].includes(order.status)
      );
      const sortedOrders = filteredOrders.sort(
        (a, b) => moment(b.createdAt).unix() - moment(a.createdAt).unix()
      );
      setOrders(sortedOrders);
    }
    fetchOrders();
  }, [shop]);

  // console.log(orders);

  useEffect(() => {
    const subscription = DataStore.observe(Order).subscribe((msg) => {
      const { opType, element } = msg;
      if (opType === "INSERT" && element.orderShopId === shop?.id) {
        setOrders((existingOrders) => [element, ...existingOrders]);
      }
    });

    return () => subscription.unsubscribe();
  }, [shop?.id]);

  const renderOrderStatus = (orderStatus) => {
    const statusToColor = {
      [OrderStatus.NEW]: "green",
      [OrderStatus.PACKED]: "orange",
      [OrderStatus.READY_FOR_PICKUP]: "red",
      [OrderStatus.ACCEPTED]: "blue",
      [OrderStatus.COMPLETED]: "gold",
      [OrderStatus.PICKED_UP]: "purple",
      [OrderStatus.DECLINED_BY_SHOP]: "bronze",
    };
    return (
      <Tag color={statusToColor[orderStatus]} key={orderStatus}>
        {orderStatus}
      </Tag>
    );
  };
  const tableColumns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      className: "ant-table-cell",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).fromNow(),
      className: "ant-table-cell",
    },
    {
      title: "Delivery Address",
      dataIndex: "user",
      key: "deliveryAddress",
      render: (user) => {
        const address = user?.address;
        const maxLength = window.innerWidth < 768 ? 20 : 100; // set the maximum length based on screen width
        const truncatedAddress =
          address.length > maxLength
            ? address.slice(0, maxLength) + "..."
            : address;
        return truncatedAddress;
      },
    },

    {
      title: "Price",
      dataIndex: "total",
      key: "total",
      render: (price) => `₹ ${price?.toFixed(0)}`,
      className: "ant-table-cell",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: renderOrderStatus,
      className: "ant-table-cell",
    },
  ];
  return (
    <Card title={"Orders"}>
      <Table
        className="orders-container"
        dataSource={orders}
        columns={tableColumns}
        rowKey="id" // reference the new "key" property in the rowKey prop
        onRow={(orderItem) => ({
          onClick: () => navigate(`order/${orderItem.id}`),
        })}
      />
    </Card>
  );
};

export default Orders;
