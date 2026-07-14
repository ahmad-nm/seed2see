import { useState, useMemo, useEffect } from "react";
import CategoryCard from "../../components/products/CategoryCard";
import ProductCard from "../../components/products/ProductCard";
import SearchBar from "../../components/SearchBar";
import styles from "../../styles/pages/products.module.css";
import ProductsGrid from "../../components/products/ProductsGrid";
import Hero from "../../components/common/hero";
import heroProdImg from "../../assets/images/bg10.jpg";
import { fetchCategories } from "../../services/categoryService";
import { fetchProducts } from "../../services/productService";
import Pagination from "../../components/common/Pagination";
import CategoryFilter from "../../components/CategoryFilterBar";
import SortFilter from "../../components/SortFilterBar";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("");
    const [loading, setLoading] = useState(true);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        total: 0,
    });

    async function getProducts(page = 1) {
        try {
            setLoading(true);
            const response = await fetchProducts({
                page,
                search: searchTerm,
                category_id: category === "all" ? null : category,
                sort: sort || null,
            });

            setProducts(response.data.data);

            setPagination({
                currentPage: response.data.current_page,
                lastPage: response.data.last_page,
                total: response.data.total,
            });

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts(1);
    }, [searchTerm, category, sort]);

    useEffect(() => {
        async function getCategories() {
            try {
                const response = await fetchCategories();
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }

        getCategories();
    }, []);

    return (
        <div className={styles.productsContainer}>
            <Hero
                title="Our Products"
                subtitle="Discover our range of sustainable and eco-friendly products"
                backgroundImage={heroProdImg}
            />

            <div className={styles.productsCategoriesSection}>
                <h2 className={styles.productsCategoriesTitle}>Product Categories</h2>

                <div className={styles.productsCategoriesGrid}>
                    {categories.map((category, index) => (
                        <CategoryCard key={index} category={category} />
                    ))}
                </div>
            </div>

            <div className={styles.productsListSection}>
                <h2 className={styles.productsListTitle}>All Products</h2>

                <div className={styles.searchFilterBar}>
                    <CategoryFilter
                        value={category}
                        setValue={setCategory}
                        options={categories.map(c => ({
                            value: c.id,
                            label: c.name
                        }))}
                    />

                    <SortFilter
                        value={sort}
                        setValue={setSort}
                    />

                    <SearchBar onChange={setSearchTerm} />
                </div>

                {loading ? (
                    <div className={styles.loader}>Loading products...</div>
                ) : (
                    <ProductsGrid products={products} />
                )}

                {pagination.lastPage > 1 && (
                    <Pagination
                        currentPage={pagination.currentPage}
                        lastPage={pagination.lastPage}
                        onPageChange={getProducts}
                    />
                )}
            </div>
        </div>
    );
}
