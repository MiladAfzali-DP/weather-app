import styles from "./WeatherDetails.module.css";

function WeatherDetails({ children }) {
  return <div className={styles.weatherDetails}>{children}</div>;
}

export default WeatherDetails;
