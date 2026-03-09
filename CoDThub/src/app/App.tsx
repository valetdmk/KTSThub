import './App.scss'
import { Routes, Route } from 'react-router-dom'
import Events from '../pages/events/events'
import EventPage from '../pages/events/eventpage'

export function App() {

  return (
    <div className="app">
      <h1>Приложение в разработке</h1>
      
      <Routes>
        <Route path="/" element={<div>Главная страница</div>} />
        <Route path="*" element={<div>404 — страница не найдена</div>} />
        <Route path="/events" element={<Events />} />
        <Route path="events/:id" element={<EventPage />} />
      </Routes>
    </div>
  )
}
