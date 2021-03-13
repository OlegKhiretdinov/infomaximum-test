import { Route, Switch } from 'react-router';

import Menu from '../Menu/Menu';
import ProcessList from '../ProcessList/ProcessList';
import Profile from '../Profile/Profile';

import cls from './Content.module.scss';

const Content = () => {

  return (
    <>
      <Menu />
      <div className={cls.content}>
        <Switch>
          <Route path='/profile' component={Profile} />
          <Route path='/' component={ProcessList} />
        </Switch>
      </div>
    </>
  )
}

export default Content;
