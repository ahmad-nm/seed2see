import styles from "../../styles/components/common/pagination.module.css";

export default function Pagination({ currentPage, lastPage, onPageChange }) {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= lastPage) {
            onPageChange(page);
        }
    };

    return (
        <div className={styles.pagination}>
            <button
                className={styles.pageButton}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {[...Array(lastPage)].map((_, index) => (
                <button
                    key={index}
                    className={`${styles.pageButton} ${currentPage === index + 1 ? styles.activePage : ""}`}
                    onClick={() => handlePageChange(index + 1)}
                >
                    {index + 1}
                </button>
            ))}

            <button
                className={styles.pageButton}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
            >
                Next
            </button>
        </div>
    );
}