import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';

import Login from '../forms/Login';
import SignUp from '../forms/SignUp';
import ErrorsMessage from '../ErrorsMessage/ErrorsMessage';

import cls from './LoginPage.module.scss';
import logo from '../../assets/logo.png';
import { signUpError } from '../../redux/signUp-reducer';
import { loginError } from '../../redux/login-reducer';


const LoginPage = (props) => {
  return (
    <div className={cls.main}>
      <div className={cls.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={cls.inner}>
        <Switch>

          <Route path='/signup' render={() => (
            <>
              <div className={cls.form}>
                <SignUp />
              Уже зарегистрированны?
              <NavLink to="/" className={cls.link} onClick={() => props.loginError([])}> Вход</NavLink>
              </div>
              {props.signUpErrors.length > 0 && <ErrorsMessage errors={props.signUpErrors} />}
            </>
          )} />

          <Route path='/' render={() => (
            <>
              <div className={cls.form}>
                <Login />
                <NavLink to="/signup" className={cls.link} onClick={() => props.signUpError([])}>Зарегистрироваться</NavLink>
              </div>
              {props.loginErrors.length > 0 && <ErrorsMessage errors={props.loginErrors} />}
            </>
          )} />

        </Switch>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  loginErrors: state.login.errors,
  signUpErrors: state.signUp.errors,
})

const mapDispatchToProps = (dispatch) => {
  return {
    signUpError: (errors) => {
      dispatch(signUpError(errors))
    },
    loginError: (errors) => {
      dispatch(loginError(errors))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
