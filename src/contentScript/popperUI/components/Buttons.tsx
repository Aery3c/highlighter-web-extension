import * as React from 'react';
import { ButtonBase } from '../../../common/components/Button';
import styled from 'styled-components';
import { Tooltip } from '../../../common/components/Tooltip';
import { HighlightFilled } from '../../../common/components/icons';
import 'react-tooltip/dist/react-tooltip.css'

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

export const HighlightButton: React.FC<React.PropsWithChildren> = () => {
  return (
    <>
      <Button data-tooltip-id="tooltip">
        <HighlightFilled style={{ fontSize: 16 }} />
      </Button>
      <Tooltip id="tooltip">
        Highlight the current selection!
      </Tooltip>
    </>
  )
}
