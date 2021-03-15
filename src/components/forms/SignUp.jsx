import { Field, Form } from "react-final-form";
import { connect } from "react-redux";
import TriggerTogglePassword from "../TriggerTogglePassword/TriggerTogglePassword";
import { signUp } from "../../api/request";
import { setToken } from "../../redux/login-reducer";
import { signUpError, toggleShowConfirmPassword, toggleShowPassword } from "../../redux/signUp-reducer";
import { validEmail } from "./formValidation";

import cls from './forms.module.scss';

const SignUp = (props) => {

  // const TriggerTogglePassword = (props) => {
  //   const triggerClass = props.showPassword ? cls.showPassword : cls.hidePassword
  //   return <div className={`${cls.trigger} ${triggerClass}`} onClick={props.toggle}></div>
  // }

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

          <Field name="password" type={props.showPassword ? "text" : "password"} >
            {({ input, meta }) => {
              const inputCls = meta.touched && meta.error ? `${cls.input} ${cls.error}` : `${cls.input}`
              return (
              <div className={`${cls.passwordWrapper} ${inputCls}`}>
                <input {...input} placeholder="Пароль" className={meta.touched && meta.error ? cls.error : null} />
                <TriggerTogglePassword toggle={props.toggleShowPassword} show={props.showPassword} />
              </div>
            )}
            }
          </Field>

          <Field name="confirmPassword" type={props.showConfirmPassword ? "text" : "password"} >
            {({ input, meta }) => {
              const inputCls = meta.touched && meta.error ? `${cls.input} ${cls.error}` : `${cls.input}`
              return (
              <div className={`${cls.passwordWrapper} ${inputCls}`}>
                <input {...input} placeholder="Подтвердите пароль" className={meta.touched && meta.error ? cls.error : null} />
                <TriggerTogglePassword toggle={props.toggleShowConfirmPassword} show={props.showConfirmPassword} />
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
    showPassword: state.signUp.showPassword,
    showConfirmPassword: state.signUp.showConfirmPassword,
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
    toggleShowPassword: () => {
      dispatch(toggleShowPassword())
    },
    toggleShowConfirmPassword: () => {
      dispatch(toggleShowConfirmPassword())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)