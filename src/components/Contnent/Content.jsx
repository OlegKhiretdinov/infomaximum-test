import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { setCurrentUserData } from '../../redux/profile-reducer';
import Menu from '../Menu/Menu';
import ProcessList from '../ProcessList/ProcessList';
import Profile from '../Profile/Profile';
import cls from './Content.module.scss';

class Content extends React.Component {

  componentDidMount() {
    this.props.setCurrentUserData()
  }

  render() {
    return (
      <>
        <Menu />
        <div className={cls.content}>
          <Switch>
            <Route path='/profile' render = {() => (this.props.profile ? <Profile profile={this.props.profile}/> : null)} />
            <Route path='/' component={ProcessList} />
          </Switch>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUserData: () => {
    dispatch(setCurrentUserData())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Content);
