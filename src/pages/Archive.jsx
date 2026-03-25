import PageIntro from '../components/layout/PageIntro'
import PageShell from '../components/layout/PageShell'
import ProjectSection from '../components/archive/ProjectSection'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import styles from './Archive.module.css'
import { archiveTimelineData } from '../utils/archiveData'

export default function Archive() {
    return (
        <PageShell>
            <PageIntro
                title="Archive"
                description="An archive of midterm and final projects by students, shared with permission."
            />

            <section className={styles.noticeSection}>
                <div className="paper-section">
                    <p className={styles.noticeText}>
                        If you'd like to have your midterm or final project added, please email <a href="mailto:ivan.salcedo@rutgers.edu">ivan.salcedo@rutgers.edu</a> including which semester, year, course (Music Theory I or II), and your name and song title (can be anonymous/untitled if preferred)
                    </p>
                </div>
            </section>

            <section className={styles.timelineSection}>
                <VerticalTimeline>
                    {archiveTimelineData.map((entry) => (
                        <VerticalTimelineElement
                            key={entry.semester}
                            date={entry.semester}
                            icon={<span className={styles.timelineDot} />}
                        >
                            <div className={styles.semesterContent}>
                                <h2 className={styles.mobileSemester}>{entry.semester}</h2>

                                <ProjectSection
                                    title="Midterm Projects"
                                    tracks={entry.midterm}
                                />

                                <ProjectSection
                                    title="Final Projects"
                                    tracks={entry.final}
                                />
                            </div>
                        </VerticalTimelineElement>
                    ))}
                </VerticalTimeline>
            </section>
        </PageShell>
    )
}