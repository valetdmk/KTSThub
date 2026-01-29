import styles from './FeatureCard.module.css'

type Props = {
  icon: string
  title: string
  text: string
}

export function FeatureCard({ icon, title, text }: Props) {
  const iconSm  = icon.replace('.svg', '-sm.svg')
  const icon2x  = icon.replace('.svg', '@2x.svg')

return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}> 
        <picture>
          <source media="(max-width: 768px)" srcSet={`${iconSm} 1x`} />
          <img
            src={icon}
            srcSet={`${icon} 1x, ${icon2x} 2x`}
            alt={title || "feature icon"}
            width="64"
            height="64"
            loading="lazy"
          />
        </picture>
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{text}</p>
    </div>
  )
}