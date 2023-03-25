import React from "react";
import { Form, Input, Button, Card, InputNumber, message } from "antd";
import { DataStore } from "aws-amplify";
import { Product } from "../models";
import { useShopContext } from "../contexts/ShopContexts";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;
const CreateMenuItem = () => {
  const { shop } = useShopContext();
  const navigation = useNavigate();

  const onFinish = ({ name, description, price }) => {
    DataStore.save(
      new Product({
        name,
        description,
        price,
        shopID: shop.id,
      })
    );
    message.success("Product was created successfully");
    navigation("/menu");
  };

  const onFinishFailed = (errorInf) => {
    console.log("Failed:", errorInf);
  };

  return (
    <Card title="New Shop Item" style={{ margin: 20 }}>
      <Form
        layout="vertical"
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true }]}
          required
        >
          <Input placeholder="Enter Product Name" />
        </Form.Item>
        <Form.Item
          label="Product Description"
          name="description"
          rules={[{ required: true }]}
          required
        >
          <TextArea rows={4} placeholder="Enter Product description" />
        </Form.Item>
        <Form.Item
          label="Price ₹"
          name="price"
          rules={[{ required: true }]}
          required
        >
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateMenuItem;
