import { useEffect, useState } from 'react';
import { deleteActivity, getActivityLogs } from '../../services/adminDashboardService';
import styles from '../../styles/pages/dashboard/activities.module.css';
import Pagination from '../../../components/common/Pagination';
import { toast } from 'react-toastify';
import DeleteModal from '../../components/DeleteModal';
import { Link } from 'react-router-dom';

export default function ActivitiesPage() {
    const [activities, setActivities] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0
    });

    const [activityToDelete, setActivityToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    async function fetchActivities(page = 1) {
        try {
            const data = await getActivityLogs(page);

            setActivities(data.data);

            setPagination({
                current_page: data.current_page,
                last_page: data.last_page,
                total: data.total
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchActivities();
    }, []);

    const handleDeleteActivity = async (activityId) => {
        try {
            await deleteActivity(activityId);
            fetchActivities();
            toast.success('Activity deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete activity');
        }
    };

    return (
        <div className={styles.activitiesPage}>
            <div className={styles.header}>
                <h1 className={styles.title}>Activity Logs</h1>

                <p className={styles.subtitle}>
                    Complete history of platform activity
                </p>
            </div>

            <Link to="/admin/dashboard" className={styles.backLink}>
                &larr; Back to Dashboard
            </Link>

            <div className={styles.activitySection}>
                {activities.length > 0 ? (
                    <div className={styles.activityList}>
                        {activities.map((activity) => (
                            <div
                                key={activity.id}
                                className={styles.activityItem}
                            >
                                <div
                                    className={styles.activityDot}
                                    style={{
                                        backgroundColor: activity.color
                                    }}
                                />

                                <div className={styles.activityContent}>
                                    <p className={styles.activityText}>
                                        {activity.message}
                                    </p>

                                    <div className={styles.activityMeta}>
                                        <span className={styles.subjectType}>
                                            {activity.subject.type}
                                            {" "}
                                            #{activity.subject.id}
                                        </span>

                                        {activity.performed_by.email && (
                                            <span className={styles.email}>
                                                {
                                                    activity.performed_by
                                                        .email
                                                }
                                            </span>
                                        )}

                                        <span className={styles.time}>
                                            {activity.human_date}
                                        </span>

                                        <button
                                            className={styles.deleteButton}
                                            onClick={() => {
                                                setActivityToDelete(activity);
                                                setShowDeleteModal(true);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>

                                    {activity.properties &&
                                        Object.keys(activity.properties)
                                            .length > 0 && (
                                            <details
                                                className={
                                                    styles.activityDetails
                                                }
                                            >
                                                <summary>
                                                    Details
                                                </summary>

                                                <pre>
                                                    {JSON.stringify(
                                                        activity.properties,
                                                        null,
                                                        2
                                                    )}
                                                </pre>
                                            </details>
                                        )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className={styles.noActivities}>
                        No activities found.
                    </p>
                )}
            </div>

            {pagination.last_page > 1 && (
                <Pagination
                    currentPage={pagination.current_page}
                    lastPage={pagination.last_page}
                    onPageChange={fetchActivities}
                />
            )}

            {showDeleteModal && (
                <DeleteModal
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={() => {
                        handleDeleteActivity(activityToDelete.id);
                        setShowDeleteModal(false);
                    }}
                />
            )}
        </div>
    );
}