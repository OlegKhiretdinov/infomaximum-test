import { connect } from "react-redux";
import { BrowserRouter, Redirect } from "react-router-dom";
import Content from "./components/Contnent/Content";
import LoginPage from "./components/LoginPage/LoginPage";


function App(props) {
  return (
    <BrowserRouter>
    {props.token === null && <Redirect to='/' />}
    {props.token === null 
      ? <LoginPage />
      : <Content />
    }
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => ({
  token: state.login.token,
})

export default connect(mapStateToProps)(App);
