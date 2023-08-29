import styles from './MemorizerLogoWithSubtitle.module.css'

function MemorizerLogoWithSubtitle() {
    return (
        <div className={styles['container']} >
            <div className={styles['title']}>Memorizer</div>
            <div className={styles['subtitle']}>A helper for your brain</div>
        </div>
    )
}

export default MemorizerLogoWithSubtitle;