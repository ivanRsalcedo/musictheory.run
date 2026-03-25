import PageShell from '../components/layout/PageShell'
import PageIntro from '../components/layout/PageIntro'
import styles from './Home.module.css'
import { Link } from 'react-router'

export default function Home() {
    return (
        <PageShell>
            <PageIntro title="Home" description="Work in progress web app for students of Music Theory I and II at Rutgers—Newark"/>
            <p>
                Nothing here yet, but check out the <Link to="/chords">chords</Link> page!
            </p>
        </PageShell>
    )
}