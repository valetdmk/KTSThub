import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <>
      <h1>Главная</h1>
      <nav>
        <Link to="/participants">Участники</Link> |{' '}
        <Link to="/schedule">Расписание</Link> |{' '}
        <Link to="/profile">Личный кабинет</Link> |{' '}
        <Link to="/admin">админ</Link>
      </nav>
    </>
  )
}

