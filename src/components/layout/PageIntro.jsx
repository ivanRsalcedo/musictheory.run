import styles from './PageIntro.module.css'

export default function PageIntro({ title, description }) {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            {description && (
                <p className={styles.description}>{description}</p>
            )}
        </header>
    )
}