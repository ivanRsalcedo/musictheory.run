const CHORD_GROUPS = {
    C_MAJOR_EXTENDED_CHORDS: {
        course: ['Music Theory I', 'Music Theory II'],
        name: 'C Major Extended Chords',
        link: 'https://drive.google.com/drive/u/0/folders/1mdhY-FCX55OiupbUMJr5iynbnpnrVobk',
    },

    C_MAJOR_DIATONIC_ADD_AND_EXTENDED: {
        course: ['Music Theory I', 'Music Theory II'],
        name: 'C Major Diatonic Add and Extended Chords',
        link: '/pdfs/chordal-components/Chordal Components - C Major Diatonic Add and Extended Chords.pdf',
    },

    BORROWED_FROM_EB_MAJOR: {
        course: ['Music Theory II'],
        name: 'Borrowed Chords From Eb Major',
        link: '/pdfs/chordal-components/Chordal Components - Borrowed Chords From Eb Major.pdf',
    },

    BORROWED_FROM_C_MELODIC_MAJOR: {
        course: ['Music Theory II'],
        name: 'Borrowed Chords From C Melodic Major',
        link: '/pdfs/chordal-components/Chordal Components - Borrowed Chords From C Melodic Major.pdf',
    },
    BORROWED_FROM_F_MAJOR: {
        course: ['Music Theory II'],
        name: 'Borrowed Chords From F Major',
        link: '/pdfs/chordal-components/Chordal Components - Borrowed Chords From F Major.pdf',
    },
}

class Chord {
    constructor(title, notes, fingering, group = null) {
        this.title = title
        this.id = this.createIdFromTitle(title, group)
        this.root = this.getRootFromTitle(title)

        this.course = group?.course ?? ['Other']
        this.group = group?.name ?? 'Other'
        this.link = group?.link ?? ''

        this.notes = notes
        this.fingering = fingering
        this.next = []
    }

    getRootFromTitle(title) {
        return title[1] === 'b' || title[1] === '#' ? title[0] + title[1] : title[0]
    }

    createIdFromTitle(title, group) {
        const base = title
            .toLowerCase()
            .replaceAll('Δ', 'major')
            .replaceAll('#', 'sharp')
            .replaceAll('/', '-')
            .replaceAll('(', '-')
            .replaceAll(')', '-')
            .replaceAll(' ', '-')
            .replaceAll('+', 'add')
            .replace(/[^a-z0-9-]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')

        const groupPart = group?.name
            ?.toLowerCase()
            .replace(/[^a-z0-9]/g, '')

        
        // for the dupes
        return groupPart ? `${base}-${groupPart}` : base
    }

    setPage(page) {
        if (!this.link) return this

        const baseLink = this.link.split('#')[0]
        this.link = `${baseLink}#page=${page}`
        return this
    }

    setLink(link) {
        this.link = link
        return this
    }

    // for chord prog generation, later!
    addNext(chord, reason = '') {
        this.next.push({
            chord,
            reason,
        })
        return this
    }
}

/*
|--------------------------------------------------------------------------
| C Major Extended Chords
|--------------------------------------------------------------------------
*/

const cMajorExtended = new Chord(
    'C',
    ['C3', 'E3', 'G3', 'C4', 'E4', 'G4'],
    ['L5', 'L3', 'L1', 'R2', 'R4', 'R5'],
    CHORD_GROUPS.C_MAJOR_EXTENDED_CHORDS
).setPage(1)

const aMinor7 = new Chord(
    'A-7',
    ['A2', 'G3', 'C4', 'E4', 'G4'],
    ['L5', 'L1', 'R2', 'R4', 'R5'],
    CHORD_GROUPS.C_MAJOR_EXTENDED_CHORDS
).setPage(2)

const fMajor9Extended = new Chord(
    'FΔ9',
    ['F2', 'E3', 'A3', 'C4', 'E4', 'G4'],
    ['L5', 'L1', 'R1', 'R2', 'R4', 'R5'],
    CHORD_GROUPS.C_MAJOR_EXTENDED_CHORDS
).setPage(3)

const dMinor119Extended = new Chord(
    'D-11(9)',
    ['D2', 'F3', 'C4', 'E4', 'G4'],
    ['L5', 'R1', 'R2', 'R4', 'R5'],
    CHORD_GROUPS.C_MAJOR_EXTENDED_CHORDS
).setPage(4)

const g13Sus = new Chord(
    'G13sus',
    ['G2', 'F3', 'C4', 'E4', 'G4'],
    ['L5', 'R1', 'R2', 'R4', 'R5'],
    CHORD_GROUPS.C_MAJOR_EXTENDED_CHORDS
).setPage(5)

const cOverE = new Chord(
    'C/E',
    ['E2', 'G3', 'C4', 'E4', 'G4'],
    ['L5', 'R1', 'R2', 'R4', 'R5'],
    CHORD_GROUPS.C_MAJOR_EXTENDED_CHORDS
).setPage(6)

/*
|--------------------------------------------------------------------------
| C Major Diatonic Add and Extended Chords
|--------------------------------------------------------------------------
*/

const cAdd2 = new Chord(
    'C(add 2)',
    ['C3', 'E3', 'G3', 'C4', 'D4', 'E4', 'G4'],
    ['L5', 'L3', 'L1', 'R1', 'R2', 'R3', 'R5'],
    CHORD_GROUPS.C_MAJOR_DIATONIC_ADD_AND_EXTENDED
).setPage(1)

const aMinor7AddFlat6 = new Chord(
    'A-7(add b6)',
    ['A2', 'F3', 'G3', 'C4', 'E4', 'G4'],
    ['L5', 'L2', 'L1', 'R1', 'R3', 'R5'],
    CHORD_GROUPS.C_MAJOR_DIATONIC_ADD_AND_EXTENDED
).setPage(2)

const fMajor9 = new Chord(
    'FΔ9',
    ['F2', 'E3', 'A3', 'C4', 'E4', 'G4'],
    ['L5', 'L1', 'R1', 'R2', 'R4', 'R5'],
    CHORD_GROUPS.C_MAJOR_DIATONIC_ADD_AND_EXTENDED
).setPage(3)

const dMinor119 = new Chord(
    'D-11(9)',
    ['D2', 'F3', 'C4', 'E4', 'G4'],
    ['L5', 'R1', 'R2', 'R4', 'R5'],
    CHORD_GROUPS.C_MAJOR_DIATONIC_ADD_AND_EXTENDED
).setPage(4)

const g13SusAdd9 = new Chord(
    'G13sus(add 9)',
    ['G2', 'F3', 'A3', 'C4', 'E4', 'G4'],
    ['L5', 'L1', 'R1', 'R2', 'R4', 'R5'],
    CHORD_GROUPS.C_MAJOR_DIATONIC_ADD_AND_EXTENDED
).setPage(5)

const cAdd2OverE = new Chord(
    'C(add 2)/E',
    ['E2', 'G3', 'C4', 'D4', 'E4', 'G4'],
    ['L5', 'R1', 'R2', 'R3', 'R4', 'R5'],
    CHORD_GROUPS.C_MAJOR_DIATONIC_ADD_AND_EXTENDED
).setPage(6)

/*
|--------------------------------------------------------------------------
| Borrowed Chords From Eb Major
|--------------------------------------------------------------------------
*/

const abMajor7 = new Chord(
    'AbΔ7',
    ['Ab2', 'G3', 'C4', 'Eb4', 'G4'],
    ['L5', 'L1', 'R1', 'R3', 'R5'],
    CHORD_GROUPS.BORROWED_FROM_EB_MAJOR
).setPage(1)

const bb13Sus9 = new Chord(
    'Bb13sus(9)',
    ['Bb2', 'Ab3', 'C4', 'Eb4', 'G4'],
    ['L5', 'L1', 'R1', 'R3', 'R5'],
    CHORD_GROUPS.BORROWED_FROM_EB_MAJOR
).setPage(2)

const cMinorAddFlat6 = new Chord(
    'C-(add b6)',
    ['C3', 'G3', 'Ab3', 'C4', 'Eb4', 'G4'],
    ['L5', 'L1', 'R1', 'R2', 'R3', 'R5'],
    CHORD_GROUPS.BORROWED_FROM_EB_MAJOR
).setPage(3)

const fMinor9 = new Chord(
    'F-9',
    ['F2', 'Ab3', 'C4', 'Eb4', 'G4'],
    ['L5', 'R1', 'R2', 'R3', 'R5'],
    CHORD_GROUPS.BORROWED_FROM_EB_MAJOR
).setPage(4)

/*
|--------------------------------------------------------------------------
| Borrowed Chords From C Melodic Major
|--------------------------------------------------------------------------
*/

const e7Sharp9Sharp5 = new Chord(
    'E7(#9)(#5)',
    ['E2', 'G#3', 'C4', 'D4', 'E4', 'G4'],
    ['L5', 'R1', 'R2', 'R3', 'R4', 'R5'],
    CHORD_GROUPS.BORROWED_FROM_C_MELODIC_MAJOR
).setPage(1)

const dMinor119Flat5 = new Chord(
    'D-11(9)(b5)',
    ['D3', 'F3', 'Ab3', 'C4', 'E4', 'G4'],
    ['L3', 'L1', 'R1', 'R2', 'R4', 'R5'],
    CHORD_GROUPS.BORROWED_FROM_C_MELODIC_MAJOR
).setPage(2)

const cAddFlat6 = new Chord(
    'C(add b6)',
    ['C3', 'E3', 'G3', 'Ab3', 'C4', 'E4', 'G4'],
    ['L5', 'L3', 'L1', 'R1', 'R2', 'R4', 'R5'],
    CHORD_GROUPS.BORROWED_FROM_C_MELODIC_MAJOR
).setPage(3)

const c7AddFlat6 = new Chord(
    'C7(add b6)',
    ['C3', 'E3', 'Ab3', 'Bb3', 'C4', 'E4', 'G4'],
    ['L5', 'L3', 'L1', 'R1', 'R2', 'R4', 'R5'],
    CHORD_GROUPS.BORROWED_FROM_C_MELODIC_MAJOR
).setPage(4)

const fMinorMajor9 = new Chord(
    'F-Δ9',
    ['F2', 'Ab3', 'C4', 'E4', 'G4'],
    ['L5', 'R1', 'R2', 'R4', 'R5'],
    CHORD_GROUPS.BORROWED_FROM_C_MELODIC_MAJOR
).setPage(5)

const g13SusAddFlat9 = new Chord(
    'G13sus(add b9)',
    ['G2', 'F3', 'Ab3', 'C4', 'E4', 'G4'],
    ['L5', 'L1', 'R1', 'R2', 'R4', 'R5'],
    CHORD_GROUPS.BORROWED_FROM_C_MELODIC_MAJOR
).setPage(6)

const abMajor7Sharp5 = new Chord(
    'AbΔ7(#5)',
    ['Ab2', 'G3', 'C4', 'E4', 'G4'],
    ['L5', 'L1', 'R1', 'R3', 'R5'],
    CHORD_GROUPS.BORROWED_FROM_C_MELODIC_MAJOR
).setPage(7)

const bb13Sharp119Omit3 = new Chord(
    'Bb13(#11)(9)(omit 3)',
    ['Bb2', 'Ab3', 'C4', 'E4', 'G4'],
    ['L5', 'L1', 'R1', 'R3', 'R5'],
    CHORD_GROUPS.BORROWED_FROM_C_MELODIC_MAJOR
).setPage(8)

/*
|--------------------------------------------------------------------------
| Borrowed Chords From F Major
|--------------------------------------------------------------------------
*/

const gMinor1311 = new Chord(
    'G-13(11)',
    ['G2', 'F3', 'Bb3', 'C4', 'E4', 'G4'],
    ['L5', 'L1', 'R1', 'R2', 'R4', 'R5'],
    CHORD_GROUPS.BORROWED_FROM_F_MAJOR
).setPage(1)

const bbMajor13Sharp119 = new Chord(
    'BbΔ13#11(9)',
    ['Bb2', 'D3', 'A3', 'C4', 'E4', 'G4'],
    ['L5', 'L3', 'L1', 'R1', 'R3', 'R5'],
    CHORD_GROUPS.BORROWED_FROM_F_MAJOR
).setPage(2)

const c7FromFMajor = new Chord(
    'C7',
    ['C3', 'E3', 'Bb3', 'C4', 'E4', 'G4'],
    ['L5', 'L3', 'L1', 'R1', 'R3', 'R5'],
    CHORD_GROUPS.BORROWED_FROM_F_MAJOR
).setPage(3)

const c7SusAdd3 = new Chord(
    'C7sus(add 3)',
    ['C3', 'F3', 'Bb3', 'C4', 'E4', 'G4'],
    ['L5', 'L2', 'L1', 'R1', 'R3', 'R5'],
    CHORD_GROUPS.BORROWED_FROM_F_MAJOR
).setPage(4)

/*
|--------------------------------------------------------------------------
| Progression links
|--------------------------------------------------------------------------
|
| Will add links here later with:
| someChord.addNext(otherChord, 'reason here')
|
*/

const cMajorExtendedChords = [
    cMajorExtended,
    aMinor7,
    fMajor9Extended,
    dMinor119Extended,
    g13Sus,
    cOverE,
]

const cMajorDiatonicAddAndExtendedChords = [
    cAdd2,
    aMinor7AddFlat6,
    fMajor9,
    dMinor119,
    g13SusAdd9,
    cAdd2OverE,
]

const borrowedChordsFromEbMajor = [
    abMajor7,
    bb13Sus9,
    cMinorAddFlat6,
    fMinor9,
]

const borrowedChordsFromCMelodicMajor = [
    e7Sharp9Sharp5,
    dMinor119Flat5,
    cAddFlat6,
    c7AddFlat6,
    fMinorMajor9,
    g13SusAddFlat9,
    abMajor7Sharp5,
    bb13Sharp119Omit3,
]

const borrowedChordsFromFMajor = [
    gMinor1311,
    bbMajor13Sharp119,
    c7FromFMajor,
    c7SusAdd3,
]

const chords = [
    ...cMajorExtendedChords,
    ...cMajorDiatonicAddAndExtendedChords,
    ...borrowedChordsFromEbMajor,
    ...borrowedChordsFromFMajor,
    ...borrowedChordsFromCMelodicMajor,
]

export {
    CHORD_GROUPS,
    Chord,
    cMajorExtendedChords,
    cMajorDiatonicAddAndExtendedChords,
    borrowedChordsFromEbMajor,
    borrowedChordsFromFMajor,
    borrowedChordsFromCMelodicMajor,
    chords,
}