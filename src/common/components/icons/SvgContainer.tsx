import * as React from 'react';

export const SvgContainer: React.FC<React.PropsWithChildren<React.HTMLAttributes<HTMLOrSVGElement>>> = ({ children, ...props }) => (
  <svg
    {...props}
    style={{
      // eslint-disable-next-line react/prop-types
      ...props.style,
      width: '1em',
      height: '1em',
      verticalAlign: '-0.15em',
      fill: 'currentColor',
      overflow: 'hidden'
    }}
  >
    {children}
  </svg>
)
