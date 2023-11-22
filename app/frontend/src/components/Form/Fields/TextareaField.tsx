import React from "react";
import { Controller, FieldError } from "react-hook-form";
import styled from "styled-components";
import ErrorText from "../ErrorText";

const TextArea = styled.textarea`
  margin-bottom: 20px;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;


type TextAreaFieldProps = {
  control: any;
  name: string;
  label: string;
  defaultValue?: string | number;
  rules?: object;
  error?: FieldError | undefined;
}

const TextAreaField = ({ control, name, label, defaultValue = '', rules, error }: TextAreaFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <div>
          <label>{label}</label>
          <TextArea
              {...field}
          />
          {error && <ErrorText>This field is required</ErrorText>}
        </div>
      )}
    />
  );
};

export default TextAreaField;
