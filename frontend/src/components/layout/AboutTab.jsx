import { Link } from "react-router-dom";
import styles from "../../styles/components/layout/aboutTab.module.css";

export default function AboutTab() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Links Grid */}
                <div className={styles.linksGrid}>
                    {/* Quick Links */}
                    <div className={styles.linkSection}>
                        <h4 className={styles.sectionTitle}>Quick Links</h4>
                        <ul className={styles.linkList}>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About Us</Link>
                            </li>
                            <li>
                                <Link to="/products">Products</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Products */}
                    <div className={styles.linkSection}>
                        <h4 className={styles.sectionTitle}>Products</h4>
                        <ul className={styles.linkList}>
                            <li>
                                <a href="#seeds">Premium Seeds</a>
                            </li>
                            <li>
                                <a href="#fertilizers">Organic Fertilizers</a>
                            </li>
                            <li>
                                <a href="#tools">Farming Tools</a>
                            </li>
                            <li>
                                <a href="#supplies">Supplies</a>
                            </li>
                        </ul>
                    </div>

                    {/* Help & Support */}
                    <div className={styles.linkSection}>
                        <h4 className={styles.sectionTitle}>Help & Support</h4>
                        <ul className={styles.linkList}>
                            <li>
                                <a href="#faq">FAQ</a>
                            </li>
                            <li>
                                <a href="#guides">Growing Guides</a>
                            </li>
                            <li>
                                <a href="#support">Customer Support</a>
                            </li>
                            <li>
                                <a href="#community">Community Forum</a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className={styles.linkSection}>
                        <h4 className={styles.sectionTitle}>Legal</h4>
                        <ul className={styles.linkList}>
                            <li>
                                <a href="#privacy">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#terms">Terms of Service</a>
                            </li>
                            <li>
                                <a href="#cookies">Cookie Policy</a>
                            </li>
                            <li>
                                <a href="#disclaimer">Disclaimer</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className={styles.copyright}>
                    <p>
                        &copy; {new Date().getFullYear()} Seed2See. All rights reserved.
                    </p>
                    <p className={styles.tagline}>
                        Growing sustainable connections from seed to harvest.
                    </p>
                </div>
            </div>
        </footer>
    );
}
