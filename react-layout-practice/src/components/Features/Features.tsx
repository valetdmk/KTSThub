import { FeatureCard } from '../FeatureCard/FeatureCard'
import styles from './Features.module.css'

import library from '../../assets/Library.svg'
import access from '../../assets/Access.svg'
import vectors from '../../assets/Vectors.svg'
import components from '../../assets/Components.svg'
import smart from '../../assets/Image.svg'
import exportIcon from '../../assets/Export.svg'

const features = [
  {
    icon: library,
    title: 'Growing Library',
    text: 'Access over 40 mobile devices, tablets, laptops, and desktops.',
  },
  {
    icon: access,
    title: 'Lifetime Access',
    text: 'Enjoy lifetime access to new devices.',
  },
  {
    icon: vectors,
    title: 'Fully Editable Vectors',
    text: 'Scalable and fully editable vectors.',
  },
  {
    icon: components,
    title: 'Components & Variants',
    text: 'Maintain consistency using Figma components.',
  },
  {
    icon: smart,
    title: 'Smart Image Fills',
    text: 'Automatically adjust images.',
  },
  {
    icon: exportIcon,
    title: 'Easy Exports',
    text: 'Export assets quickly and efficiently.',
  },
]

export function Features() {
  return (
    <section className={styles.features}>
      {features.map(feature => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </section>
  )
}
