import { useNavigate } from "react-router-dom";
import styles from "../../styles/components/products/categoryCard.module.css";

export default function CategoryCard({ category }) {
    const navigate = useNavigate();

    const handleCategoryClick = () => {
        if (category.slug) {
            navigate(`/products/category/${category.slug}`);
        }
    }

    return (
        <div className={styles.categoryCard} onClick={handleCategoryClick}>
            <img src={category.image_url} alt={category.name} className={styles.categoryImage} />
            <h2 className={styles.categoryTitle}>{category.name}</h2>
            {/* <p className={styles.categoryDescription}>{category.description}</p> */}
        </div>
    );
}