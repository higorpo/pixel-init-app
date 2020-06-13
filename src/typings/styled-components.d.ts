import Theme from "../configs/theming";

type ThemeInterface = typeof Theme;

declare module "styled-components" {
    interface DefaultTheme extends ThemeInterface { }
}