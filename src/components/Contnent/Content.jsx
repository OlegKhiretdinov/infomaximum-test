import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { setCurrentUserData } from '../../redux/profile-reducer';
import Menu from '../Menu/Menu';
import ProcessList from '../ProcessList/ProcessList';
import Profile from '../Profile/Profile';
import cls from './Content.module.scss';

const Content = (props) => {

  useEffect(() => props.setCurrentUserData(), [])

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

const mapDispatchToProps = (dispatch) => ({
  setCurrentUserData: () => {
    dispatch(setCurrentUserData())
  },
})

export default connect(null, mapDispatchToProps)(Content);
