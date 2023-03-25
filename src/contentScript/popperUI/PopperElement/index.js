// @flow

import * as React from 'react';
import styled from 'styled-components';

import Button from '~/src/components/Button';

const PopperContainer = styled.div`
  color: rgb(0, 0, 0);
  box-shadow: rgba(0, 0, 0, 0.15) 0 3px 10px;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
`;

// eslint-disable-next-line no-unused-vars
const ButtonGroup = styled.div`
  position: relative;
  display: inline-flex;
  &:not(:last-child) {
    & {
      border-start-end-radius: 0;
      border-end-end-radius: 0;
    }
  }
  
  &:not(:first-child) {
    margin-inline-start: initial;
    & {
      border-start-start-radius: 0;
      border-end-start-radius: 0;
    }
  }
`;

// $FlowFixMe
function PopperElement () {
  return (
    <PopperContainer>
      <Button>colorPen</Button>
    </PopperContainer>
  )
}

export default PopperElement;