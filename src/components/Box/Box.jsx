function Box({ children, className }) {
  const style = {
    backgroundColor: "var(--neutral-800)",
    borderRadius: "0.5rem",
    border: "1px solid var(--neutral-700)",
  };
  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
}

export default Box;
