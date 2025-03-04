import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
    return (
        <div className={styles.not_found_container}>
            <h1 className={styles.not_found_title}>404</h1>
            <p className={styles.not_found_text}>Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className={styles.not_found_button}>Back to Home</Link>
        </div>
    );
};

export default NotFound;
