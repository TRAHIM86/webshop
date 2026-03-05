import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.dataFooter}>
          <h5>OUR PARTNERS</h5>
          <a
            className={styles.footerLink}
            href="https://en.wikipedia.org/wiki/adidas"
            target="_blank"
            rel="noopener noreferrer"
          >
            Adidas
          </a>
          <a
            className={styles.footerLink}
            href="https://en.wikipedia.org/wiki/Nike,_Inc."
            target="_blank"
            rel="noopener noreferrer"
          >
            Nike
          </a>
          <a
            className={styles.footerLink}
            href="https://en.wikipedia.org/wiki/Puma_(brand)"
            target="_blank"
            rel="noopener noreferrer"
          >
            Puma
          </a>
        </div>
        <div className={styles.dataFooter}>
          <h5>CONTACTS</h5>
          <a className={styles.footerLink} href="tel:+375295997478">
            +375 (29) 599-74-78
          </a>
          <a className={styles.footerLink} href="mailto:trahim1986@gmail.com">
            Write to us
          </a>
          <a
            className={styles.footerLink}
            href="https://www.google.ru/maps/place/%D0%9D%D0%BE%D0%B2%D0%BE%D0%BF%D0%BE%D0%BB%D0%BE%D1%86%D0%BA,+%D0%92%D0%B8%D1%82%D0%B5%D0%B1%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C/@55.5211395,28.4872168,41407m/data=!3m1!1e3!4m6!3m5!1s0x46c4855711e214cf:0x73330f4b118c705a!8m2!3d55.5324165!4d28.6591795!16zL20vMDdicWIz?entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D"
          >
            Belarus, New Polotsk
          </a>
        </div>
        <div className={styles.dataFooter}>
          <h5>STAY CONNECTED</h5>
          <div className={styles.networkLinks}>
            <a
              className={styles.footerLink}
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={styles.networkIcon}
                src={`${process.env.PUBLIC_URL}/networks/twitterX.png`}
                alt="twitterX"
              />
            </a>
            <a
              className={styles.footerLink}
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={styles.networkIcon}
                src={`${process.env.PUBLIC_URL}/networks/facebook.png`}
                alt="facebook"
              />
            </a>
            <a
              className={styles.footerLink}
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={styles.networkIcon}
                src={`${process.env.PUBLIC_URL}/networks/instagram.png`}
                alt="instagram"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
