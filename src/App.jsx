import { Routes, Route } from 'react-router'
import Header from './components/layout/Header'
import ScoreViewer from './components/music/ScoreViewer'
import Chords from './pages/Chords'
import About from './pages/About'

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/exercises" element={<div>Exercises</div>} />
        <Route path="/homework" element={<ScoreViewer />} />
        <Route path="/chords" element={<Chords />} />
        <Route path="/examples" element={<div>Example</div>} />
        <Route path="/mission" element={<div>Mission Page</div>} />
        <Route path="/about" element={<About />} />
      </Routes>
    </main>
  )
}

export default App