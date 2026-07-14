import { useEffect, useState } from 'react';
import styles from '../../styles/pages/contactMessages/contactMessages.module.css';
import { deleteMessage, fetchContactMessages, showContactMessage, toggleMarkAsRead } from '../../services/adminContactService';
import Pagination from '../../../components/common/Pagination';
import MessageModal from './MessageModal';
import { toast } from 'react-toastify';
import DeleteModal from '../../components/DeleteModal';

export default function ContactMessages() {
    const [messages, setMessages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        total: 0,
    });

    async function loadMessages(page = 1) {
        try {
            const response = await fetchContactMessages(page);
            console.log('Fetched messages:', response);
            setMessages(response.data);
            setPagination({
                currentPage: page,
                lastPage: response.last_page,
                total: response.total,
            });
        } catch (error) {
            toast.error('Failed to load contact messages.');
        }
    }

    useEffect(() => {
        loadMessages();
    }, []);

    async function showContactMessageModal(message) {
        setSelectedMessage(message);
        setShowModal(true);

        try {
            await showContactMessage(message.id);

            loadMessages(pagination.currentPage);
        } catch (error) {
            toast.error('Failed to mark message as read.');
        }
    }

    async function handleToggleMarkAsRead(messageId) {
        try {
            await toggleMarkAsRead(messageId);
            
            loadMessages(pagination.currentPage);

            toast.success('Read status toggled successfully!');
        } catch (error) {
            toast.error('Failed to toggle read status.');
        }
    }

    async function handleDeleteMessage(messageId) {
        try {
            await deleteMessage(messageId);

            loadMessages(pagination.currentPage);

            toast.success('Message deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete message.');
        }
    }

    return (
        <div className={styles.contactMessagesContainer}>
            <h1 className={styles.contactMessagesTitle}>Contact Messages</h1>

            <table className={styles.contactMessagesTable}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map((message) => (
                        <tr 
                            key={message.id} 
                            className={message.is_read ? styles.read : styles.unread} 
                        >
                            <td onClick={() => showContactMessageModal(message)}>{message.name}</td>
                            
                            <td onClick={() => showContactMessageModal(message)}>{message.email}</td>
                            
                            <td onClick={() => showContactMessageModal(message)}>
                                <div className={styles.subject}>
                                    {message.subject}
                                </div>
                            </td>

                            <td onClick={() => showContactMessageModal(message)}>
                                <div className={styles.messagePreview}>
                                    {message.message}
                                </div>
                            </td>

                            <td>
                                <div className={styles.actions}>
                                    <button
                                        className={`${styles.readButton} ${styles.actionButton}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleToggleMarkAsRead(message.id);
                                        }}
                                    >
                                        {message.is_read ? 'Mark Unread' : 'Mark Read'}
                                    </button>

                                    <button
                                        className={`${styles.deleteButton} ${styles.actionButton}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedMessage(message);
                                            setShowDeleteConfirmation(true);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {pagination.lastPage > 1 && (
                <Pagination
                    currentPage={pagination.currentPage}
                    lastPage={pagination.lastPage}
                    onPageChange={loadMessages}
                />
            )}

            {showModal && selectedMessage && (
                <MessageModal
                    subject={selectedMessage.subject}
                    message={selectedMessage.message}
                    name={selectedMessage.name}
                    onClose={() => setShowModal(false)}
                />
            )}

            {showDeleteConfirmation && (
                <DeleteModal
                    onClose={() => setShowDeleteConfirmation(false)}
                    onDelete={() => {
                        handleDeleteMessage(selectedMessage.id);
                        setShowDeleteConfirmation(false);
                    }}
                />
            )}
        </div>
    );
}