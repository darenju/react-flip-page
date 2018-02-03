import React from 'react';
import { Link as HomeLink, NavLink } from 'react-router-dom';
import s from './styles/Header.css';
import logo from '../img/logo.svg';

const Link = ({ label, to }) => (
  <NavLink
    to={to}
    exact
    className={s.link}
    activeClassName={s.linkActive}
  >
    {label}
  </NavLink>
)

const Header = () => (
  <header className={s.header}>
    <HomeLink to="/" className={s.logo}>
      <img src={logo} className={s.logoImg} />
      react-flip-page
    </HomeLink>
    <nav className={s.nav}>
      <Link to="/" label="Home" />
      <Link to="/docs" label="Docs" />
      <Link to="/examples" label="Examples" />
      <Link to="/responsive" label="Responsive Demo" />
    </nav>
  </header>
);

export default Header;
