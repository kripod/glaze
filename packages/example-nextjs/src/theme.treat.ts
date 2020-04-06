import { createTheme, defaultTokens } from 'glaze';

export default createTheme({
  ...defaultTokens,
  scales: {
    ...defaultTokens.scales,
    color: {
      red: '#f8485e',
    },
  },
});
