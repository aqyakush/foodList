import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const Text = styled.div`
  max-width: 100px; /* Adjust this value as needed */

  &:hover {
    cursor: text;
  }
`;

type EditableDivProps = {
    initialValue: string;
    onValueChange: (value: string) => void;
}

const EditableDiv: React.FC<EditableDivProps> = ({ initialValue, onValueChange }) => {
    const [isValueEditing, setIsValueEditing] = useState(false);    
    const [value, setValue] = useState(initialValue);
    const initialValueRef = useRef(initialValue); 

    const handleValueEdit = () => {
        setIsValueEditing(true);
    };

    const handleBlur = () => {
        setIsValueEditing(false);
        if (value !== initialValueRef.current) { 
            onValueChange(value);
            initialValueRef.current = value;
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
          handleBlur();
        }
      };

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <td onClick={handleValueEdit}>
            {isValueEditing ? (
                <input type="text" value={value} onChange={handleValueChange} onBlur={handleBlur} onKeyDown={handleKeyDown} autoFocus />
            ) : (
                <Text>
                    {value}
                </Text>
            )}
        </td>
    );
};

export default EditableDiv;
