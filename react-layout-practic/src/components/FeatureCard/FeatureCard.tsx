type Props = {
  icon: string
  title: string
  text: string
}

export function FeatureCard({ icon, title, text }: Props) {
  const iconSm = icon.replace('.svg', '-sm.svg')

  return (
    <div>
      <picture>
        <source media="(max-width: 768px)" srcSet={`${iconSm} 1x`} />
        <img src={icon} srcSet={`${icon} 1x, ${icon.replace('.svg', '@2x.svg')} 2x`} alt={title} />
      </picture>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  )
}