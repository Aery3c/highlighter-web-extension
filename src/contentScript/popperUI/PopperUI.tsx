import * as React from 'react';
import { Button } from '../../components/Button';
import styled, { ThemeProvider } from 'styled-components';

const PopperContainer = styled.div`
  position: absolute;
  z-index: 1000;
`;

const Group = styled.div`
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

const ArrowStyle = `
  position: inherit;
  z-index: -1;
  width: 8px;
  height: 8px;
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
`;
const Arrow = styled.div`
  ${ArrowStyle};
  visibility: hidden;
  bottom: -4px;
  left: calc(50% - 4px);
  ::after {
    ${ArrowStyle};
    visibility: visible;
    content: '';
    transform: rotate(45deg);
  }
`;

interface Props {
  callback: () => void;
}
const PopperUI: React.FC<Props> = ({ callback }) => {
  return (
    <ThemeProvider theme={{}}>
      <PopperContainer ref={callback}>
        <Group>
          <Button>high</Button>
          <Button>note</Button>
        </Group>
        <Arrow />
      </PopperContainer>
    </ThemeProvider>
  )
}

export default PopperUI;
