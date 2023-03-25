/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Shop } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ShopCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    image: "",
    deliveryFee: "",
    minDeliveryTime: "",
    maxDeliveryTime: "",
    rating: "",
    address: "",
    small_address: "",
    location: "",
    lat: "",
    lng: "",
    ShopType: "",
    AdminSub: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [image, setImage] = React.useState(initialValues.image);
  const [deliveryFee, setDeliveryFee] = React.useState(
    initialValues.deliveryFee
  );
  const [minDeliveryTime, setMinDeliveryTime] = React.useState(
    initialValues.minDeliveryTime
  );
  const [maxDeliveryTime, setMaxDeliveryTime] = React.useState(
    initialValues.maxDeliveryTime
  );
  const [rating, setRating] = React.useState(initialValues.rating);
  const [address, setAddress] = React.useState(initialValues.address);
  const [small_address, setSmall_address] = React.useState(
    initialValues.small_address
  );
  const [location, setLocation] = React.useState(initialValues.location);
  const [lat, setLat] = React.useState(initialValues.lat);
  const [lng, setLng] = React.useState(initialValues.lng);
  const [ShopType, setShopType] = React.useState(initialValues.ShopType);
  const [AdminSub, setAdminSub] = React.useState(initialValues.AdminSub);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setImage(initialValues.image);
    setDeliveryFee(initialValues.deliveryFee);
    setMinDeliveryTime(initialValues.minDeliveryTime);
    setMaxDeliveryTime(initialValues.maxDeliveryTime);
    setRating(initialValues.rating);
    setAddress(initialValues.address);
    setSmall_address(initialValues.small_address);
    setLocation(initialValues.location);
    setLat(initialValues.lat);
    setLng(initialValues.lng);
    setShopType(initialValues.ShopType);
    setAdminSub(initialValues.AdminSub);
    setErrors({});
  };
  const validations = {
    name: [{ type: "Required" }],
    image: [{ type: "Required" }],
    deliveryFee: [{ type: "Required" }],
    minDeliveryTime: [{ type: "Required" }],
    maxDeliveryTime: [{ type: "Required" }],
    rating: [],
    address: [{ type: "Required" }],
    small_address: [{ type: "Required" }],
    location: [{ type: "Required" }],
    lat: [{ type: "Required" }],
    lng: [{ type: "Required" }],
    ShopType: [{ type: "Required" }],
    AdminSub: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value = getDisplayValue
      ? getDisplayValue(currentValue)
      : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          image,
          deliveryFee,
          minDeliveryTime,
          maxDeliveryTime,
          rating,
          address,
          small_address,
          location,
          lat,
          lng,
          ShopType,
          AdminSub,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new Shop(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ShopCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              image,
              deliveryFee,
              minDeliveryTime,
              maxDeliveryTime,
              rating,
              address,
              small_address,
              location,
              lat,
              lng,
              ShopType,
              AdminSub,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Image"
        isRequired={true}
        isReadOnly={false}
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              image: value,
              deliveryFee,
              minDeliveryTime,
              maxDeliveryTime,
              rating,
              address,
              small_address,
              location,
              lat,
              lng,
              ShopType,
              AdminSub,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
      <TextField
        label="Delivery fee"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={deliveryFee}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              image,
              deliveryFee: value,
              minDeliveryTime,
              maxDeliveryTime,
              rating,
              address,
              small_address,
              location,
              lat,
              lng,
              ShopType,
              AdminSub,
            };
            const result = onChange(modelFields);
            value = result?.deliveryFee ?? value;
          }
          if (errors.deliveryFee?.hasError) {
            runValidationTasks("deliveryFee", value);
          }
          setDeliveryFee(value);
        }}
        onBlur={() => runValidationTasks("deliveryFee", deliveryFee)}
        errorMessage={errors.deliveryFee?.errorMessage}
        hasError={errors.deliveryFee?.hasError}
        {...getOverrideProps(overrides, "deliveryFee")}
      ></TextField>
      <TextField
        label="Min delivery time"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={minDeliveryTime}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              image,
              deliveryFee,
              minDeliveryTime: value,
              maxDeliveryTime,
              rating,
              address,
              small_address,
              location,
              lat,
              lng,
              ShopType,
              AdminSub,
            };
            const result = onChange(modelFields);
            value = result?.minDeliveryTime ?? value;
          }
          if (errors.minDeliveryTime?.hasError) {
            runValidationTasks("minDeliveryTime", value);
          }
          setMinDeliveryTime(value);
        }}
        onBlur={() => runValidationTasks("minDeliveryTime", minDeliveryTime)}
        errorMessage={errors.minDeliveryTime?.errorMessage}
        hasError={errors.minDeliveryTime?.hasError}
        {...getOverrideProps(overrides, "minDeliveryTime")}
      ></TextField>
      <TextField
        label="Max delivery time"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={maxDeliveryTime}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              image,
              deliveryFee,
              minDeliveryTime,
              maxDeliveryTime: value,
              rating,
              address,
              small_address,
              location,
              lat,
              lng,
              ShopType,
              AdminSub,
            };
            const result = onChange(modelFields);
            value = result?.maxDeliveryTime ?? value;
          }
          if (errors.maxDeliveryTime?.hasError) {
            runValidationTasks("maxDeliveryTime", value);
          }
          setMaxDeliveryTime(value);
        }}
        onBlur={() => runValidationTasks("maxDeliveryTime", maxDeliveryTime)}
        errorMessage={errors.maxDeliveryTime?.errorMessage}
        hasError={errors.maxDeliveryTime?.hasError}
        {...getOverrideProps(overrides, "maxDeliveryTime")}
      ></TextField>
      <TextField
        label="Rating"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={rating}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              image,
              deliveryFee,
              minDeliveryTime,
              maxDeliveryTime,
              rating: value,
              address,
              small_address,
              location,
              lat,
              lng,
              ShopType,
              AdminSub,
            };
            const result = onChange(modelFields);
            value = result?.rating ?? value;
          }
          if (errors.rating?.hasError) {
            runValidationTasks("rating", value);
          }
          setRating(value);
        }}
        onBlur={() => runValidationTasks("rating", rating)}
        errorMessage={errors.rating?.errorMessage}
        hasError={errors.rating?.hasError}
        {...getOverrideProps(overrides, "rating")}
      ></TextField>
      <TextField
        label="Address"
        isRequired={true}
        isReadOnly={false}
        value={address}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              image,
              deliveryFee,
              minDeliveryTime,
              maxDeliveryTime,
              rating,
              address: value,
              small_address,
              location,
              lat,
              lng,
              ShopType,
              AdminSub,
            };
            const result = onChange(modelFields);
            value = result?.address ?? value;
          }
          if (errors.address?.hasError) {
            runValidationTasks("address", value);
          }
          setAddress(value);
        }}
        onBlur={() => runValidationTasks("address", address)}
        errorMessage={errors.address?.errorMessage}
        hasError={errors.address?.hasError}
        {...getOverrideProps(overrides, "address")}
      ></TextField>
      <TextField
        label="Small address"
        isRequired={true}
        isReadOnly={false}
        value={small_address}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              image,
              deliveryFee,
              minDeliveryTime,
              maxDeliveryTime,
              rating,
              address,
              small_address: value,
              location,
              lat,
              lng,
              ShopType,
              AdminSub,
            };
            const result = onChange(modelFields);
            value = result?.small_address ?? value;
          }
          if (errors.small_address?.hasError) {
            runValidationTasks("small_address", value);
          }
          setSmall_address(value);
        }}
        onBlur={() => runValidationTasks("small_address", small_address)}
        errorMessage={errors.small_address?.errorMessage}
        hasError={errors.small_address?.hasError}
        {...getOverrideProps(overrides, "small_address")}
      ></TextField>
      <TextField
        label="Location"
        isRequired={true}
        isReadOnly={false}
        value={location}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              image,
              deliveryFee,
              minDeliveryTime,
              maxDeliveryTime,
              rating,
              address,
              small_address,
              location: value,
              lat,
              lng,
              ShopType,
              AdminSub,
            };
            const result = onChange(modelFields);
            value = result?.location ?? value;
          }
          if (errors.location?.hasError) {
            runValidationTasks("location", value);
          }
          setLocation(value);
        }}
        onBlur={() => runValidationTasks("location", location)}
        errorMessage={errors.location?.errorMessage}
        hasError={errors.location?.hasError}
        {...getOverrideProps(overrides, "location")}
      ></TextField>
      <TextField
        label="Lat"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={lat}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              image,
              deliveryFee,
              minDeliveryTime,
              maxDeliveryTime,
              rating,
              address,
              small_address,
              location,
              lat: value,
              lng,
              ShopType,
              AdminSub,
            };
            const result = onChange(modelFields);
            value = result?.lat ?? value;
          }
          if (errors.lat?.hasError) {
            runValidationTasks("lat", value);
          }
          setLat(value);
        }}
        onBlur={() => runValidationTasks("lat", lat)}
        errorMessage={errors.lat?.errorMessage}
        hasError={errors.lat?.hasError}
        {...getOverrideProps(overrides, "lat")}
      ></TextField>
      <TextField
        label="Lng"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={lng}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              image,
              deliveryFee,
              minDeliveryTime,
              maxDeliveryTime,
              rating,
              address,
              small_address,
              location,
              lat,
              lng: value,
              ShopType,
              AdminSub,
            };
            const result = onChange(modelFields);
            value = result?.lng ?? value;
          }
          if (errors.lng?.hasError) {
            runValidationTasks("lng", value);
          }
          setLng(value);
        }}
        onBlur={() => runValidationTasks("lng", lng)}
        errorMessage={errors.lng?.errorMessage}
        hasError={errors.lng?.hasError}
        {...getOverrideProps(overrides, "lng")}
      ></TextField>
      <TextField
        label="Shop type"
        isRequired={true}
        isReadOnly={false}
        value={ShopType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              image,
              deliveryFee,
              minDeliveryTime,
              maxDeliveryTime,
              rating,
              address,
              small_address,
              location,
              lat,
              lng,
              ShopType: value,
              AdminSub,
            };
            const result = onChange(modelFields);
            value = result?.ShopType ?? value;
          }
          if (errors.ShopType?.hasError) {
            runValidationTasks("ShopType", value);
          }
          setShopType(value);
        }}
        onBlur={() => runValidationTasks("ShopType", ShopType)}
        errorMessage={errors.ShopType?.errorMessage}
        hasError={errors.ShopType?.hasError}
        {...getOverrideProps(overrides, "ShopType")}
      ></TextField>
      <TextField
        label="Admin sub"
        isRequired={false}
        isReadOnly={false}
        value={AdminSub}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              image,
              deliveryFee,
              minDeliveryTime,
              maxDeliveryTime,
              rating,
              address,
              small_address,
              location,
              lat,
              lng,
              ShopType,
              AdminSub: value,
            };
            const result = onChange(modelFields);
            value = result?.AdminSub ?? value;
          }
          if (errors.AdminSub?.hasError) {
            runValidationTasks("AdminSub", value);
          }
          setAdminSub(value);
        }}
        onBlur={() => runValidationTasks("AdminSub", AdminSub)}
        errorMessage={errors.AdminSub?.errorMessage}
        hasError={errors.AdminSub?.hasError}
        {...getOverrideProps(overrides, "AdminSub")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
