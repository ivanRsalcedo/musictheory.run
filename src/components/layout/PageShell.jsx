import styles from './PageShell.module.css'

export default function PageShell({ children }) {
    return <main className={styles.page}>{children}</main>
}