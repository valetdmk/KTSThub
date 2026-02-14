import { Routes, Route, Link, BrowserRouter } from 'react-router-dom'

import Home from '../pages/Home'
import Participants from '../pages/Participants'
import Schedule from '../pages/Schedule'
import Admin from '../pages/Admin'
import Profile from '../pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <>
        <nav>
          <Link to="/">Главная</Link> |{' '}
          <Link to="/participants">Участники</Link> |{' '}
          <Link to="/schedule">Расписание</Link> |{' '}
          <Link to="/admin">Админ</Link> |{' '}
          <Link to="/profile">Профиль</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/participants" element={<Participants />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </>
    </BrowserRouter>
  )
}

export default App