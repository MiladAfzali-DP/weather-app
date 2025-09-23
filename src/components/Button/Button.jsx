export default function Button({ className, onClick, children, ...other }) {
  return (
    <button className={className} onClick={onClick} {...other}>
      {children}
    </button>
  );
}
