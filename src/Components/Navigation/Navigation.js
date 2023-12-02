import { useState, useEffect, useRef } from "react";
import "./Navigation.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { NavLink } from "react-router-dom";

function Navigation() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [categoriesHover, setCategoriesHover] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  const containerRef = useRef(null);

  const categories = [
    {
      category: "Electronics",
      path: "/electronics",
    },
    {
      category: "Home",
      path: "/home",
    },
    {
      category: "Kitchen",
      path: "/kitchen",
    },
    {
      category: "Clothes",
      path: "/clothes",
    },
  ];

  const links = categories.map((item) => (
    <NavLink className="categories-li" to={`categories${item.path}`}>
      {item.category}
    </NavLink>
  ));

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function closeNavigation() {
    setMenuOpened(false);
    setCategoriesHover(false);
    // setMenuOpened(false);
  }

  return (
    <div>
      {screenWidth > 1178 ? (
        <nav
          onMouseLeave={() => setCategoriesHover(false)}
          className="navigation"
        >
          <div className="ul-container">
            <ul className="ul-center">
              <li
                className="cursor-pointer"
                // onMouseLeave={() => setCategoriesHover(false)}
                onMouseEnter={() => setCategoriesHover(true)}
              >
                Categories
                {/* <KeyboardArrowDownIcon fontSize="large" />{" "} */}
              </li>
            </ul>
            <ul className="ul-right">
              <li>
                <NavLink className="nav-link" to={"/login"}>
                  Log in
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink className="nav-link" to={"/register"}>
                  Register
                </NavLink>
              </li>
              <li className="cart-li">
                <NavLink className="nav-link" to={"/cart"}>
                  <div className="cart-nav">
                    <ShoppingCartIcon fontSize="large" /> 2{" "}
                    {/* <KeyboardArrowDownIcon fontSize="large" /> */}
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
          <div
            className={`categories-container ${
              categoriesHover && "categories-container-opened"
            }`}
          >
            <ul className="categories-ul">{links}</ul>
          </div>
        </nav>
      ) : (
        <nav
          ref={containerRef}
          className={"mobile-navigation"}
          // className={`mobile-navigation ${
          //   menuOpened && "mobile-navigation-opened"
          // }`}
        >
          <div className="menu-icons">
            {menuOpened ? (
              <CloseIcon
                onClick={() => setMenuOpened(false)}
                className="menu-icon "
                fontSize="large"
              />
            ) : (
              <MenuIcon
                onClick={() => setMenuOpened(true)}
                className="menu-icon "
                fontSize="large"
                style={{
                  marginLeft: "auto",
                  // justifySelf: "flex-end",
                }}
              />
            )}
          </div>

          <ul className={` mobile-ul ${menuOpened && "mobile-ul-opened"} `}>
            <li onClick={() => setCategoriesHover(!categoriesHover)}>
              Categories
            </li>
            <div
              className={`categories-container-mobile ${
                categoriesHover && "categories-container-mobile-open"
              } `}
            >
              <ul className="categories-ul-mobile">{links}</ul>
            </div>
            <li>
              {" "}
              <NavLink to={"/login"}>Log in</NavLink>
            </li>
            <li>
              {" "}
              <NavLink to={"/register"}>Register</NavLink>
            </li>
            <li className="mobile-cart-li">
              <NavLink to={"/cart"}>
                <p>Shopping cart</p>
                <div className="cart-nav cart-nav-mobile">
                  <ShoppingCartIcon fontSize="large" /> 2{" "}
                  {/* <KeyboardArrowDownIcon fontSize="large" /> */}
                </div>
              </NavLink>{" "}
            </li>
          </ul>
          <div
            onClick={closeNavigation}
            className={`touch-to-close ${
              menuOpened && "touch-to-close-visible"
            }`}
          ></div>
        </nav>
      )}
    </div>
  );
}

export default Navigation;
