import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { getCurrentUserData } from '../../api/request';
import { setUserData } from '../../redux/profile-reducer';
import Menu from '../Menu/Menu';
import ProcessList from '../ProcessList/ProcessList';
import Profile from '../Profile/Profile';
import cls from './Content.module.scss';

class Content extends React.Component {

  componentDidMount() {
    getCurrentUserData(this.props.token, this.props.setCurrentUserData)
  }

  render() {
    return (
      <>
        <Menu />
        <div className={cls.content}>
          <Switch>
            {/* <Route path='/profile' component={Profile} /> */}
            <Route path='/profile' render = {() => {return (this.props.profile ? <Profile profile={this.props.profile}/> : null)}} />
            <Route path='/' component={ProcessList} />
          </Switch>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
  profile: state.profile,
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUserData: (userData) => {
    dispatch(setUserData(userData))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Content);
