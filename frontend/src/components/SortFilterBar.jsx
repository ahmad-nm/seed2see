import styles from '../styles/components/filterBar.module.css';

export default function SortFilter({ value, setValue }) {
    return (
        <select className={styles.filterSelect} value={value} onChange={(e) => setValue(e.target.value)}>
            <option value="">Default</option>
            <option value="price-high">Price: High → Low</option>
            <option value="price-low">Price: Low → High</option>
            <option value="alphabetical">A → Z</option>
            <option value="reverse-alphabetical">Z → A</option>
        </select>
    );
}