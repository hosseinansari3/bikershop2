import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/esm/Row";
import { useLocation } from "react-router";
import DropDown from "./DropDown";
import useSticky from "./useSticky";

function Navbar() {
  const [scrollDirection, setScrollDirection] = useState(null);
  const { sticky, stickyRef } = useSticky();

  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const changeClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      var direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection);
    console.log(`scroll direction:${scrollDirection}`);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  const location = useLocation();

  return (
    <div
      className="hidden lg:block"
      ref={stickyRef}
      style={
        location.pathname == "/"
          ? {
              backgroundColor: "black",
              opacity: "0.5",
            }
          : null
      }
    >
      <div
        className={`lower-header ${
          scrollDirection === "down" && sticky ? "hide" : "show"
        } ${sticky ? "lower-header-sticky" : null}`}
      >
        <nav className="menu-wrapper">
          <ul>
            <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              <p>bikes</p>
              {dropdown && <DropDown />}
            </li>
            <li>Parts</li>
            <li>Chlothings</li>
            <li onMouseEnter={onMouseEnter}>
              <p>Magazine</p>
              {dropdown && <DropDown />}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
