import { useState } from 'react'
import Layout from './layouts/MainLayout'
import Home from './pages/Home/Home'
import { Modal } from './components/Button/Modal'
import './animations.css'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false) 

  return (
    <>
      {/* Fragment используется, чтобы не добавлять лишний div */}
      <Layout>
        <Home />
      </Layout>
      {/* Демонстрация модалки */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default App