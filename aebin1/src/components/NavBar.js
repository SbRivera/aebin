import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';

const NavBar = () => (
  <nav className={styles.navbar}>
    <NavLink
      to="/"
      className={({ isActive }) => (isActive ? styles.active : '')}
    >
      Dashboard Empresarial
    </NavLink>
    <NavLink
      to="/avatar"
      className={({ isActive }) => (isActive ? styles.active : '')}
    >
      Interactuar con AE-BIN BOT
    </NavLink>
  </nav>
);

export default NavBar;
