import styles from "./Error.module.css";
import Button from "../Button/Button";
function Error({ errMessage, dispatch }) {
  return (
    <div className={styles.error}>
      <div className={styles.errorWraper}>
        <img src="./icon-error.svg" />
        <h2>Something went wrong</h2>
        <p>{errMessage}</p>
        <Button onClick={() => dispatch({ type: "retry" })}>
          <img src="./icon-retry.svg" alt="" />
          <span>Retry</span>
        </Button>
      </div>
    </div>
  );
}

export default Error;
