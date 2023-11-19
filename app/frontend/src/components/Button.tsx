import styled, { css } from "styled-components";

interface ButtonProps {
    buttonType?: 'primary' | 'secondary' | 'danger';
}

const Button = styled.button<ButtonProps>`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  float: right;

  ${props => {
    switch (props.buttonType) {
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