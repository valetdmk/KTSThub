import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={`${styles.hero} fadeUp`}> {/* Применена анимация fadeUp */}
      <h1>Device Mockups</h1>
      <p className={styles.subtitle}>ULTIMATE COLLECTION</p>
    </section>
  )
}