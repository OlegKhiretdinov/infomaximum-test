import React, { useState } from 'react'
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';

import ErrorsMessage from '../ErrorsMessage/ErrorsMessage';
import { editProfile } from '../../redux/profile-reducer';
import { validEmail } from '../forms/formValidation';
import cls from './Profile.module.scss';
import TriggerTogglePassword from '../TriggerTogglePassword/TriggerTogglePassword';

const Profile = (props) => {

  const [isShowPassword, toggleShowPassword] = useState(false)
  const [isShowConfirm, toggleShowConfirm] = useState(false)

  return (
    <>
      <Form
        onSubmit={(profileData) => props.editProfile(profileData)}
        validate={(values) => {
          const errors = {};
          if (!validEmail(values.email)) {
            errors.email = 'Require';
          }
          if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'does not match';
          }
          return errors;
        }}
        initialValues={{
          firstName: props.profile.firstName,
          secondName: props.profile.secondName,
          email: props.profile.email,
        }}
      >
        {({ handleSubmit, invalid, pristine, submitSucceeded, modifiedSinceLastSubmit }) => (
          <form onSubmit={handleSubmit} className={cls.form}>

            <div className={cls.header}>
              <h1 className={cls.title}>{`${props.profile.firstName} ${props.profile.secondName}. Редактирование`}</h1>
              <button type="submit" disabled={invalid || pristine || (submitSucceeded && !modifiedSinceLastSubmit)} >{props.profile.isChanged ? 'Сохранено' : 'Сохранить'}</button>
            </div>

            <div className={cls.fieldsWrapper}>
              <div className={cls.fields}>
                <label className={cls.label}>Имя</label>
                <Field name="firstName" type="text" >
                  {({ input, meta }) => {
                    const errCls = meta.touched && meta.error ? `${cls.input} ${cls.error}` : `${cls.input}`
                    return <input {...input} placeholder="Не задано" className={errCls} />
                  }}
                </Field>

                <label className={cls.label}>Фамилия</label>
                <Field name="secondName" type="text" >
                  {({ input, meta }) => {
                    const errCls = meta.touched && meta.error ? `${cls.input} ${cls.error}` : `${cls.input}`
                    return <input{...input} placeholder="Не задано" className={errCls} />
                  }}
                </Field>

                <label className={cls.label}>Email</label>
                <Field name="email" type="email" >
                  {({ input, meta }) => {
                    const errCls = meta.touched && meta.error ? `${cls.input} ${cls.error}` : `${cls.input}`
                    return <input {...input} placeholder="Не задано" className={errCls} />
                  }}
                </Field>


                <label className={cls.label}>Новый пароль</label>
                <Field name="password" type={isShowPassword ? "text" : "password"} >
                  {({ input, meta }) => {
                    const errCls = meta.touched && meta.error ? `${cls.input} ${cls.error}` : `${cls.input}`
                    return (
                      <div className={`${errCls} ${cls.passwordWrapper}`}>
                        <input {...input} placeholder="Не задано" />
                        <TriggerTogglePassword show={isShowPassword} toggle={() => toggleShowPassword(!isShowPassword)} />
                      </div>)
                  }}
                </Field>

                <label className={cls.label}>Подтвердите пароль</label>
                <Field name="confirmPassword" type={isShowConfirm ? "text" : "password"} >
                  {({ input, meta }) => {
                    const errCls = meta.touched && meta.error ? `${cls.input} ${cls.error}` : `${cls.input}`
                    return (
                      <div className={`${errCls} ${cls.passwordWrapper}`}>
                        <input {...input} placeholder="Не задано" />
                        <TriggerTogglePassword show={isShowConfirm} toggle={() => toggleShowConfirm(!isShowConfirm)} />
                      </div>)
                  }}
                </Field>
              </div>
            </div>
          </form>
        )}
      </Form>
      <div>
        {props.profile.errors.length > 0 && <ErrorsMessage errors={props.profile.errors} />}
      </div>
    </>
  )

}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

const mapDispatchToProps = (dispatch) => {
  return {
    editProfile: (profileData) => {
      dispatch(editProfile(profileData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
