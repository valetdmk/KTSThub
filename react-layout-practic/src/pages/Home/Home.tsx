import { Hero } from '../../components/Hero/Hero'
import { Stats } from '../../components/Stats/Stats'
import { Features } from '../../components/Features/Features'

const eventCount = 3
const isActive = true

function Home() {
  return (
    <section 
      className={isActive ? 'section active' : 'section'}
      style={{ padding: '20px' }}
      data-page="home">
      <h2>Главная страница</h2>

      {/* Встраивание JS-выражений */}
      <p>Количество предстоящих событий: {eventCount}</p>

      {/* Условный рендеринг */}
      {eventCount > 0 ? (
        <p>Регистрация открыта</p>
      ) : (
        <p>Событий пока нет</p>
      )}

      {/* Собранные компоненты страницы */}
      <Hero />
      <Stats />
      <Features />
    </section>
  )
}

export default Home