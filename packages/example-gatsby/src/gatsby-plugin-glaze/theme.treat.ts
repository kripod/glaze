import { createTheme, defaultTheme } from 'glaze';

export default createTheme({
  ...defaultTheme,
  scales: {
    ...defaultTheme.scales,
    color: {
      red: '#f8485e',
    },
  },
});
