import styled from 'styled-components';

export const ButtonBase = styled.button`
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
`;

export const ButtonGroup = styled.div`
  display: inline-flex;
  button {
    :not(:last-child) {
      margin-inline-end: -1px;
      border-start-end-radius: 0;
      border-end-end-radius: 0;
    }
    :not(:first-child) {
      border-start-start-radius: 0;
      border-end-start-radius: 0;
    }
  }
`

export const Button = styled(ButtonBase)`
  width: 32px;
  padding-inline-start: 0;
  padding-inline-end: 0;
  font-size: 14px;
  height: 32px;
  background-color: ${props => props.theme.colorBgContainer};
  border-color: ${props => props.theme.colorBorder};
  color: ${props => props.theme.colorText};
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
  &:hover {
    color: ${props => props.theme.colorPrimaryTextHover};
    border-color: ${props => props.theme.colorPrimaryBorderHover};
  }
`