import styles from './ChordCard.module.css'
import PianoDisplay from './PianoDisplay'
import { FaHeart, FaRegHeart, FaFilePdf } from 'react-icons/fa'

function formatFingering(fingering = []) {
    if (!fingering.length) return ''
    return fingering.join(' · ')
}

export default function ChordCard({
    chord,
    isSamplerReady,
    isDroneActive,
    onPlayChord,
    onPlayNote,
    onEnableDrone,
    onDisableDrone,
    isFavorite,
    onToggleFavorite,
}) {
    const previewNotes = chord.notes ?? []
    const fingering = formatFingering(chord.fingering)

    const resourceHref = chord.link ?? null
    const resourceLabel = `Open resource for ${chord.title}`

    function handlePlayClick() {
        if (!previewNotes.length) return
        onPlayChord(chord.id, previewNotes, '1n')
    }

    function handleDroneToggle() {
        if (!previewNotes.length) return

        if (isDroneActive) {
            onDisableDrone(chord.id)
        } else {
            onEnableDrone(chord.id, previewNotes)
        }
    }

    const droneButtonClassName = isDroneActive
        ? `${styles.modeButton} ${styles.modeButtonActive}`
        : styles.modeButton

    return (
        <article className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.titleBlock}>
                    <h2 className={styles.title}>{chord.title}</h2>
                    <p className={styles.group}>{chord.group}</p>
                </div>

                <div className={styles.cardActions}>
                    {resourceHref && (
                        <a
                            className={`${styles.iconButton} ${styles.pdfButton}`}
                            href={resourceHref}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={resourceLabel}
                            title={resourceLabel}
                        >
                            <FaFilePdf />
                        </a>
                    )}
                    <button
                        type="button"
                        className={
                            isFavorite
                                ? `${styles.iconButton} ${styles.favoriteButtonActive}`
                                : styles.iconButton
                        }
                        onClick={() => onToggleFavorite(chord.id)}
                        aria-label={isFavorite ? `Remove ${chord.title} from favorites` : `Add ${chord.title} to favorites`}
                        title={isFavorite ? 'Remove favorite' : 'Add favorite'}
                    >
                        {isFavorite ? <FaHeart /> : <FaRegHeart />}
                    </button>

                    
                </div>
            </div>

            <div className={styles.previewRow}>
                <div className={styles.previewButtons}>
                    <button
                        type="button"
                        className={styles.playButton}
                        onClick={handlePlayClick}
                        disabled={!isSamplerReady || previewNotes.length === 0}
                        aria-label={`Play ${chord.title}`}
                        title="Play chord"
                    >▶</button>

                    <button
                        type="button"
                        className={droneButtonClassName}
                        onClick={handleDroneToggle}
                        disabled={!isSamplerReady || previewNotes.length === 0}
                        aria-label={`Toggle drone for ${chord.title}`}
                        title="Toggle drone"
                    >Drone</button>
                </div>

                <div className={styles.pianoPreview}>
                    <PianoDisplay
                        notes={previewNotes}
                        interactive={true}
                        showLabels={false}
                        size="small"
                        onPlayNote={(note) => onPlayNote(chord.id, note)}
                    />
                </div>
            </div>

            {fingering && <p className={styles.fingering}>{fingering}</p>}
        </article>
    )
}