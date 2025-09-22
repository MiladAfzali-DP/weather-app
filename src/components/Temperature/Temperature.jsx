import "./Temperature.css";
function Temperature() {
  return (
    <div className="temp">
      <div className="temp__left">
        <h4>Berlin, Germany</h4>
        <p>Tuesday, Aug 5, 2025</p>
      </div>
      <div className="temp__right">
        <h3>20˚</h3>
        <img src="/src/assets/images/icon-sunny.webp" alt="Kir" />
      </div>
    </div>
  );
}

export default Temperature;
