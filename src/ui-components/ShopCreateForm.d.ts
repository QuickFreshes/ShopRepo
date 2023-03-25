/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ShopCreateFormInputValues = {
    name?: string;
    image?: string;
    deliveryFee?: number;
    minDeliveryTime?: number;
    maxDeliveryTime?: number;
    rating?: number;
    address?: string;
    small_address?: string;
    location?: string;
    lat?: number;
    lng?: number;
    ShopType?: string;
    AdminSub?: string;
};
export declare type ShopCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    deliveryFee?: ValidationFunction<number>;
    minDeliveryTime?: ValidationFunction<number>;
    maxDeliveryTime?: ValidationFunction<number>;
    rating?: ValidationFunction<number>;
    address?: ValidationFunction<string>;
    small_address?: ValidationFunction<string>;
    location?: ValidationFunction<string>;
    lat?: ValidationFunction<number>;
    lng?: ValidationFunction<number>;
    ShopType?: ValidationFunction<string>;
    AdminSub?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ShopCreateFormOverridesProps = {
    ShopCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    deliveryFee?: PrimitiveOverrideProps<TextFieldProps>;
    minDeliveryTime?: PrimitiveOverrideProps<TextFieldProps>;
    maxDeliveryTime?: PrimitiveOverrideProps<TextFieldProps>;
    rating?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    small_address?: PrimitiveOverrideProps<TextFieldProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
    lat?: PrimitiveOverrideProps<TextFieldProps>;
    lng?: PrimitiveOverrideProps<TextFieldProps>;
    ShopType?: PrimitiveOverrideProps<TextFieldProps>;
    AdminSub?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ShopCreateFormProps = React.PropsWithChildren<{
    overrides?: ShopCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ShopCreateFormInputValues) => ShopCreateFormInputValues;
    onSuccess?: (fields: ShopCreateFormInputValues) => void;
    onError?: (fields: ShopCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ShopCreateFormInputValues) => ShopCreateFormInputValues;
    onValidate?: ShopCreateFormValidationValues;
} & React.CSSProperties>;
export default function ShopCreateForm(props: ShopCreateFormProps): React.ReactElement;
