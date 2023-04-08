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
  .${theme.dark.blue.className} {
    background-color: ${theme.dark.blue.colorPrimary};
    color: ${theme.dark.blue.colorText};
    cursor: pointer;
  }
  .${theme.light.gold.className} {
    background-color: ${theme.light.gold.colorPrimary};
    color: ${theme.light.gold.colorText};
    cursor: pointer;
  }
  .${theme.dark.gold.className} {
    background-color: ${theme.dark.gold.colorPrimary};
    color: ${theme.dark.gold.colorText};
    cursor: pointer;
  }
`;

export default PopperUIGlobalStyle;
