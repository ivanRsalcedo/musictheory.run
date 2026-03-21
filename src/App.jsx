import { Routes, Route } from 'react-router'
import Header from './components/Header'
import ScoreViewer from './components/ScoreViewer'

function App() {
  return (
    <main>
      <Header />

      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/exercises" element={<div>Exercises</div>} />
        <Route path="/homework" element={<ScoreViewer />} />
        <Route path="/glossary" element={<div>Glossary</div>} />
        <Route path="/examples" element={<div>Example</div>} />
        <Route path="/mission" element={<div>Mission Page</div>} />
        <Route path="/about" element={<div>About</div>} />
      </Routes>
    </main>
  )
}

export default App