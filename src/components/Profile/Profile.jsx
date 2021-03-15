import React from 'react'
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';

import { editCurrentUser, getCurrentUserData } from '../../api/request';
import { setUserData, toggleShowConfirmPassword, toggleShowPassword } from '../../redux/profile-reducer';
import { validEmail } from '../forms/formValidation';
import cls from './Profile.module.scss';

const TriggerTogglePassword = (props) => {
  const triggerClass = props.showPassword ? cls.showPassword : cls.hidePassword
  return <div className={`${cls.trigger} ${triggerClass}`} onClick={props.toggle}></div>
}

class Profile extends React.Component {

  onSubmit = async ({ email, firstName, secondName, password }) => {
    await editCurrentUser(this.props.token, this.props.profile.id, email, firstName, secondName, password)
    getCurrentUserData(this.props.token, this.props.setCurrentUserData)
  }

  render() {
    return (
      <>
        <Form
          onSubmit={(props) => this.onSubmit(props)}
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
          {({ handleSubmit, invalid }) => (
            <form onSubmit={handleSubmit} className={cls.form}>

              <div className={cls.header}>
                <h1 className={cls.title}>{`${this.props.profile.firstName} ${this.props.profile.secondName}. Редактирование`}</h1>
                <button type="submit" disabled={invalid} >Сохранить</button>
              </div>

              <div className={cls.fieldsWrapper}>
                <div className={cls.fields}>
                  <label className={cls.label}>Имя</label>
                  <Field name="firstName" type="text" initialValue={this.props.profile.firstName} >
                    {({ input, meta }) => {
                      const errCls = meta.touched && meta.error ? `${cls.input} ${cls.error}` : `${cls.input}`
                      return <input {...input} placeholder="Не задано" className={errCls} />
                    }}
                  </Field>

                  <label className={cls.label}>Фамилия</label>
                  <Field name="secondName" type="text" initialValue={this.props.profile.secondName} >
                    {({ input, meta }) => {
                      const errCls = meta.touched && meta.error ? `${cls.input} ${cls.error}` : `${cls.input}`
                      return <input{...input} placeholder="Не задано" className={errCls} />
                    }}
                  </Field>

                  <label className={cls.label}>Email</label>
                  <Field name="email" type="email" initialValue={this.props.profile.email} >
                    {({ input, meta }) => {
                      const errCls = meta.touched && meta.error ? `${cls.input} ${cls.error}` : `${cls.input}`
                      return <input {...input} placeholder="Не задано" className={errCls} />
                    }}
                  </Field>
                  

                  <label className={cls.label}>Новый пароль</label>
                  <Field name="password" type={this.props.showPassword ? "text" : "password"} >
                    {({ input, meta }) => {
                      const errCls = meta.touched && meta.error ? `${cls.input} ${cls.error}` : `${cls.input}`
                      return (
                        <div className={`${errCls} ${cls.passwordWrapper}`}>
                          <input {...input} placeholder="Не задано" />
                          <TriggerTogglePassword showPassword={this.props.showPassword} toggle={this.props.toggleShowPassword} />
                        </div>)
                    }}
                  </Field>

                  <label className={cls.label}>Подтвердите пароль</label>
                  <Field name="confirmPassword" type={this.props.showConfirmPassword ? "text" : "password"} >
                    {({ input, meta }) => {
                      const errCls = meta.touched && meta.error ? `${cls.input} ${cls.error}` : `${cls.input}`
                      return (
                        <div className={`${errCls} ${cls.passwordWrapper}`}>
                          <input {...input} placeholder="Не задано" />
                          <TriggerTogglePassword showPassword={this.props.showConfirmPassword} toggle={this.props.toggleShowConfirmPassword} />
                        </div>)
                    }}
                  </Field>
                </div>
              </div>
            </form>
          )}
        </Form>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
  profile: state.profile,
  showPassword: state.profile.showPassword,
  showConfirmPassword: state.profile.showConfirmPassword,
})

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUserData: (userData) => {
      dispatch(setUserData(userData))
    },
    toggleShowPassword: () => {
      dispatch(toggleShowPassword())
    },
    toggleShowConfirmPassword: () => {
      dispatch(toggleShowConfirmPassword())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
