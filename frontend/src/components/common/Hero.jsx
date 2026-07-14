import styles from '../../styles/components/common/hero.module.css';

export default function Hero({ title, subtitle, backgroundImage }) {
    return (
        <div className={styles.heroSectionContainer} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className={styles.heroOverlay}></div>
            <h1 className={styles.heroTitle}>{title}</h1>
            <p className={styles.heroSubtitle}>{subtitle}</p>
        </div>
    )
}