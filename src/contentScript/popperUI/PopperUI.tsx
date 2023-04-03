import * as React from 'react';
import { connect } from 'react-redux';
import { ButtonBase } from '../../common/components/Button';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../../common/theme';
import { GithubFilled, TagFilled } from '@ant-design/icons';
import { HighlightButton } from './buttons';
import type { RootState } from '../../store/store';
import type { ConnectedProps } from 'react-redux';

const PopperContainer = styled.div`
  left: 90px;
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

const Arrow = styled.div`
  visibility: hidden;
  bottom: -4px;
  left: calc(50% - 4px);
  ::after {
    visibility: visible;
    content: '';
    transform: rotate(45deg);
  }
  
  &, &::after {
    position: inherit;
    z-index: -1;
    width: 8px;
    height: 8px;
    background-color: ${props => props.theme.colorBgContainer};
    border: 1px solid ${props => props.theme.colorBorder};
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
  }
`;

const Button = styled(ButtonBase)`
  width: 32px;
  padding-inline-start: 0;
  padding-inline-end: 0;
  font-size: 14px;
  height: 32px;
  background-color: ${props => props.theme.colorBgContainer};
  border-color: ${props => props.theme.colorBorder};
  color: ${props => props.theme.colorText};
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
`

const mapState = (state: RootState) => ({
  themeType: state.config.themeType,
  primaryColor: state.config.primaryColor
});
const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

const PopperUI: React.FC<PropsFromRedux> = ({ themeType, primaryColor }) => {
  return (
    <ThemeProvider theme={theme?.[themeType]?.[primaryColor]}>
      <PopperContainer>
        <Group>
          <HighlightButton />
          <Button>
            <TagFilled style={{ fontSize: 16 }} />
          </Button>
          <Button>
            <GithubFilled style={{ fontSize: 16 }} />
          </Button>
        </Group>
        <Arrow />
      </PopperContainer>
    </ThemeProvider>
  )
}
export default connector(PopperUI);
