import styles from "../../styles/components/home/whoWeAre.module.css";
import whoWeAreImg from "../../assets/images/bg9.jpg";

export default function WhoWeAre() {
    return (
        <div className={styles.WhoWeAre}>
            <div className={styles.imageSection}>
                <img src={whoWeAreImg} alt="Who We Are" className={styles.whoWeAreImg} />
            </div>

            <div className={styles.textSection}>
                <span className={styles.tag}>Women lead initiative</span>
                <h2>Authentic Seeds – Modern Roots</h2>
                <p>
                    A women lead initiative, passionate to deliver results across communities to see the change, through seed saving and sharing agricultural and environmental knowledge to empower farmers with resilient high quality locally sourced low-cost seeds for a better sustainable agriculture and a community with youth education through traditional practices.
                </p>
            </div>
        </div>
    )
}