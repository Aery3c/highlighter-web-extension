import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from '../../common/components/Button';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../../common/theme';
import type { RootState } from '../../store/store';
import type { ConnectedProps } from 'react-redux';

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
const mapState = (state: RootState) => ({ themeType: state.config.theme });
const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

const PopperUI: React.FC<PropsFromRedux> = ({ themeType }) => {

  return (
    <ThemeProvider theme={theme[themeType]}>
      <PopperContainer>
        <Group>
          <Button>high</Button>
          <Button>note</Button>
        </Group>
        <Arrow />
      </PopperContainer>
    </ThemeProvider>
  )
}
export default connector(PopperUI);
