import { addons } from '@storybook/manager-api';
import theme from './theme';

addons.setConfig({
  theme,
  /** Collapse the story list by default (0px); drag the splitter or use the sidebar toggle to expand. */
  navSize: 0,
});
