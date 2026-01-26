import { CSSTransition } from 'react-transition-group'
import styles from './Modal.module.css'

// Добавляем типы для пропсов (фиксит 'any' для open и onClose)
type Props = {
  open: boolean
  onClose: () => void
}

export function Modal({ open, onClose }: Props) {
  return (
    <CSSTransition
      in={open}
      timeout={300}
      // classNames как объект — типизируется автоматически после установки @types
      classNames={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        exit: styles.exit,
        exitActive: styles.exitActive,
      }}
      unmountOnExit
    >
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <h2>Модальное окно</h2>
          <button onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </CSSTransition>
  )
}