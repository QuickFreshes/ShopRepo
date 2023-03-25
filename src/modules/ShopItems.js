import React, { useEffect, useState } from "react";
import { Card, Table, Button, Popconfirm } from "antd";
// import dishes from "../assets/data/dishes.json";
import { Link } from "react-router-dom";
import { DataStore } from "aws-amplify";
import { Product } from "../models";
import { useShopContext } from "../contexts/ShopContexts";
const ShopItems = () => {
  const [products, setProducts] = useState([]);
  const { shop } = useShopContext();

  useEffect(() => {
    if (shop?.id) {
      DataStore.query(Product, (c) => c.shopID.eq(shop.id)).then(setProducts);
    }
  }, [shop?.id]);

  // const deleteProduct = (product) => {
  //   DataStore.delete(product);
  //   setProducts(products.filter((d) => d.id !== product.id));
  // };
  const deleteProduct = (product) => {
    DataStore.delete(product)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((d) => d.id !== product.id)
        );
      })
      .catch((error) => console.log(error));
  };

  // console.log(products);

  const tableColumns = [
    {
      title: "Menu Item",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price} ₹`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <Popconfirm
          placement="topLeft"
          title={"Are you sure you want to delete"}
          onConfirm={() => deleteProduct(item)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Remove</Button>
        </Popconfirm>
      ),
    },
  ];

  const renderNewItemButton = () => (
    <Link to={"create"}>
      <Button type="primary">New Item</Button>
    </Link>
  );
  return (
    <Card title={"Menu"} style={{ margin: 20 }} extra={renderNewItemButton()}>
      <Table dataSource={products} columns={tableColumns} rowKey="id" />
    </Card>
  );
};

export default ShopItems;
