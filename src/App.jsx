import { HashRouter, Route, Routes } from 'react-router'
import './App.css'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './components/Home'
import Bills from './components/Bills'
import Roommates from './components/Roommates'
import AboutMe from './components/AboutMe'

function App() {
  return (
    <HashRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navigation />
        <main className="flex-grow-1" id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/roommates" element={<Roommates />} />
            <Route path="/about" element={<AboutMe />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App