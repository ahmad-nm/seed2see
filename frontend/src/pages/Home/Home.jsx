import AboutIntro from "../../components/home/AboutIntro";
import CTA from "../../components/home/CTA";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import HomeHero from "../../components/home/HomeHero";
import StatsBar from "../../components/home/StatsBar";
import WhoWeAre from "../../components/home/WhoWeAre";

import styles from "../../styles/pages/home.module.css";

export default function Home() {
    return (
        <div className={styles.Home}>
            <HomeHero />
            <AboutIntro />
            <StatsBar />
            <WhoWeAre />
            <FeaturedProducts />
            <CTA />
        </div>
    );
}