import styles from "./about.module.css";

export const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutInfo}>
        <h2>About us</h2>
        Here you can add some information about us. For example, that we already
        have 20,000 registered users and over 1,000 types of sporting goods and
        accessories. You can also add some additional information.
        <br />
        You can insert any text so the page isn't completely empty, so I decided
        to type some meaningless stuff here.
      </div>
      <div className={`${styles.aboutInfo} ${styles.aboutBottom}`}>
        <div className={styles.aboutBottomBlock}>
          <div className={styles.aboutBottomChapter}>
            This application is written for training purposes only.
            <br />
            The code in this app is far from ideal, but I'm just trying to write
            in React, so please don't judge me too harshly.
          </div>
        </div>
        <div className={styles.aboutBottomBlock}>
          <div
            className={`${styles.aboutBottomChapter} ${styles.questionnaire}`}
          >
            View information about our team and those who help us.
          </div>
          <button type="submit" className={styles.btnClickHere}>
            <a className={styles.aboutLink} href="mailto:trahim1986@gmail.com">
              Would you like to contact us to become our partner? Click here.
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};
