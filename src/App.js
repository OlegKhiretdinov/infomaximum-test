import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Content from "./components/Contnent/Content";
import LoginPage from "./components/LoginPage/LoginPage";
import { setToken } from "./redux/login-reducer"
import { getAuthToken } from "./utils/localStorage";


function App(props) {
  const localStorageToken = getAuthToken()
  if (props.token === null && localStorageToken !== null) {
    props.setToken(localStorageToken)
  }

  return (
    <BrowserRouter>
      {props.token === null ? <LoginPage /> : <Content />}
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => ({
  token: state.login.token,
})

export default connect(mapStateToProps, {setToken})(App);
