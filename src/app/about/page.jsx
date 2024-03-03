import Image from "next/image";
import styles from "./about.module.css";

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About agency</h2>
        <h1 className={styles.title}>
          We create digital idea that are bigger, bolder, braver and better
        </h1>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque
          corrupti facilis, optio ad magni error veniam dolorum sapiente odio
          explicabo.
        </p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h2>10 K+</h2>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h2>10 K+</h2>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h2>10 K+</h2>
            <p>Year of experience</p>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/about.png" alt="About image" fill className={styles.img} />
      </div>
    </div>
  );
};

export default AboutPage;
