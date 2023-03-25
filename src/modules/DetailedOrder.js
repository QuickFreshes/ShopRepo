import React, { useEffect, useState } from "react";
import { Card, Descriptions, Divider, List, Button, Tag, Spin } from "antd";
import { useParams } from "react-router-dom";
import { DataStore } from "aws-amplify";
import { Order, OrderProduct, OrderStatus, Product, User } from "../models";

const statusToColor = {
  [OrderStatus.NEW]: "green",
  [OrderStatus.PACKED]: "orange",
  [OrderStatus.READY_FOR_PICKUP]: "red",
  [OrderStatus.ACCEPTED]: "blue",
  [OrderStatus.COMPLETED]: "gold",
  [OrderStatus.PICKED_UP]: "purple",
  [OrderStatus.DECLINED_BY_SHOP]: "bronze",
};

const DetailedOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const subscription = DataStore.observe(Order, id).subscribe((msg) => {
      if (msg.opType === "UPDATE" && msg.element.id === id) {
        setOrder(msg.element);
      }
    });
    return () => subscription.unsubscribe();
  }, [id]);

  useEffect(() => {
    DataStore.query(Order, id).then(setOrder);
  }, [id]);
  useEffect(() => {
    if (order?.userID) {
      DataStore.query(User, order.userID).then(setCustomer);
    }
  }, [order?.userID]);

  useEffect(() => {
    if (!order?.id) {
      return;
    }
    DataStore.query(OrderProduct, (c) => c.orderID.eq(order.id)).then(
      async (orderProducts) => {
        const productData = await Promise.all(
          orderProducts.map(async (op) => {
            const product = await DataStore.query(
              Product,
              op.orderProductProductId
            );
            return { orderProduct: op, product };
          })
        );

        setProducts(productData);
      }
    );
  }, [order?.id]);

  const acceptOrder = async () => {
    updateOrderStatus(OrderStatus.PACKED);
  };

  const declineOrder = async () => {
    updateOrderStatus(OrderStatus.DECLINED_BY_SHOP);
  };

  const readyForPickup = async () => {
    updateOrderStatus(OrderStatus.READY_FOR_PICKUP);
  };

  const updateOrderStatus = async (newStatus) => {
    const updatedOrder = DataStore.save(
      Order.copyOf(order, (updated) => {
        updated.status = newStatus;
      })
    );
    setOrder(updatedOrder);
  };

  if (!order) {
    return <Spin size="large" />;
  }
  // column={{ lg: 1, md: 1, sm: 1 }}
  const isDesktopOrLaptop = window.matchMedia("(min-width: 575px)").matches;

  return (
    <Card title={`Order ${id}`} style={{ margin: 20 }}>
      <Tag color={statusToColor[order?.status]} key={order?.status}>
        {order?.status}
      </Tag>
      {isDesktopOrLaptop && (
        <Descriptions bordered column={{ lg: 1, md: 1, sm: 1 }}>
          <Descriptions.Item label="Customer">
            {customer?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Customer Address">
            {customer?.address}
          </Descriptions.Item>
          <Descriptions.Item label="Customer Address">
            {customer?.city}
          </Descriptions.Item>
        </Descriptions>
      )}
      {!isDesktopOrLaptop && (
        <Descriptions bordered>
          <Descriptions.Item label="Customer">
            {customer?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Customer Address">
            {customer?.address}
          </Descriptions.Item>
          <Descriptions.Item label="Customer Address">
            {customer?.city}
          </Descriptions.Item>
        </Descriptions>
      )}

      <Divider />
      <List
        dataSource={products}
        renderItem={(productItem) => (
          <List.Item>
            <div style={{ fontWeight: "bold" }}>
              {productItem.product.name} x {productItem.orderProduct.quantity}
            </div>

            <div>₹ {productItem.product.price}</div>
          </List.Item>
        )}
      />
      <Divider />
      <div style={styles.totalSumContainer}>
        <h2>Total:</h2>
        <h2 style={styles.totalPrice}>₹ {order?.total?.toFixed(0)}</h2>
      </div>
      <Divider />
      {order?.status === OrderStatus.NEW && (
        <div style={styles.buttonsContainer}>
          <Button
            block
            type="primary"
            danger
            size="large"
            style={styles.button}
            onClick={declineOrder}
          >
            Decline Order
          </Button>
          <Button
            block
            type="primary"
            size="large"
            style={styles.button}
            onClick={acceptOrder}
          >
            Accept Order
          </Button>
        </div>
      )}
      {order?.status === OrderStatus.PACKED && (
        <Button block type="primary" size="large" onClick={readyForPickup}>
          Items are Packed
        </Button>
      )}
    </Card>
  );
};

const styles = {
  totalSumContainer: {
    flexDirection: "row",
    display: "flex",
  },
  totalPrice: {
    marginLeft: "auto",
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    display: "flex",
    paddingBottom: 30,
  },
  button: {
    marginRight: 25,
    marginLeft: -15,
  },
};

export default DetailedOrder;
