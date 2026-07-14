import styles from "../styles/components/filterBar.module.css";

export default function CategoryFilter({ value, setValue, options }) {
    return (
        <select className={styles.filterSelect} value={value} onChange={(e) => setValue(e.target.value)}>
            <option value="all">All Categories</option>

            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
}