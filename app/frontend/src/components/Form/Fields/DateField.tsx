import React from 'react';
import { Controller, FieldError } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ErrorText from '../ErrorText';

type DateFieldProps = {
  control: any;
  name: string;
  label: string;
  dateFormat?: string;
  rules?: object;
  error?: FieldError | undefined;
}

const DateField = ({ control, name, label, dateFormat, rules, error }: DateFieldProps) => {
  return (
    <div>
      <label>{label}</label>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
            <div>
                <DatePicker
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