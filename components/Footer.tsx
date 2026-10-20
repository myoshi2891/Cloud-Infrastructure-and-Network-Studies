import { DISCLAIMER } from './disclaimer';
import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.brand}>
                    <p className={styles.name}>Cloud Infrastructure Studies</p>
                    <p className={styles.description}>クラウドとインフラの学習ノート</p>
                </div>
                <section className={styles.disclaimer} aria-labelledby="footer-disclaimer-title">
                    <h2 id="footer-disclaimer-title" className={styles.heading}>免責事項</h2>
                    <p>{DISCLAIMER.purpose}</p>
                    <p>{DISCLAIMER.official}</p>
                </section>
            </div>
        </footer>
    );
}
