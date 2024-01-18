import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DEBOUNCED_DELAY } from '../../../utils/apis';

interface SearchInputProps {
    setQuery: (query: string) => void;
    param: string | null;
}

const StyledInput = styled.input`
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 50%;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007BFF;
    outline: none;
  }
`;

const SearchInput: React.FC<SearchInputProps> = ({ setQuery, param }) => {
    const [input, setInput] = useState(param ? param : '');
    const [debouncedInput, setDebouncedInput] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    useEffect(() => {
        const timerId = setTimeout(() => {
          setDebouncedInput(input);
        }, DEBOUNCED_DELAY); //0.8s delay

        return () => {
          clearTimeout(timerId);
        };
      }, [input, setQuery]);
  
      useEffect(() => {
        debouncedInput ? setQuery(`?name=${debouncedInput}`) : setQuery('');
      }, [debouncedInput, setQuery]);

    return (
        <StyledInput type="text" placeholder="Search for recipes" onChange={handleInputChange} value={input}/>
    );
};

export default SearchInput;
