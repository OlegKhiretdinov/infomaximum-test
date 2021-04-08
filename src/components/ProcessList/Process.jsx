import moment from 'moment';
import 'moment/locale/ru';
import momentDurationFormatSetup from 'moment-duration-format';

import cls from './ProcessList.module.scss';
import count from '../../assets/count.png';
import time from '../../assets/time.png';
import active_time from '../../assets/active_time.png';
import employees from '../../assets/employees.png';
import scenarios from '../../assets/scenarios.png';

moment.locale('ru')

const Process = (props) => {
  const averageTime = `${moment.duration(Number(props.process.averageLeadTime), "milliseconds").format("h[ч] m[мин]")}`
  const averageActiveTime = `${moment.duration(Number(props.process.averageActiveTime), "milliseconds").format('H[ч] m[мин]')}`
  const percent = `(${(props.process.averageActiveTime / props.process.averageLeadTime * 100).toFixed(1)}%)`
  const start = moment.unix(Number(props.process.start)).format('DD MMMM YYYY')
  const end = moment.unix(Number(props.process.end)).format('DD MMMM YYYY')
  const loading = moment.unix(Number(props.process.loading)).format('DD MMMM YYYY')

  return (
    <div className={cls.process}>

      <div className={cls.header}>
        <h2 className={cls.title}>{props.process.name}</h2>
        <a href="/#" className={cls.link}>На карту процесса {'>'}</a>
      </div>

      <div className={cls.description}>
        <div className={cls.infoBlock}>
          <div className={cls.item}>
            <img src={count} alt="count" />
            <span className={cls.infoCount}>
              {props.process.numberOfExecutions.toLocaleString('ru-RU')}
            </span>
            <p className={cls.sub}>выполнено раз</p>
          </div>
        </div>

        <div className={cls.infoBlock}>
          <div className={cls.item}>
            <img src={time} alt="time" />
            <span className={cls.infoData}>
              {averageTime}
            </span>
            <p className={cls.sub}>среднее время выполнения</p>
          </div>
          <div className={cls.item}>
            <img src={active_time} alt="active time" />
            <span className={cls.infoData}>
              {`${averageActiveTime} ${percent}`}
            </span>
            <p className={cls.sub}>среднее активное время</p>
          </div>
        </div>

        <div className={cls.infoBlock}>
          <div className={cls.item}>
            <img src={employees} alt="employees" />
            <span className={cls.infoData}>
              {`${props.process.employeesInvolvedProcess} сотрудников`}
            </span>
            <p className={cls.sub}>участвует в процессе</p>
          </div>
          <div className={cls.item}>
            <img src={scenarios} alt="active time" />
            <span className={cls.infoData}>
              {`${props.process.numberOfScenarios} сценариев`}
            </span>
            <p className={cls.sub}>в процессе</p>
          </div>
        </div>

        <div className={cls.date}>
          <p className={cls.sub}>Начало</p><p className={cls.data}>{start}</p>
          <p className={cls.sub}>Окончание</p><p className={cls.data}>{end}</p>
          <p className={cls.sub}>Загрузка</p><p className={cls.data}>{loading}</p>
        </div>
      </div>
    </div>
  )
}

export default Process;