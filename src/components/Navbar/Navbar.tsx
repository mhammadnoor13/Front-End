import React, { type ReactNode } from 'react';
import styles from './Navbar.module.css';

interface Props { children: ReactNode }

export default function Navbar({ children }: Props) {
  return <nav className={styles.nav}>{children}</nav>;
}
