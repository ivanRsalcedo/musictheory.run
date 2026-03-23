import PageIntro from '../components/layout/PageIntro'
import PageShell from '../components/layout/PageShell'
import styles from './About.module.css'

export default function About() {
    return (
        <PageShell>
            <PageIntro
                title="About"
                description={
                    <>
                        by{' '}<a href="https://www.linkedin.com/in/ivanrsalcedo/" target="_blank" rel="noreferrer">Ivan Salcedo</a>{' '}· Updated on Mar 22, 2026
                    </>
                }
            />

            <div className={styles.sections}>
                <p>
                    This is a student-built web companion for Rutgers—Newark Music Theory I and II courses.
                </p>

                <div className={styles.twoColumn}>
                    <section className="paper-section">
                        <h3>Mission</h3>
                        <p>
                            My goal is to make the most convenient web app possible for Rutgers Newark Music Theory students for reviewing, practicing, and enjoying the phenomenal course I have had the honor of taking myself.
                        </p>
                        <p>
                            I seek to understand what makes learning music difficult for some, and hope that this app may open doors for those who may benefit from technology-assisted learning.
                        </p>
                    </section>

                    <section className="paper-section">
                        <h3>Vision</h3>
                        <p>
                            I want this site to continue helping students in all future semesters. 
                        </p>
                        <p>
                            I also hope to build a free, module-based course that teaches the same core concepts for people who may not have the opportunity to take the class in person. The approach taught in this curriculum is so intuitive, practical, and applicable across all kinds of music, and I believe it should be more widely accessible.
                        </p>
                    </section>
                </div>

                <section className="paper-section">
                    <h3>Acknowledgment</h3>
                    <p>
                        Shoutout to Professor Tyler Kaneshiro and Professor Stefon Harris for being the coolest educators I have met in my entire life. I've never encountered professors so willing to invest time outside of class to make sure students truly understand the material, while also offering personal guidance in music, life, and just having real, friendly conversations.
                    </p>

                    <p>
                        Shoutout also to all my classmates from Music Theory I and II in
                        Fall 2025 and Spring 2026!
                    </p>
                </section>
            </div>
        </PageShell>
    )
}