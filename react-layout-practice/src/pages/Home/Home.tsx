import { Hero } from '../../components/Hero/Hero'
import { Stats } from '../../components/Stats/Stats'
import { Features } from '../../components/Features/Features'
import styles from './Home.module.css'

const isActive = true

function Home() {
  return (
    <section
      className={`${styles.section} ${isActive ? styles.active : ''}`}
      data-page="home"
    >

      {/* Собранные компоненты страницы */}
      <Hero />
      <Stats />
      <Features />
    </section>
  )
}

export default Home