import { HashRouter, Route, Routes } from 'react-router'
import './App.css'
import Navigation from './components/Navigation'
import Home from './components/Home'
import Bills from './components/Bills'
import AboutMe from './components/AboutMe'

function App() {
  return <HashRouter>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/bills" element={<Bills />}></Route>
      <Route path="/about" element={<AboutMe />}></Route>
    </Routes>
  </HashRouter>
}

export default App