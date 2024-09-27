import { NavLink } from "react-router-dom";
import css from "./Header.module.css";
// import clsx from "clsx";

const Header = () => {

    // const buildLinkClass = ({ isActive }) => {
    //   return clsx(css.link, isActive && css.active);
    // };

  return (
    <div className={css.header}>
      Header
      <ul className={css.list}>
        <li className={css.item}>
          <NavLink
            className={({ isActive }) => (isActive ? css.active : css.link)}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className={css.item}>
          <NavLink
            className={({ isActive }) => (isActive ? css.active : css.link)}
            to="/movies"
          >
            Movies page
          </NavLink>
        </li>
        <li className={css.item}>
          <NavLink
            className={({ isActive }) => (isActive ? css.active : css.link)}
            to="/movie/:movieId"
          >
            Movie details page
          </NavLink>
        </li>
        <li className={css.item}></li>
      </ul>
    </div>
  );
}

export default Header