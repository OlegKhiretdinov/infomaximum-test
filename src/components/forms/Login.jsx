import { Field, Form } from "react-final-form";
import { connect } from "react-redux";

import cls from './forms.module.scss';
import { loginError, setToken, ToggleShowPassword } from "../../redux/login-reducer"
import { sendLoginData } from "../../api/request";
import { validEmail } from "./formValidation";

const Login = (props) =>  {

  const TriggerTogglePassword = () => {
    const triggerClass = props.showPassword ? cls.showPassword : cls.hidePassword
    return <div className={`${cls.trigger} ${triggerClass}`} onClick={props.ToggleShowPassword}></div>
  }

  const onSubmit = async ({email, password}) => {
    const response = await sendLoginData(email, password)
    if(response.errors) {
      props.loginError(response.errors)
    } else {
      props.setToken(response.data.login.token);
      props.loginError([]);
    }
  }

  return (
    <Form
      onSubmit={(props) => onSubmit(props)}
      validate={(values) => {
        const errors = {}
        if (!validEmail(values.email)) {
          errors.email = 'Require';
        }
        if (!values.password) {
          errors.password = 'Require';
        }
        return errors;
      }}
      render={({handleSubmit, invalid, modifiedSinceLastSubmit}) => (
        <form onSubmit={handleSubmit} className={cls.login} >

          <Field name="email" >
            {({ input, meta}) => 
            {
              return(
              <input
                {...input}
                type="email"
                placeholder="Электронная почта"
                className={meta.touched && meta.error ? cls.error : null}
              />
            )}}
          </Field>

          <Field name="password" type={props.showPassword ? "text" : "password"}>
            {({input, meta}) => (
              <div className={cls.passwordWrapper}>
                <TriggerTogglePassword />
                <input
                  {...input}
                  placeholder="Пароль"
                  className={meta.touched && meta.error ? cls.error : null}
                />
              </div>
            )}
          </Field>

          <button type="submit" disabled={invalid || (props.errors.length > 0 && !modifiedSinceLastSubmit)}>Войти в систему</button>
        </form>
      )}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    errors: state.login.errors,
    showPassword: state.login.showPassword,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => {
      dispatch(setToken(token))
    },
    loginError: (errors) => {
      dispatch(loginError(errors))
    },
    ToggleShowPassword: () => {
      dispatch(ToggleShowPassword())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)