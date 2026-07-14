import styles from "../../styles/components/home/cta.module.css";

export default function CTA() {
    return (
        <section className={styles.CTA}>
            <div className={styles.ctaOverlay}></div>
            <div className={styles.ctaContent}>
                <h2 className={styles.ctaTitle}>Ready to Grow with Us?</h2>
                <p className={styles.ctaDescription}>
                    Join thousands of farmers transforming their agricultural practices.
                    Start your journey toward sustainable farming and better yields today.
                </p>

                <div className={styles.buttonGroup}>
                    <button className={`${styles.ctaButton} ${styles.primary}`} onClick={() => window.location.href = '/register'}>
                        Get Started
                    </button>
                    <button className={`${styles.ctaButton} ${styles.secondary}`} onClick={() => window.location.href = '/about'}>
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    );
}
