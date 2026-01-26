import styles from './Stats.module.css'

const stats = [
  { value: '43+', label: 'Total Devices' },
  { value: '25', label: 'Mobile Devices' },
  { value: '10', label: 'Tablet Devices' },
  { value: '8', label: 'Laptops, Desktops, and Monitors' },
]

export function Stats() {
  return (
    <section className={styles.stats}>
      {stats.map(item => (
        <div key={item.label}>
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </section>
  )
}
