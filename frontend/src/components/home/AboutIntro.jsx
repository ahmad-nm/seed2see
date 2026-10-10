import introImg from '../../assets/images/bg6.jpeg';
import styles from '../../styles/components/home/aboutIntro.module.css';

export default function AboutIntro() {
    return (
        <div className={styles.AboutIntro}>
            <div className={styles.introText}>
                <h2>Seeds are the basics of life sustainability </h2>
                <p>
                    Global economic instability has many challenges concerning biodiversity loss and agricultural heritage. Locally seeds or heirloom are precious to our culture and history and has a unique story so could be grown freely and true from year to year.
                </p>
            </div>

            <div className={styles.introImageContainer}>
                <img className={styles.introImg} src={introImg} alt="About Us" />
            </div>
        </div>
    )
}