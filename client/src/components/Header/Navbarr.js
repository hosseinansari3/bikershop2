import { menuItems } from "./menuItemss";
import MenuItems from "./MenuItems";
import { Row } from "react-bootstrap";
import "./ss.css";
import useSticky from "./useSticky";
import { useEffect, useState } from "react";
import { SettingsInputHdmiRounded } from "@mui/icons-material";
const Navbarr = () => {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [scrollY, setScrollY] = useState(null);
  const { sticky, stickyRef } = useSticky();
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      if (scrollY > 180) {
        setHide(true);
      } else {
        setHide(false);
      }

      setScrollY(scrollY);
      var direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection /*&&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)*/
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection);

    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  var hd = scrollDirection === "down" && hide;

  return (
    <div className="border-t-white border-solid	border-t-2 hidden lg:flex">
      <nav
        style={window.location.pathname == "/" ? { opacity: "0.7" } : null}
        ref={stickyRef}
        className={`nav-area   ${sticky ? "lower-header-sticky" : null}`}
      >
        <ul className="menus">
          {menuItems.map((menu, index) => {
            const depthLevel = 0;
            return (
              <MenuItems items={menu} key={index} depthLevel={depthLevel} />
            );
          })}
        </ul>
      </nav>
      <div
        style={{
          height: sticky ? `${stickyRef.current?.clientHeight}px` : "0px",
        }}
      />
    </div>
  );
};

export default Navbarr;
