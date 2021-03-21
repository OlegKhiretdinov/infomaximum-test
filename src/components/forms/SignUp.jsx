import { Field, Form } from "react-final-form";
import { connect } from "react-redux";
import { useState } from "react";
import TriggerTogglePassword from "../TriggerTogglePassword/TriggerTogglePassword";
import { signUp } from "../../api/request";
import { setToken } from "../../redux/login-reducer";
import { signUpError } from "../../redux/signUp-reducer";
import { validEmail } from "./formValidation";

import cls from './forms.module.scss';

const SignUp = (props) => {

  const [isShowPassword, toggleShowPassword] = useState(false)
  const [isShowConfirm, toggleShowConfirm] = useState(false)

  const onSubmit = async ({firstName, secondName, email, password}) => {
    const response = await signUp(firstName, secondName, email, password)
    if(response.errors) {
      props.signUpError(response.errors)
    } else {
      props.setToken(response.data.signup);
      props.signUpError([]);
    }
  }

  return (
    <Form
      onSubmit={(props) => onSubmit(props)}
      validate={(values) => {
        const errors = {};
        if (!values.firstName) {
          errors.firstName = 'Require';
        }
        if (!values.secondName) {
          errors.secondName = 'Require';
        }
        if (!validEmail(values.email)) {
          errors.email = 'Require';
        }
        if (!values.password) {
          errors.password = 'Require';
        }
        if (values.confirmPassword !== values.password) {
          errors.confirmPassword = 'does not match';
        }
        return errors;
      }}
    >

      {({ handleSubmit, invalid, modifiedSinceLastSubmit}) => (
        <form onSubmit={handleSubmit} className={cls.login}>

          <Field name="firstName" type="text"  >
            {({ input, meta}) => {
              const inputCls = meta.touched && meta.error ? `${cls.input} ${cls.error}` : `${cls.input}`
              return (
              <input {...input} placeholder="Имя" className={inputCls} />
              )}
            }
          </Field>

          <Field name="secondName" type="text" >
            {({ input, meta}) => {
              const inputCls = meta.touched && meta.error ? `${cls.input} ${cls.error}` : `${cls.input}`
              return (
              <input{...input} placeholder="Фамилия" className={inputCls} />
            )}
            }
          </Field>

          <Field name="email" type="email" >
            {({ input, meta}) =>{
              const inputCls = meta.touched && meta.error ? `${cls.input} ${cls.error}` : `${cls.input}`
              return (
              <input {...input} placeholder="Электронная почта" className={inputCls} />
              )}
            }
          </Field>

          <Field name="password" type={isShowPassword ? "text" : "password"} >
            {({ input, meta }) => {
              const inputCls = meta.touched && meta.error ? `${cls.input} ${cls.error}` : `${cls.input}`
              return (
              <div className={`${cls.passwordWrapper} ${inputCls}`}>
                <input {...input} placeholder="Пароль" className={meta.touched && meta.error ? cls.error : null} />
                <TriggerTogglePassword toggle={() => toggleShowPassword(!isShowPassword)} show={isShowPassword} />
              </div>
            )}
            }
          </Field>

          <Field name="confirmPassword" type={isShowConfirm ? "text" : "password"} >
            {({ input, meta }) => {
              const inputCls = meta.touched && meta.error ? `${cls.input} ${cls.error}` : `${cls.input}`
              return (
              <div className={`${cls.passwordWrapper} ${inputCls}`}>
                <input {...input} placeholder="Подтвердите пароль" className={meta.touched && meta.error ? cls.error : null} />
                <TriggerTogglePassword toggle={() => toggleShowConfirm(!isShowConfirm)} show={isShowConfirm} />
              </div>
            )}
            }
          </Field>

          <button type="submit" disabled={invalid || (props.errors.length > 0 && !modifiedSinceLastSubmit)}>Применить и войти</button>
        </form>
      )}
    </Form>
  )
}

const mapStateToProps = (state) => {
  return {
    errors: state.signUp.errors,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => {
      dispatch(setToken(token))
    },
    signUpError: (errors) => {
      dispatch(signUpError(errors))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)