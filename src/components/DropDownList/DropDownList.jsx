import styles from "./DropDownList.module.css";
export default function DropDownList({ children, status, errMessage, data }) {
  if (!data) return;
  return (
    <div className={styles.dropDownList}>
      {/* Handle Error */}
      {status === "error" && (
        <p className={styles.loadingError}>
          <img src="/src/assets/images/icon-error.svg" alt="" />
          <span>{errMessage}</span>
        </p>
      )}

      {/* Handle Loading */}
      {status === "loading" && (
        <p className={styles.loadingError}>
          <img src="/src/assets/images/icon-loading.svg" alt="" />
          <span>Search in progress...</span>
        </p>
      )}
      {status === "finish" && children}
    </div>
  );
}
