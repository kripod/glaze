import { createTheme, defaultTokens } from 'glaze';

export const tokens =
  {
    ...defaultTokens,
    scales: {
      ...defaultTokens.scales,
      color: {
        red: '#f8485e',
      },
    },
  } as const;

export default createTheme(tokens);
