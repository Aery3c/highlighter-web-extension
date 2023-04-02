import styled from 'styled-components';

export const Button = styled.button`
  
  font-size: 14px;
  height: 32px;
  padding: 4px 15px;
  
  border-radius: 6px;
  outline: none;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  background-color: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  user-select: none;
  line-height: 1.5714285714285714;
  color: rgba(0, 0, 0, 0.88);
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

  background-color: ${props => props.theme.colorPrimaryBg};
  border-color: ${props => props.theme.colorPrimaryBorder};
  color: ${props => props.theme.colorPrimaryText};
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
`;
