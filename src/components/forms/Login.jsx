import { Field, Form } from "react-final-form";
import { connect } from "react-redux";
import { useState } from "react";

import cls from './forms.module.scss';
import { login } from "../../redux/login-reducer"
import { validEmail } from "./formValidation";
import TriggerTogglePassword from "../TriggerTogglePassword/TriggerTogglePassword";

const Login = (props) => {
  
  const [isShowPassword, toggleShowPassword] = useState(false)

  return (
    <Form
      onSubmit={({email, password}) => props.login(email, password)}
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
      render={({ handleSubmit, invalid, modifiedSinceLastSubmit }) => (
        <form onSubmit={handleSubmit} className={cls.login} >

          <Field name="email" >
            {({ input, meta }) => {
              const inputCls = meta.touched && meta.error ? `${cls.input} ${cls.error}` : `${cls.input}`
              return (
                <input
                  {...input}
                  type="email"
                  placeholder="Электронная почта"
                  className={inputCls}
                />
              )
            }}
          </Field>

          <Field name="password" type={isShowPassword ? "text" : "password"}>
            {({ input, meta }) => {
              const inputCls = meta.touched && meta.error ? `${cls.input} ${cls.error}` : `${cls.input}`
              return (
                <div className={`${inputCls} ${cls.passwordWrapper}`}>
                  <input
                    {...input}
                    placeholder="Пароль"
                  />
                  <TriggerTogglePassword toggle={() => toggleShowPassword(!isShowPassword)} show={isShowPassword} />
                </div>
              )
            }}
          </Field>

          <button type="submit" disabled={invalid || (props.errors.length > 0 && !modifiedSinceLastSubmit)}>Войти в систему</button>
        </form>
      )}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    errors: state.login.errors,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => {
      dispatch(login(email, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)