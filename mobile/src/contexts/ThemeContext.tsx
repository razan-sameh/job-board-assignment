import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useColorScheme } from "react-native";
import { LightTheme, DarkTheme } from "src/theme/colors";

type ThemeType = typeof LightTheme;
export enum enmtheme {
  dark = "dark",
  light = "light",
}
type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: LightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(
    systemScheme === enmtheme.dark ? DarkTheme : LightTheme,
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === LightTheme ? DarkTheme : LightTheme));
  };

  useEffect(() => {
    // Optional: follow system theme changes
    setTheme(systemScheme === "dark" ? DarkTheme : LightTheme);
  }, [systemScheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
