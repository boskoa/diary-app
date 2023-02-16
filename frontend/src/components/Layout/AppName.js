import { useEffect, useState } from "react";

function AppName() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleWidth);

    return () => window.removeEventListener("resize", handleWidth);
  }, []);
  return <p>{width > 350 ? "Diary" : "D"}</p>;
}

export default AppName;
