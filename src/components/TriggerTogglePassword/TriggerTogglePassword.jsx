import cls from './TriggerTogglePassword.module.scss';

const TriggerTogglePassword = (props) => {
  const triggerClass = props.show ? cls.showPassword : cls.hidePassword
  return <div className={`${cls.trigger} ${triggerClass}`} onClick={props.toggle}></div>
}

export default TriggerTogglePassword;
