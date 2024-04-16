import styled, { css } from "styled-components";

type ButtonProps = {
    buttontype?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
}

const Button = styled.button<ButtonProps>`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  float: right;
  background-color: ${props => props.disabled ? '#D3D3D3' : 'initial'};
  color: ${props => props.disabled ? '#808080' : 'initial'};

  ${props => {
    if (props.disabled) {
      return;
    }
    
    switch (props.buttontype) {
      case 'primary':
        return css`
            background-color: #007BFF;
            color: white;

            &:hover {
                background-color: #0056b3;
            }
        `;
      case 'secondary':
        return css`
            background-color: white;
            color: #007BFF;

            &:hover {
                background-color: #f2f2f2;
            }
        `;
      case 'danger':
        return css`
          background-color: red;
          color: white;
        `;
      default:
        return css`
          background-color: white;
          color: #007BFF;
        `;
    }
  }}

  
`;


export default Button;