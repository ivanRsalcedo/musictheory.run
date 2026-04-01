import { Link } from 'react-router'
import PageShell from '../components/layout/PageShell'
import PageIntro from '../components/layout/PageIntro'
import styles from './Home.module.css'

export default function Home() {
    return (
        <PageShell>
            <PageIntro
                title="Home"
                description="Welcome to the web companion for students of the Music Theory courses at Rutgers—Newark!"
            />

            <section className={styles.section}>
                <div className={styles.content}>
                    <h3>Current Features</h3>

                    <ul className={styles.infoList}>
                        <li>
                            View, search, and playback chords from Music Theory I & II on the <Link to="/chords">Chords</Link> page
                        </li>
                        <li>
                            Browse student midterm and final projects on the <Link to="/archive">Archive</Link> page
                        </li>
                    </ul>

                    <h3>Updates</h3>

                    <ul className={styles.infoList}>
                        <li>
                            You can log in with your Rutgers email to save chords as favorites!
                        </li>
                        <li>
                            TBA: Interactive sheet music, practice tools, and progress tracking
                        </li>
                    </ul>
                </div>

                <div className={styles.previewWrap}>
                    <img
                        src="/images/screenshots/chordspreview.png"
                        alt="Preview of the chords page with filters and chord cards"
                        className={styles.previewImage}
                    />
                </div>
            </section>
        </PageShell>
    )
}