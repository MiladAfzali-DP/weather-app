import Button from "../Button/Button";
import "./Error.css";
function Error({ errMessage, dispatch }) {
  return (
    <div className="error">
      <div className="error__wraper">
        <img src="/src/assets/images/icon-error.svg" />
        <h2>Something went wrong</h2>
        <p>{errMessage}</p>
        <Button onClick={() => dispatch({ type: "retry" })}>
          <img src="/src/assets/images/icon-retry.svg" alt="" />
          <span>Retry</span>
        </Button>
      </div>
    </div>
  );
}

export default Error;
