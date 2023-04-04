import * as React from 'react';
import { useTheme } from 'styled-components'
import { Tooltip as RcTooltip } from 'react-tooltip/dist/react-tooltip'
import type { ITooltip } from 'react-tooltip/dist/react-tooltip';
import 'react-tooltip/dist/react-tooltip.min.css'

export const Tooltip: React.FC<React.PropsWithChildren<ITooltip>> = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <RcTooltip
      {...props}
      style={{
        maxWidth: 256,
        wordWrap: 'break-word',
        borderRadius: 6,
        backgroundColor: theme.tooltipBg,
        color: theme.tooltipColor,
        boxShadow: '0 6px 16px 0 rgba(0,0,0,.08), 0 3px 6px -4px rgba(0,0,0,.12), 0 9px 28px 8px rgba(0,0,0,.05)',
        opacity: 1,
      }}
    >
      {children}
    </RcTooltip>
  )
}
