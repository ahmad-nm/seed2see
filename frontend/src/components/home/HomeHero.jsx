import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../../styles/components/home/hero.module.css';

import hero1 from '../../assets/images/hero/bg7.png';
import hero2 from '../../assets/images/hero/bg8.jpg';
import hero3 from '../../assets/images/hero/bg4.jpeg';

export default function HomeHero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const slides = [
        {
            image: hero1,
            title: "Growing a greener future",
            description: "Community-led planting initiative"
        },
        {
            image: hero2,
            title: "Sustainable living",
            description: "Eco-friendly practices for a better tomorrow"
        },
        {
            image: hero3,
            title: "Protecting our planet",
            description: "Conservation efforts for future generations"
        }
    ]


    return (
        <section className={styles.hero} style={{ backgroundImage: `url(${slides[currentSlide].image})` }}>
            <div className={styles.heroOverlay} />

            <div className={styles.heroContent}>
                <h1>{slides[currentSlide].title}</h1>
                <p>{slides[currentSlide].description}</p>

                <button 
                    onClick={() => navigate('/about', { state: { scrollTo: 'join' } })}
                >
                    Join us
                </button>
            </div>

            <div className={styles.dots}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={
                            index === currentSlide
                                ? styles.activeDot
                                : styles.dot
                        }
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </section>
    );
}