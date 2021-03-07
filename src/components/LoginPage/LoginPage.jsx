import Login from '../forms/Login';
import { connect } from 'react-redux';

import cls from './LoginPage.module.scss';
import logo from '../../assets/logo.png';
import warning from '../../assets/warning.png';


const ErrorsMessage = (props) => {
  const messages = props.errors.map((error, index) => (<p key={index}>{error.message}</p>))
  return(
    <div className={cls.errors}>
    <div className={cls.img}>
      <img src={warning} alt="error"/>
    </div>
    <div>
      {messages}
    </div>
    </div>
  )
}

const LoginPage = (props) => {
  return (
    <div className={cls.main}>
      <div className={cls.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={cls.inner}>
        <div className={cls.form}>
          <Login />
          <a href="./signup" className={cls.link}>Зарегистрироваться</a>
        </div>
        {props.errors.length > 0 && <ErrorsMessage errors={props.errors} />}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  errors: state.login.errors,
})

export default connect(mapStateToProps)(LoginPage)
