import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { LightTheme ,DarkTheme} from 'src/theme/colors';

type ThemeType = typeof LightTheme;

const ThemeContext = createContext<ThemeType>(LightTheme);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
