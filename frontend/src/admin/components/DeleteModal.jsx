import styles from '../styles/components/deleteModal.module.css';
import warningIcon from '../../assets/icons/warning.png';

export default function DeleteModal({ onClose, onDelete }) {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.deleteModalContent}>
                <img src={warningIcon} alt="Warning Icon" className={styles.warningIcon} />
                <h2 className={styles.deleteModalTitle}>Confirm Deletion</h2>
                <p className={styles.deleteModalDescription}>Are you sure you want to delete this item?</p>
                <div className={styles.deleteModalButtons}>
                    <button onClick={onDelete} className={styles.deleteButton}>Delete</button>
                    <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>
    );
}