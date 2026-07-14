import styles from '../../styles/pages/contactMessages/messageModal.module.css';

export default function MessageModal({ subject, message, name, onClose }) {
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>

                <div className={styles.header}>
                    <h2 className={styles.title}>Message from {name}</h2>
                    <p className={styles.subject}>Subject: {subject}</p>
                </div>

                <div className={styles.body}>
                    <p className={styles.message}>{message}</p>
                </div>
            </div>
        </div>
    );
}