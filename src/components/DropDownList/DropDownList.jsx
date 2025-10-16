import styles from "./DropDownList.module.css";
export default function DropDownList({
  children,
  status = "finish",
  errMessage,
  data = true,
  customStyle = {},
}) {
  if (!data) return;
  const dropDownListStyle = {
    position: "absolute",
    top: "3.2rem",
    left: 0,
    right: 0,
    backgroundColor: "var(--neutral-800)",
    borderRadius: "0.5rem",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    padding: "0.5rem",
  };
  return (
    <div
      className={styles.dropDownList}
      style={{ ...dropDownListStyle, ...customStyle }}
    >
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
