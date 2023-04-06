import type { DefaultTheme } from 'styled-components';

export type ThemeColor = 'dark' | 'light';
export type PrimaryColor = 'red' | 'volcano' | 'orange' | 'gold' | 'yellow' | 'lime' | 'green' | 'cyan' | 'blue' | 'geekblue' | 'purple' | 'magenta';

export const theme: Record<ThemeColor, Partial<Record<PrimaryColor, DefaultTheme>>> = {
  light: {
    orange: {
      colorBgContainer: '#ffffff',
      colorText: 'rgba(0, 0, 0, 0.88)',
      colorBorder: '#d9d9d9',
      colorBgSpotlight: 'rgba(0, 0, 0, 0.85)',
      tooltipBg: '#000000',
      tooltipColor: '#ffffff',
      colorPrimaryBg: '#fffbe6',
      colorPrimaryBgHover: '#fff1b8',
      colorPrimaryBorder: '#ffe58f',
      colorPrimaryBorderHover: '#ffd666',
      colorPrimaryHover: '#ffc53d',
      colorPrimary: '#FAAD14',
      colorPrimaryActive: '#d48806',
      colorPrimaryTextHover: '#ffc53d',
      colorPrimaryText: '#faad14',
      colorPrimaryTextActive: '#d48806',
      className: 'highlighter-orange-light'
    }
  },
  dark: {
    orange: {
      colorBgContainer: '#141414',
      colorText: 'rgba(255, 255, 255, 0.85)',
      colorBorder: '#424242',
      colorBgSpotlight: '#424242',
      tooltipBg: '#424242',
      tooltipColor: '#fffff',
      colorPrimaryBg: '#2b2111',
      colorPrimaryBgHover: '#443111',
      colorPrimaryBorder: '#594214',
      colorPrimaryBorderHover: '#7c5914',
      colorPrimaryHover: '#e8b339',
      colorPrimary: '#FAAD14',
      colorPrimaryActive: '#aa7714',
      colorPrimaryTextHover: '#e8b339',
      colorPrimaryText: '#d89614',
      colorPrimaryTextActive: '#aa7714',
      className: 'highlighter-orange-dark'
    }
  },
}
