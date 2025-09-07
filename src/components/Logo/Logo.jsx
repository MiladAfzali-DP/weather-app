import "./Logo.css";
import dpLogo from "../../assets/images/dp-logo.png";
export default function Logo() {
  console.log(dpLogo);
  return (
    <div className="logo">
      <img src={dpLogo} alt="" style={{ width: "40px" }} />
    </div>
  );
}
