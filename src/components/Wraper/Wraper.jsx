function Wraper({ children, className, ...other }) {
  return (
    <div className={className} {...other}>
      {children}
    </div>
  );
}

export default Wraper;
