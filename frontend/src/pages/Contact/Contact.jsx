import { useState } from "react";
import Input from '../../components/common/Input';
import TextArea from '../../components/common/TextArea';
import styles from "../../styles/pages/contact.module.css";
import { createContactMessage } from "../../services/contactService";

export default function Contact() {
    const [email, setEmail] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    
    const handleEmailSubmit = (e) => {
        e.preventDefault();
        console.log("Email submitted:", email);
        setEmail("");
    };

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        
        try {
            const response = await createContactMessage(formData);

            setSuccessMessage("Your message has been sent successfully!");

            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            });

            setErrors({});

            setInterval(() => {
                setSuccessMessage("");
            }, 5000);
        } catch (error) {
            setErrors(error.response?.data?.errors || { message: "An error occurred while submitting the message." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.contactContainer}>
            <div className={styles.contactHeroSection}>
                <div className={styles.contactHeroOverlay}></div>
                <h1 className={styles.contactHeroTitle}>Contact Us</h1>
            </div>

            <div className={styles.contactContent}>
                <div className={styles.contactInfo}>
                    <div className={styles.contactInfoHeader}>
                        <p className={styles.contactInfoSubtitle}>Keep Close</p>
                        <h2 className={styles.contactInfoTitle}>Get In Touch</h2>
                    </div>
                    
                    <p className={styles.contactInfoText}> 
                        We love to hear from you! We'd love for you to join us in our journey. 
                        You have the power to make a difference.
                        Please contact us if you have questions, comments or suggestions,
                    </p>

                    <div className={styles.contactDetailsGrid}>
                        <div className={styles.contactDetail}>
                            <h3 className={styles.contactDetailTitle}>Email</h3>
                            <p className={styles.contactDetailText}>info@company.com</p>
                        </div>

                        <div className={styles.contactDetail}>
                            <h3 className={styles.contactDetailTitle}>Phone</h3>
                            <p className={styles.contactDetailText}>+1 (123) 456-7890</p>
                        </div>

                        <div className={styles.contactDetail}>
                            <h3 className={styles.contactDetailTitle}>Address</h3>
                            <p className={styles.contactDetailText}>123 Main St, Anytown, USA</p>
                        </div>

                        <div className={styles.contactDetail}>
                            <h3 className={styles.contactDetailTitle}>Social Media</h3>
                            <p className={styles.contactDetailText}>@seed2see</p>
                        </div>
                    </div>

                    <hr className={styles.contactDivider} />

                    <div className={styles.followUsSection}>
                        <h3 className={styles.followUsTitle}>Follow Us</h3>
                        <div className={styles.socialMediaLinks}>
                            <a href="https://www.instagram.com/seed2see?stkn=eWplajM0eG92YjZk" className={styles.socialMediaLink}>Instagram</a>
                        </div>
                    </div>
                </div>

                <div className={styles.verticalDivider}></div>

                <div className={styles.contactForm}>
                    <h2 className={styles.contactFormTitle}>Your Details</h2>
                    <p className={styles.contactFormSubtitle}>Let us know how to get back to you!</p>

                    <form className={styles.contactFormElement} onSubmit={handleSubmit}>
                        <div className={styles.contactFormRow}>
                            <div className={styles.contactFormGroup}>
                                <label htmlFor="name" className={styles.contactFormLabel}>Name *</label>
                                <Input 
                                    type="text" 
                                    id="name" 
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required 
                                />

                                {errors.name && 
                                    <span className={styles.contactFormError}>
                                        {errors.name}
                                    </span>
                                }
                            </div>
                        
                            <div className={styles.contactFormGroup}>
                                <label htmlFor="email" className={styles.contactFormLabel}>Email *</label>
                                <Input 
                                    type="email" 
                                    id="email" 
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required 
                                />

                                {errors.email && (
                                    <span className={styles.contactFormError}>
                                        {errors.email}
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        <div className={styles.contactFormRow}>
                            <div className={styles.contactFormGroup}>
                                <label htmlFor="phone" className={styles.contactFormLabel}>Phone *</label>
                                <Input 
                                    type="text" 
                                    id="phone" 
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required 
                                />

                                {errors.phone && 
                                    <span className={styles.contactFormError}>
                                        {errors.phone}
                                    </span>
                                }
                            </div>
                        
                            <div className={styles.contactFormGroup}>
                                <label htmlFor="age" className={styles.contactFormLabel}>Age *</label>
                                <Input 
                                    type="age" 
                                    id="age" 
                                    placeholder="Age"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                    required 
                                />

                                {errors.age && (
                                    <span className={styles.contactFormError}>
                                        {errors.age}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className={styles.contactFormGroup}>
                            <label htmlFor="scopeofinterest" className={styles.contactFormLabel}>Scope of Interest *</label>
                            <Input 
                                type="text" 
                                id="scopeofinterest" 
                                placeholder="Scope of Interest"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                required 
                            />

                            {errors.scopeofinterest && (
                                <span className={styles.contactFormError}>
                                    {errors.scopeofinterest}
                                </span>
                            )}
                        </div>

                        <div className={styles.contactFormGroup}>
                            <label htmlFor="message" className={styles.contactFormLabel}>Message *</label>
                            <TextArea 
                                id="message" 
                                placeholder="Message" 
                                className={styles.contactFormTextarea} 
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required 
                            />

                            {errors.message && (
                                <span className={styles.contactFormError}>
                                    {errors.message}
                                </span>
                            )}
                        </div>

                        {successMessage && (
                            <p className={styles.contactFormSuccess}>
                                {successMessage}
                            </p>
                        )}

                        <button type="submit" className={styles.contactFormButton} disabled={loading}>
                            {loading ? "Sending..." : "Contact Us"}
                        </button>
                    </form>
                </div>
            </div>

            <div className={styles.contactJoinUsSection}>
                <div className={styles.joinUsContent}>
                    <h2>Support Us</h2>
                    <p>
                        {"Make a Difference — Join us in creating a positive impact. Volunteer With Us Become a Partne Join Us a Farmer Other Ways to Support Us."}
                    </p>
                    
                    <form className={styles.joinEmailForm} onSubmit={handleEmailSubmit}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={styles.joinEmailInput}
                        />
                        <button type="submit" className={styles.joinEmailButton}>
                            Join Us
                        </button>
                    </form>
                    
                    <p className={styles.privacyNote}>
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </div>
    );
}