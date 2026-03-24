import { Routes, Route } from 'react-router'
import Header from './components/layout/Header'
import Chords from './pages/Chords'
import About from './pages/About'
import Sheets from './pages/Sheets'
import Gallery from './pages/Gallery'
import Home from './pages/Home'
import Practice from './pages/Practice'

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/sheets" element={<Sheets />} />
        <Route path="/chords" element={<Chords />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </main>
  )
}

export default App