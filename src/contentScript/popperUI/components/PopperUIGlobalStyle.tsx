import { createGlobalStyle } from 'styled-components';
import { theme } from '../../../common/theme';

const PopperUIGlobalStyle = createGlobalStyle`
  .${theme.light.orange.className} {
    background-color: ${theme.light.orange.colorPrimary};
    color: ${theme.light.orange.colorText};
	  cursor: pointer;
  }
  .${theme.dark.orange.className} {
    background-color: ${theme.dark.orange.colorPrimary};
    color: ${theme.dark.orange.colorText};
    cursor: pointer;
  }
  .${theme.light.blue.className} {
    background-color: ${theme.light.blue.colorPrimary};
    color: ${theme.light.blue.colorText};
    cursor: pointer;
  }
`;

export default PopperUIGlobalStyle;
