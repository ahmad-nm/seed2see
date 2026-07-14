import { useParams } from "react-router-dom";
import Hero from "../../components/common/hero";
import styles from "../../styles/pages/categoryPage.module.css";
import ProductCard from "../../components/products/ProductCard";
import ProductsGrid from "../../components/products/ProductsGrid";
import FilterBar from "../../components/CategoryFilterBar";
import SearchBar from "../../components/SearchBar";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../services/categoryService";
import { fetchProducts } from "../../services/productService";
import Pagination from "../../components/common/Pagination";
import SortFilter from "../../components/SortFilterBar";

export default function CategoryPage() {
    const { categorySlug } = useParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [sort, setSort] = useState("");

    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        total: 0,
    });

    const category = categories.find((cat) => cat.slug === categorySlug);
    const categoryId = category ? category.id : null;

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

    async function getProducts(page = 1) {
        try {
            const response = await fetchProducts({
                page,
                category_id: categoryId,
                search: searchTerm,
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
        }
    }

    useEffect(() => {
        getProducts(1);
    }, [categorySlug, categoryId, searchTerm, filterType]);

    return (
        <div className={styles.categoryProductsContainer}>
            <Hero
                title={category?.name || ""}
                subtitle={`Explore our ${category?.name || ""} collection`}
                backgroundImage={category?.image_url}
            />

            <h2 className={styles.categoryProductsTitle}>
                {categorySlug.slice(0, 1).toUpperCase() +
                    categorySlug.slice(1).replace(/-/g, " ")}{" "}
                Products
            </h2>

            <div className={styles.searchFilterBar}>
                <SortFilter
                    value={sort}
                    setValue={setSort}
                />

                <SearchBar onChange={setSearchTerm} />
            </div>
            
            <ProductsGrid products={products} />

            {pagination.lastPage > 1 && (
                <Pagination
                    currentPage={pagination.currentPage}
                    lastPage={pagination.lastPage}
                    onPageChange={getProducts}
                />
            )}
        </div>
    );
}
