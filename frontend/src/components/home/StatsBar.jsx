import styles from "../../styles/components/home/statsBar.module.css";

export default function StatsBar() {
  const stats = [
    { value: "10K+", label: "Farmers Supported" },
    { value: "500K+", label: "Acres of Land Improved" },
    { value: "95%", label: "Customer Satisfaction" },
    { value: "50+", label: "Crop Types Supported" },
  ];

  return (
    <section className={styles.statsContainer}>
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statItem}>
            <div className={styles.statAccent}></div>
            <h3 className={styles.statValue}>{stat.value}</h3>
            <p className={styles.statLabel}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
