import * as React from 'react';
import {useEffect} from "react";

interface Props {
  callback: () => void;
}
const PopperUI: React.FC<Props> = ({ callback }) => {
  useEffect(() => {
    console.log(1);
  }, [])
  return (
    <div ref={callback}>

    </div>
  )
}

export default PopperUI;