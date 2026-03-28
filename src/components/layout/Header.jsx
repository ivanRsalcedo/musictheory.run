import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import styles from './Header.module.css'
import { navItems } from '../../data/navigation'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function handleMenuToggle() {
        setIsMenuOpen((currentValue) => !currentValue)
    }

    function handleCloseMenu() {
        setIsMenuOpen(false)
    }

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Link
                    to="/"
                    className={styles.brand}
                    onClick={handleCloseMenu}
                    aria-label="Go to homepage"
                >
                    <span className={styles.logoText}>RUN</span>

                    <span className={styles.titleStack}>
                        <span className={styles.titleLine}>MUSIC</span>
                        <span className={styles.titleLine}>THEORY</span>
                    </span>
                </Link>

                <nav className={styles.nav} aria-label="Main navigation">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                isActive
                                    ? `${styles.link} ${styles.linkActive}`
                                    : styles.link
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <button
                    className={styles.menuButton}
                    type="button"
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation"
                    onClick={handleMenuToggle}
                >
                    ☰
                </button>
            </div>

            <nav
                id="mobile-navigation"
                className={
                    isMenuOpen
                        ? `${styles.mobileNav} ${styles.mobileNavOpen}`
                        : styles.mobileNav
                }
                aria-label="Mobile navigation"
            >
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={handleCloseMenu}
                        className={({ isActive }) =>
                            isActive
                                ? `${styles.mobileLink} ${styles.mobileLinkActive}`
                                : styles.mobileLink
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </header>
    )
}