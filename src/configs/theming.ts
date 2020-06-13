import { Theme as NavigationThemeProps, DarkTheme } from "@react-navigation/native";

interface IThemeProps {
    colors: {
        grey5: string
    }
}

export type ThemeProps = NavigationThemeProps & IThemeProps;

const Theme: ThemeProps = {
    ...DarkTheme,
    dark: true,
    colors: {
        ...DarkTheme.colors,
        primary: "#327E83",
        background: "#121214",
        grey5: "#E0E0E0"
    }
}

export default Theme;