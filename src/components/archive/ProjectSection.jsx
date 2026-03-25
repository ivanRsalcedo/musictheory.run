import styles from './ProjectSection.module.css'

export default function ProjectSection({ title, tracks }) {
    if (!tracks.length) return null

    return (
        <section className={styles.projectSection}>
            <h3 className={styles.projectSectionTitle}>{title}</h3>

            <div className={styles.trackList}>
                {tracks.map((track) => (
                    <article key={track.id} className={styles.trackCard}>
                        <div className={styles.trackHeader}>
                            <h4 className={styles.trackTitle}>{track.songTitle}</h4>
                            <p className={styles.trackMeta}>by {track.author}</p>
                        </div>

                        <audio
                            className={styles.audioPlayer}
                            controls
                            preload="metadata"
                            controlsList="nodownload noplaybackrate"
                            disableRemotePlayback
                        >
                            <source src={track.audioUrl} />
                        </audio>
                    </article>
                ))}
            </div>
        </section>
    )
}