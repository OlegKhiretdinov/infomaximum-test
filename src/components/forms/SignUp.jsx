import { Field, Form } from "react-final-form";
import { connect } from "react-redux";
import { signUp } from "../../api/request";
import { setToken } from "../../redux/login-reducer";
import { signUpError, toggleShowConfirmPassword, toggleShowPassword } from "../../redux/signUp-reducer";
import { validEmail } from "./formValidation";

import cls from './forms.module.scss';

const SignUp = (props) => {

  const TriggerTogglePassword = (props) => {
    const triggerClass = props.showPassword ? cls.showPassword : cls.hidePassword
    return <div className={`${cls.trigger} ${triggerClass}`} onClick={props.toggle}></div>
  }

  return (
    <Form
      onSubmit={({firstName, secondName, email, password}) => {
        signUp(firstName, secondName, email, password, props.signUpError, props.setToken)
      }}

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
            {({ input, meta}) => (
              <input {...input} placeholder="Имя" className={meta.touched && meta.error ? cls.error : null} />
            )}
          </Field>

          <Field name="secondName" type="text" >
            {({ input, meta}) => (
              <input{...input} placeholder="Фамилия" className={meta.touched && meta.error ? cls.error : null} />
            )}
          </Field>

          <Field name="email" type="email" >
            {({ input, meta}) =>(
              <input {...input} placeholder="Электронная почта" className={meta.touched && meta.error ? cls.error : null} />
            )}
          </Field>

          <Field name="password" type={props.showPassword ? "text" : "password"} >
            {({ input, meta }) => (
              <div className={cls.passwordWrapper}>
                <TriggerTogglePassword showPassword={props.showPassword} toggle={props.toggleShowPassword} />
                <input {...input} placeholder="Пароль" className={meta.touched && meta.error ? cls.error : null} />
              </div>
            )}
          </Field>

          <Field name="confirmPassword" type={props.showConfirmPassword ? "text" : "password"} >
            {({ input, meta }) => (
              <div className={cls.passwordWrapper}>
                <TriggerTogglePassword showPassword={props.showConfirmPassword} toggle={props.toggleShowConfirmPassword} />
                <input {...input} placeholder="Подтвердите пароль" className={meta.touched && meta.error ? cls.error : null} />
              </div>
            )}
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