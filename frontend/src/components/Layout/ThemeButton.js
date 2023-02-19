import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useEffect } from "react";
import { useTheme } from "styled-components";

function ThemeButton({ handleTheme }) {
  const theme = useTheme();

  useEffect(() => {
    console.log("THEME", theme);
  }, [theme]);
  return (
    <div id="theme" onClick={handleTheme} title="Switch to dark/light mode">
      <DarkModeIcon
        style={{
          color: theme.icon,
          transition: "color 1s",
        }}
      />
    </div>
  );
}

export default ThemeButton;
