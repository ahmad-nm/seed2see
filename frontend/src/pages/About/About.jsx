import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../../styles/pages/about.module.css";

export default function About() {
    const [email, setEmail] = useState("");
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.scrollTo === "join") {
            const joinSection = document.getElementById("join");

            if (joinSection) {
                joinSection.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        console.log("Email submitted:", email);
        setEmail("");
    };

    const testimonials = [
        "Sustainable Farming Made Easy",
        "Growing Better Futures",
        "Seeds of Change",
        "Farming Smarter, Not Harder",
        "Community Powered Growth",
    ];

    return (
        <div className={styles.container}>
            {/* Enhanced Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}>
                    <div className={styles.heroBlob1}></div>
                    <div className={styles.heroBlob2}></div>
                </div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>About Seed2See</h1>
                    <p className={styles.heroSubtitle}>
                        Empowering farmers and communities to grow sustainable, profitable
                        futures
                    </p>
                    <div className={styles.heroStats}>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>10K+</span>
                            <span className={styles.statLabel}>Farmers</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>50+</span>
                            <span className={styles.statLabel}>Crop Types</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>95%</span>
                            <span className={styles.statLabel}>Satisfaction</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who We Are + Mission */}
            <section className={styles.whoWeAreSection}>
                <div className={styles.whoWeAreContent}>
                    <div className={styles.whoWeAreText}>
                        <h2>Who We Are</h2>
                        <p>
                            Seed2See is a mission-driven platform dedicated to transforming
                            agriculture through sustainable practices and community
                            empowerment. Founded by farmers, for farmers, we understand the
                            challenges of modern agriculture and the potential of sustainable
                            solutions.
                        </p>
                        <h3>Our Mission</h3>
                        <p>
                            To empower farmers and agricultural communities with tools and
                            knowledge that transform sustainable farming practices into
                            thriving, profitable businesses while protecting our planet for
                            future generations.
                        </p>
                    </div>
                    <div className={styles.whoWeAreImage}>
                        <div className={styles.imagePlaceholder}>🌾</div>
                    </div>
                </div>
            </section>

            {/* Moving Tape Section */}
            <section className={styles.movingTape}>
                <div className={styles.tapeContainer}>
                    <div className={styles.tape}>
                        {[...testimonials, ...testimonials].map((text, index) => (
                            <div key={index} className={styles.tapeBubble}>
                                <span>{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Grow and Create */}
            <section className={styles.whatWeGrow}>
                <h2>What We Grow & Create</h2>
                <div className={styles.growGrid}>
                    <div className={styles.growCard}>
                        <div className={styles.growIcon}>🌱</div>
                        <h4>Heritage Seeds</h4>
                        <p>
                            Premium heirloom and organic seeds selected for quality, flavor,
                            and sustainability.
                        </p>
                    </div>
                    <div className={styles.growCard}>
                        <div className={styles.growIcon}>📚</div>
                        <h4>Knowledge Base</h4>
                        <p>
                            Comprehensive guides on sustainable farming practices and crop
                            management.
                        </p>
                    </div>
                    <div className={styles.growCard}>
                        <div className={styles.growIcon}>👥</div>
                        <h4>Community Network</h4>
                        <p>
                            Connect with thousands of farmers sharing experiences and best
                            practices.
                        </p>
                    </div>
                    <div className={styles.growCard}>
                        <div className={styles.growIcon}>🚀</div>
                        <h4>Innovation Tools</h4>
                        <p>
                            Smart technology solutions to optimize your farming and increase
                            yields.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className={styles.values}>
                <h2>Our Core Values</h2>
                <div className={styles.valuesGrid}>
                    <div className={styles.valueCard}>
                        <h4>🌍 Sustainability</h4>
                        <p>
                            Protecting our planet through eco-conscious farming practices and
                            regenerative solutions.
                        </p>
                    </div>
                    <div className={styles.valueCard}>
                        <h4>💡 Innovation</h4>
                        <p>
                            Leveraging technology and research to solve real challenges in
                            agriculture.
                        </p>
                    </div>
                    <div className={styles.valueCard}>
                        <h4>🤝 Community</h4>
                        <p>
                            Building strong networks that support farmers and agricultural
                            growth globally.
                        </p>
                    </div>
                    <div className={styles.valueCard}>
                        <h4>✨ Transparency</h4>
                        <p>
                            Honest communication and ethical practices in all our operations
                            and partnerships.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Choose Seed2See */}
            <section className={styles.whyChoose}>
                <div className={styles.whyChooseContent}>
                    <h2>Why Choose Seed2See?</h2>
                    <div className={styles.reasonsGrid}>
                        <div className={styles.reasonCard}>
                            <div className={styles.reasonNumber}>01</div>
                            <h4>Expert Curation</h4>
                            <p>
                                Every seed and product is carefully selected for quality and
                                performance.
                            </p>
                        </div>
                        <div className={styles.reasonCard}>
                            <div className={styles.reasonNumber}>02</div>
                            <h4>Community Support</h4>
                            <p>
                                Learn from experienced farmers and share your journey with
                                thousands.
                            </p>
                        </div>
                        <div className={styles.reasonCard}>
                            <div className={styles.reasonNumber}>03</div>
                            <h4>Sustainability Focused</h4>
                            <p>
                                All products and practices align with environmental
                                responsibility.
                            </p>
                        </div>
                        <div className={styles.reasonCard}>
                            <div className={styles.reasonNumber}>04</div>
                            <h4>Proven Results</h4>
                            <p>
                                95% customer satisfaction with measurable improvements in crop
                                yields.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet the Founder */}
            <section className={styles.founder}>
                <div className={styles.founderContent}>
                    <div className={styles.founderImage}>
                        <div className={styles.founderImagePlaceholder}>👨‍🌾</div>
                    </div>
                    <div className={styles.founderText}>
                        <h2>Meet the Founder</h2>
                        <h4 className={styles.founderName}>John Anderson</h4>
                        <p className={styles.founderTitle}>
                            Founder & CEO, Sustainable Agriculture Advocate
                        </p>
                        <p>
                            With over 25 years of farming experience and a passion for
                            sustainable agriculture, John founded Seed2See to bridge the gap
                            between traditional farming wisdom and modern technology. His
                            vision is to empower every farmer with the tools and knowledge
                            they need to thrive while protecting our planet.
                        </p>
                        <p>
                            "We believe that sustainable farming isn't just good for the
                            environment—it's good for your crops, your community, and your
                            bottom line. That's the Seed2See difference."
                        </p>
                    </div>
                </div>
            </section>

            {/* Join Our Community */}
            <section className={styles.joinCommunity} id="join">
                <div className={styles.joinContent}>
                    <h2>Join Our Growing Community</h2>
                    <p>
                        Get exclusive tips, product launches, and farm-to-table stories
                        delivered to your inbox.
                    </p>
                    <form className={styles.emailForm} onSubmit={handleEmailSubmit}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={styles.emailInput}
                        />
                        <button type="submit" className={styles.emailButton}>
                            Join Us
                        </button>
                    </form>
                    <p className={styles.privacyNote}>
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </section>
        </div>
    );
}
