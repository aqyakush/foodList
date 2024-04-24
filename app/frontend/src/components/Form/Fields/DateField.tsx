import React from 'react';
import { Controller, FieldError } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ErrorText from '../ErrorText';
import styled from 'styled-components';

type DateFieldProps = {
  control: any;
  name: string;
  label: string;
  dateFormat?: string;
  rules?: object;
  error?: FieldError | undefined;
  defaultValue?: string | Date;
}

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const DateField = ({ control, name, label, dateFormat, defaultValue, rules, error }: DateFieldProps) => {
  console.log(defaultValue, 'defaultValue')
  return (
    <div>
      <label>{label}</label>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue ? new Date(defaultValue) : undefined}
        rules={rules}
        render={({ field }) => (
            <div>
                <StyledDatePicker
                    selected={field.value}
                    onChange={date => {
                        field.onChange(date);
                        if (date === null) {
                          field.onBlur(); // Manually trigger the onBlur event
                        }
                      }}
                    isClearable
                    placeholderText="Select a date"
                    dateFormat={dateFormat || 'yyyy-MM-dd'}
                />
                {error && (
                    <ErrorText>This field is required</ErrorText>
                )}
            </div>
          
        )}
      />
      
    </div>
  );
};

export default DateField;