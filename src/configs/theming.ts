import { Theme as NavigationThemeProps, DarkTheme } from "@react-navigation/native";

interface IThemeProps {
    colors: {
        grey3: string,
        grey5: string,
        grey6: string
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
        grey3: "#828282",
        grey5: "#E0E0E0",
        grey6: "#F2F2F2"
    }
}

export default Theme;