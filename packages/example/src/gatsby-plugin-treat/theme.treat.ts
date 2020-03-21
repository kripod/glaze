import { createTheme, defaultTheme } from 'glaze';

const { staticThemeRef, runtimeTheme } = createTheme(defaultTheme);

export default staticThemeRef;
export { runtimeTheme };
