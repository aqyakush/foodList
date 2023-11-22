import React, { useState } from 'react';
import { Controller, FieldError } from 'react-hook-form';
import ErrorText from '../ErrorText';


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
            <select id={name} {...field}>
                <option value="">Select...</option>
                {selectOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>

                ))}
            </select>
            {error && (
                <ErrorText>This field is required</ErrorText>
            )}
        </div>
      )}
    />
  );
};

export default DropdownSelect;