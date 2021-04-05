import React from "react";
import { registerThemes, useTheme } from "react-native-themed-styles";
import { useColorScheme } from "react-native-appearance";

export const styleSheetFactory = registerThemes({
    light: { 
        backgroundColor: "white", 
        textColor: "black",
        cardBackgroundColor: "#f8e8f8",
    },
    dark: { 
        backgroundColor: "#232b2b", 
        textColor: "white",
        cardBackgroundColor: "blue",
    }
  }, () => {
    const colorScheme = useColorScheme()
    return ["light", "dark"].includes(colorScheme) ? colorScheme : "light"
  })