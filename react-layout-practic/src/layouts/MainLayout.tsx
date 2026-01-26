import styles from './MainLayout.module.css'

type Props = {
    children: React.ReactNode
}

function MainLayout({ children }: Props) {
    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <h1>Hacaton Platform</h1>
            </header>

            <main className={styles.main}>
                {children}
            </main>

            <footer className={styles.footer}>
                <p>© 2026 Hackathon Platform</p>
            </footer>
        </div>
    )
}

export default MainLayout