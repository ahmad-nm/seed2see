import styles from "../../styles/components/home/whoWeAre.module.css";
import whoWeAreImg from "../../assets/images/bg9.jpg";

export default function WhoWeAre() {
    return (
        <div className={styles.WhoWeAre}>
            <div className={styles.imageSection}>
                <img src={whoWeAreImg} alt="Who We Are" className={styles.whoWeAreImg} />
            </div>

            <div className={styles.textSection}>
                <h2>Who We Are</h2>
                <p>
                    We are a team of passionate individuals dedicated to promoting sustainable agriculture and empowering farmers with the tools and knowledge they need to succeed. Our mission is to create a platform that connects farmers with the resources they need to grow healthy crops, improve their yields, and contribute to a more sustainable future. We believe in the power of technology to transform agriculture and are committed to providing innovative solutions that make a positive impact on the farming community and the environment.
                </p>
            </div>
        </div>
    )
}