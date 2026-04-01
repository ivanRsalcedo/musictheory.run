import { useEffect, useMemo, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { getUserFavorites, addFavorite, removeFavorite } from '../lib/favorites'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useSearchParams } from 'react-router'
import styles from './Chords.module.css'
import { chords } from '../data/chords'
import ChordCard from '../components/music/ChordCard'
import PageShell from '../components/layout/PageShell'
import PageIntro from '../components/layout/PageIntro'
import useChordAudio from '../hooks/useChordAudio'

const FILTER_DEFAULTS = {
    course: 'all',
    group: 'all',
    root: 'all',
}

const COURSE_OPTIONS = ['all', 'Music Theory I', 'Music Theory II']

const ROOT_ORDER = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

export default function Chords() {
    const { user } = useAuth()
    const [favoriteIds, setFavoriteIds] = useState([])
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    const rawCourse = searchParams.get('course') ?? FILTER_DEFAULTS.course
    const rawGroup = searchParams.get('group') ?? FILTER_DEFAULTS.group
    const rawRoot = searchParams.get('root') ?? FILTER_DEFAULTS.root

    const selectedCourse = COURSE_OPTIONS.includes(rawCourse)
        ? rawCourse
        : FILTER_DEFAULTS.course

    const {
        isSamplerReady,
        activeDroneSourceId,
        playChord,
        playNote,
        enableDrone,
        disableDrone,
        stopAllAudio,
    } = useChordAudio()

    const chordsForSelectedCourse = useMemo(() => {
        if (selectedCourse === FILTER_DEFAULTS.course) {
            return chords
        }

        return chords.filter((chord) => chord.course.includes(selectedCourse))
    }, [selectedCourse])

    const groupOptions = useMemo(() => {
        const uniqueGroups = [...new Set(chordsForSelectedCourse.map((chord) => chord.group))]
        return [FILTER_DEFAULTS.group, ...uniqueGroups]
    }, [chordsForSelectedCourse])

    const selectedGroup = groupOptions.includes(rawGroup)
        ? rawGroup
        : FILTER_DEFAULTS.group

    const chordsForSelectedCourseAndGroup = useMemo(() => {
        if (selectedGroup === FILTER_DEFAULTS.group) {
            return chordsForSelectedCourse
        }

        return chordsForSelectedCourse.filter((chord) => chord.group === selectedGroup)
    }, [chordsForSelectedCourse, selectedGroup])

    const rootOptions = useMemo(() => {
        const availableRoots = new Set(
            chordsForSelectedCourseAndGroup.map((chord) => chord.root)
        )

        return [
            FILTER_DEFAULTS.root,
            ...ROOT_ORDER.filter((root) => availableRoots.has(root)),
        ]
    }, [chordsForSelectedCourseAndGroup])

    const selectedRoot = rootOptions.includes(rawRoot)
        ? rawRoot
        : FILTER_DEFAULTS.root

    const filteredChords = useMemo(() => {
        const rootFilteredChords =
            selectedRoot === FILTER_DEFAULTS.root
                ? chordsForSelectedCourseAndGroup
                : chordsForSelectedCourseAndGroup.filter(
                    (chord) => chord.root === selectedRoot
                )

        if (!showFavoritesOnly) {
            return rootFilteredChords
        }

        return rootFilteredChords.filter((chord) =>
            favoriteIds.includes(chord.id)
        )
    }, [
        chordsForSelectedCourseAndGroup,
        selectedRoot,
        showFavoritesOnly,
        favoriteIds,
    ])

    useEffect(() => {
        const normalizedParams = new URLSearchParams()

        if (selectedCourse !== FILTER_DEFAULTS.course) {
            normalizedParams.set('course', selectedCourse)
        }

        if (selectedGroup !== FILTER_DEFAULTS.group) {
            normalizedParams.set('group', selectedGroup)
        }

        if (selectedRoot !== FILTER_DEFAULTS.root) {
            normalizedParams.set('root', selectedRoot)
        }

        const currentString = searchParams.toString()
        const normalizedString = normalizedParams.toString()

        if (currentString !== normalizedString) {
            setSearchParams(normalizedParams, { replace: true })
        }
    }, [
        searchParams,
        selectedCourse,
        selectedGroup,
        selectedRoot,
        setSearchParams,
    ])

    useEffect(() => {
        async function loadFavorites() {
            const favorites = await getUserFavorites(user)
            setFavoriteIds(favorites)
        }

        loadFavorites()
    }, [user])

    function updateFilters(nextValues) {
        const nextCourse = nextValues.course ?? selectedCourse
        const nextGroup = nextValues.group ?? selectedGroup
        const nextRoot = nextValues.root ?? selectedRoot

        const nextParams = new URLSearchParams()

        if (nextCourse !== FILTER_DEFAULTS.course) {
            nextParams.set('course', nextCourse)
        }

        if (nextGroup !== FILTER_DEFAULTS.group) {
            nextParams.set('group', nextGroup)
        }

        if (nextRoot !== FILTER_DEFAULTS.root) {
            nextParams.set('root', nextRoot)
        }

        setSearchParams(nextParams)
    }

    function handleCourseChange(event) {
        stopAllAudio()

        updateFilters({
            course: event.target.value,
            group: FILTER_DEFAULTS.group,
            root: FILTER_DEFAULTS.root,
        })
    }

    function handleGroupChange(event) {
        stopAllAudio()

        updateFilters({
            group: event.target.value,
            root: FILTER_DEFAULTS.root,
        })
    }

    function handleRootChange(event) {
        stopAllAudio()

        updateFilters({
            root: event.target.value,
        })
    }

    function handleResetFilters() {
        stopAllAudio()
        setShowFavoritesOnly(false)
        setSearchParams({})
    }

    function handleEnableDrone(chordId, notes) {
        enableDrone(chordId, notes)
    }

    function handleDisableDrone(chordId) {
        disableDrone(chordId)
    }

    function handleFavoritesFilterToggle() {
        stopAllAudio()
        setShowFavoritesOnly((currentValue) => !currentValue)
    }

    async function handleToggleFavorite(chordId) {
        if (!user) {
            alert('Please sign in with your Rutgers account to save favorites.')
            return
        }

        const isAlreadyFavorite = favoriteIds.includes(chordId)

        if (isAlreadyFavorite) {
            await removeFavorite(user, chordId)
            setFavoriteIds((currentIds) =>
                currentIds.filter((id) => id !== chordId)
            )
            return
        }

        await addFavorite(user, chordId)
        setFavoriteIds((currentIds) => [...currentIds, chordId])
    }

    return (
        <PageShell>
            <PageIntro
                title="Chords"
                description="Filter class chord voicings by root, course, or chord group"
            />

            <div className={styles.controls}>
                <div className={styles.controlBlock}>
                    <label className={styles.label} htmlFor="root-filter">Root</label>
                    <select
                        id="root-filter"
                        className="ui-field"
                        value={selectedRoot}
                        onChange={handleRootChange}
                    >
                        {rootOptions.map((option) => (
                            <option key={option} value={option}>
                                {option === FILTER_DEFAULTS.root ? 'All roots' : option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.controlBlock}>
                    <label className={styles.label} htmlFor="course-filter">Course</label>
                    <select
                        id="course-filter"
                        className="ui-field"
                        value={selectedCourse}
                        onChange={handleCourseChange}
                    >
                        {COURSE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option === FILTER_DEFAULTS.course ? 'All courses' : option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.controlBlock}>
                    <label className={styles.label} htmlFor="group-filter">Group</label>

                    <select
                        id="group-filter"
                        className="ui-field"
                        value={selectedGroup}
                        onChange={handleGroupChange}
                    >
                        {groupOptions.map((option) => (
                            <option key={option} value={option}>
                                {option === FILTER_DEFAULTS.group ? 'All groups' : option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles.resultsMeta}>
                <p>{filteredChords.length} entries found</p>

                <div className={styles.resultsActions}>
                    <button
                        id="reset-filters"
                        type="button"
                        className={styles.resetButton}
                        onClick={handleResetFilters}
                        aria-label="Reset all filters"
                        title="Reset all filters"
                    >
                        Reset
                    </button>
                    <button
                        type="button"
                        className={
                            showFavoritesOnly
                                ? `${styles.favoritesToggle} ${styles.favoritesToggleActive}`
                                : styles.favoritesToggle
                        }
                        onClick={handleFavoritesFilterToggle}
                        aria-label={showFavoritesOnly ? 'Show all chords' : 'Show favorites only'}
                        title={showFavoritesOnly ? 'Show all chords' : 'Show favorites only'}
                    >
                        {showFavoritesOnly ? <FaHeart /> : <FaRegHeart />}
                    </button>

                    
                </div>
            </div>

            {filteredChords.length > 0 ? (
                <div className={styles.cardGrid}>
                    {filteredChords.map((chord) => (
                        <ChordCard
                            key={chord.id}
                            chord={chord}
                            isSamplerReady={isSamplerReady}
                            isDroneActive={activeDroneSourceId === chord.id}
                            onPlayChord={playChord}
                            onPlayNote={playNote}
                            onEnableDrone={handleEnableDrone}
                            onDisableDrone={handleDisableDrone}
                            isFavorite={favoriteIds.includes(chord.id)}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <h2 className={styles.emptyTitle}>No chords matched</h2>
                    <p className={styles.emptyText}>Try changing one of the filters above.</p>
                </div>
            )}
        </PageShell>
    )
}