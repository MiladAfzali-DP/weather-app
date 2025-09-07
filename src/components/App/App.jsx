import "./App.css";
import unitsIcon from "../../assets/images/icon-units.svg";
import Header from "../Header/Header";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import Container from "../Container/Container";
function App() {
  return (
    <div className="app">
      <Container>
        <Header>
          <Logo />
          <Button className="units">
            <img src={unitsIcon} alt="" />
            units
            <i className="bi bi-caret-down-fill"></i>
          </Button>
        </Header>
      </Container>
    </div>
  );
}

export default App;
