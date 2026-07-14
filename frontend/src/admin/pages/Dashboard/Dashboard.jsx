import { useEffect, useState } from 'react';
import styles from '../../styles/pages/dashboard/dashboard.module.css';
import { getDashboardData } from '../../services/adminDashboardService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchDashboardData() {
        setLoading(true);

        try {
            const response = await getDashboardData();
            setDashboardData(response);
        } catch (error) {
            toast.error('Failed to fetch dashboard data.');
            console.error('Error fetching dashboard data:', error);
            setError('Failed to fetch dashboard data');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.header}>
                <h1 className={styles.dashboardTitle}>Dashboard</h1>
                <p className={styles.subtitle}>
                    Overview of your platform activity
                </p>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className={styles.error}>{error}</p>}

            {dashboardData && (
                <>
                    <section className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statLabel}>Total Users</div>
                            
                            <div className={styles.statNumber}>
                                {dashboardData.stats.total_users}
                            </div>
                            
                            <div className={styles.statHint}>Registered accounts</div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statLabel}>
                                Total Products
                            </div>

                            <div className={styles.statNumber}>
                                {dashboardData.stats.total_products}
                            </div>

                            <div className={styles.statHint}>
                                Products listed on the platform
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statLabel}>
                                Total Categories
                            </div>

                            <div className={styles.statNumber}>
                                {dashboardData.stats.total_categories}
                            </div>

                            <div className={styles.statHint}>
                                Categories available for products
                            </div>
                        </div>
                    </section>

                    <section className={styles.activitySection}>
                        <div className={styles.sectionHeader}>
                            <h2>Recent Activity</h2>

                            <Link to="/admin/activities" className={styles.viewAllLink}>
                                View All
                            </Link>
                        </div>

                        {dashboardData.recent_activity.length > 0 ? (
                            <div className={styles.activityList}>
                                {dashboardData.recent_activity.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className={styles.activityItem}
                                    >
                                        <div 
                                            className={styles.activityDot} 
                                            style={{ backgroundColor: activity.color }}
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
                                                        {activity.performed_by.email}
                                                    </span>
                                                )}

                                                <span className={styles.time}>
                                                    {activity.human_date}
                                                </span>
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
                            <p className={styles.noRecentActivity}>
                                No recent activity.
                            </p>
                        )}
                    </section>
                </>
            )}
        </div>
    );
}