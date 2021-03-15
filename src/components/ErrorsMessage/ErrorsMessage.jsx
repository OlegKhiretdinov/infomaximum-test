import cls from './ErrorsMessage.module.scss';
import warning from '../../assets/warning.png';

const ErrorsMessage = (props) => {
  const messages = props.errors.map((error, index) => (<p key={index}>{error.message}</p>))
  return (
    <div className={cls.errors}>
      <div className={cls.img}>
        <img src={warning} alt="error" />
      </div>
      <div>
        {messages}
      </div>
    </div>
  )
}

export default ErrorsMessage
