import { createTheme, defaultTheme } from 'glaze';

export const tokens =
  {
    ...defaultTheme,
    scales: {
      ...defaultTheme.scales,
      color: {
        red: '#f8485e',
      },
    },
  } as const;

export default createTheme(tokens);
