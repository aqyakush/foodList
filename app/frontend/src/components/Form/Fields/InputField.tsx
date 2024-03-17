import React from "react";
import styled from "styled-components";
import { Controller, FieldError } from 'react-hook-form';
import ErrorText from "../ErrorText";

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

type InputFieldProps = {
  control: any;
  name: string;
  label: string;
  defaultValue?: string | number;
  rules?: object;
  error?: FieldError | undefined;
  type?: string;
  min?: number;
}

const InputField = ({ control, name, label, defaultValue = '', rules, error, type, min }: InputFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <div>
          <label>{label}</label>
          <Input {...field} type={type} min={min}/>
          {error && (
              <ErrorText>This field is required</ErrorText>
          )}
        </div>
      )}
    />
  );
};

export default InputField;