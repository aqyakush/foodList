import React from 'react';
import { Controller, FieldError } from 'react-hook-form';
import ErrorText from '../ErrorText';
import styled from 'styled-components';

const Select = styled.select`
  margin-bottom: 20px;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;


type DropdownSelectProps = {
    control: any;
    name: string;
    label: string;
    defaultValue?: string | number;
    rules?: object;
    error?: FieldError | undefined;
    selectOptions: string[];
  }

const DropdownSelect = ({ control, name, label, defaultValue = '', rules, error, selectOptions }: DropdownSelectProps) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <div>
            <label>{label}</label>
            <Select id={name} {...field}>
                <option value="">Select...</option>
                {selectOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>

                ))}
            </Select>
            {error && (
                <ErrorText>This field is required</ErrorText>
            )}
        </div>
      )}
    />
  );
};

export default DropdownSelect;