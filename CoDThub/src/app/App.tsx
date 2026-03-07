import './App.scss'
import { Routes, Route } from 'react-router-dom'

export function App() {

  return (
    <div className="app">
      <h1>Приложение в разработке</h1>
      
      <Routes>
        <Route path="/" element={<div>Главная страница (пока заглушка)</div>} />
        <Route path="*" element={<div>404 — страница не найдена (пока)</div>} />
      </Routes>
    </div>
  )
}
