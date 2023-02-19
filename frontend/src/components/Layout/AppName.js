import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AppName() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleWidth);

    return () => window.removeEventListener("resize", handleWidth);
  }, []);
  return (
    <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
      <p>{width > 350 ? "Diary" : "D"}</p>
    </Link>
  );
}

export default AppName;
