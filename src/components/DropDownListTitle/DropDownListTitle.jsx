import styles from "./DropDownListTitle.module.css";
export default function DropDownListTitle({ children }) {
  return <h4 className={styles.title}>{children}</h4>;
}
