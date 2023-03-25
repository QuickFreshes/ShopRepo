import React, { useEffect, useState } from "react";
import { Form, Input, Card, Button, message } from "antd";
import GooglePlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { DataStore } from "aws-amplify";
import { Shop } from "../models";
import { useShopContext } from "../contexts/ShopContexts";
const Settings = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [shopType, setshopType] = useState("");
  const [Address, setAddress] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  const { sub, shop, setShop } = useShopContext();

  useEffect(() => {
    if (shop) {
      setName(shop.name);
      setCity(shop.city);
      setshopType(shop.shopType);
      setAddress(shop.Address);
      setCoordinates({ lat: shop.lat, lng: shop.lng });
    }
  }, [shop]);

  const getAddressLatLng = async (Address) => {
    setAddress(Address);
    const geocodedByAddress = await geocodeByAddress(Address.label);
    const latLng = await getLatLng(geocodedByAddress[0]);
    setCoordinates(latLng);
  };

  const onSubmit = async () => {
    if (!shop) {
      await createNewShop();
    } else {
      await updateShop();
    }
  };

  const createNewShop = async () => {
    const newShop = await DataStore.save(
      new Shop({
        name,
        image:
          "https://quickfreshesawsbucket.s3.ap-south-1.amazonaws.com/Essentials%26Grocery.png",
        deliveryFee: 2,
        minDeliveryTime: 15,
        maxDeliveryTime: 120,
        address: Address.label,
        small_address: Address.label,
        location: city,
        ShopType: shopType,
        lat: coordinates.lat,
        lng: coordinates.lng,
        AdminSub: sub,
      })
    );
    setShop(newShop);
    message.success("Shop has been created");
  };

  const updateShop = async () => {
    try {
      const updatedShop = await DataStore.save(
        Shop.copyOf(shop, (updated) => {
          updated.name = name;
          updated.ShopType = shopType;
          if (Address) {
            updated.address = Address.label;
            updated.small_address = Address.label;
            updated.location = city;
            updated.lat = coordinates.lat;
            updated.lng = coordinates.lng;
          }
        })
      );
      // Update the shop state immediately after saving to the DataStore
      setShop(updatedShop);

      // Set the form fields to the updated shop data
      setName(updatedShop.name);
      setCity(updatedShop.city);
      setshopType(updatedShop.ShopType);
      setAddress({ label: updatedShop.address });
      setCoordinates({ lat: updatedShop.lat, lng: updatedShop.lng });
      message.success("Shop has been updated");
    } catch (error) {
      console.error("Error updating shop: ", error);
      message.error("Error updating shop");
    }
  };

  return (
    <Card title="Shop Details" style={{ margin: 20 }}>
      <Form layout="vertical" wrapperCol={{ span: 8 }} onFinish={onSubmit}>
        <Form.Item label="Shop Name" required>
          <Input
            placeholder="Enter Shop Name here"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Enter City" required>
          <Input
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ marginTop: 10 }}
          />
        </Form.Item>
        <Form.Item label="Enter Shop Type" required>
          <Input
            placeholder="Enter Shop Type"
            value={shopType}
            onChange={(e) => setshopType(e.target.value)}
            style={{ marginTop: 10 }}
          />
        </Form.Item>
        <Form.Item label="Shop Address" required>
          <GooglePlacesAutoComplete
            apiKey="AIzaSyC2VFKyco1YHgAVt-WGwOUDTJxA6xlAOPA"
            selectProps={{ value: Address, onChange: getAddressLatLng }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <span>
        {coordinates?.lat} - {coordinates?.lng}
      </span>
    </Card>
  );
};

export default Settings;
