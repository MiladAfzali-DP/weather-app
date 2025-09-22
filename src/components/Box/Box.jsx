function Box({ children, className }) {
  const style = {
    backgroundColor: "var(--neutral-700)",
    borderRadius: "0.5rem",
    width: "100%",
    height: "5.5rem",
    border: "1px solid var(--neutral-600)",
  };
  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
}

export default Box;
