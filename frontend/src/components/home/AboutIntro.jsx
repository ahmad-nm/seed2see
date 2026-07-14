import introImg from '../../assets/images/bg6.jpeg';
import styles from '../../styles/components/home/aboutIntro.module.css';

export default function AboutIntro() {
    return (
        <div className={styles.AboutIntro}>
            <div className={styles.introText}>
                <h2>About Us</h2>
                <p>
                    We are a team of passionate individuals dedicated to promoting sustainable agriculture and empowering farmers with the tools and knowledge they need to succeed. Our mission is to create a platform that connects farmers with the resources they need to grow healthy crops, improve their yields, and contribute to a more sustainable future. We believe in the power of technology to transform agriculture and are committed to providing innovative solutions that make a positive impact on the farming community and the environment.
                </p>
            </div>

            <div className={styles.introImageContainer}>
                <img className={styles.introImg} src={introImg} alt="About Us" />
            </div>
        </div>
    )
}