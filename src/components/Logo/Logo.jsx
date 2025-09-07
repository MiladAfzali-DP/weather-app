import weatherLogo from "../../assets/images/logo.svg";
export default function Logo() {
  return (
    <div className="logo">
      <img src={weatherLogo} alt="" style={{ width: "8rem" }} />
    </div>
  );
}
