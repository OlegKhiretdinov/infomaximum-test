import { Route } from 'react-router';
import Menu from '../Menu/Menu';
import Profile from '../Profile/Profile';

import cls from './Content.module.scss';

const Content = () => {

  return (
    <>
      <Menu />
      <div className={cls.content}>
        <Route path='/profile' component={Profile} />
      </div>
    </>
  )
}

export default Content;
