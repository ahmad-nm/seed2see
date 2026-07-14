import searchIcon from "../assets/icons/magnifier.png";
import styles from "../styles/components/searchBar.module.css";

export default function SearchBar({ onChange }) {
    const handleInputChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className={styles.searchBar}>
            <img className={styles.searchIcon} src={searchIcon} alt="Search Icon" />
            <input
                className={styles.searchInput}
                type="text"
                placeholder="Search for products..."
                onChange={handleInputChange}
            />
        </div>
    );
}
