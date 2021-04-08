import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { setToken } from '../../redux/login-reducer'
import { removeAuthToken } from '../../utils/localStorage'
import cls from './Menu.module.scss';
import product from '../../assets/product.png';
import user from '../../assets/user.png';
import processList from '../../assets/process_list.png';

const Menu = (props) => {

  const[menuIsOpen, toggleMenu] = useState(false)

  const logOut = () => {
    props.setToken(null)
    removeAuthToken()
  }

  return (
    <>
      <div className={cls.menu}>
        <div className={cls.menuTrigger} onClick={() => toggleMenu(!menuIsOpen)}>
          <div className={`${cls.button} ${cls.icon} ${cls.close}`}></div>
          <div className={cls.title}>Меню</div>
        </div>
        <button onClick={logOut}>Logout</button>
      </div>

      <div className={`${cls.overlay} ${menuIsOpen ? null : cls.hide}`} onClick={() => toggleMenu(!menuIsOpen)}></div>

      <div className={`${cls.list} ${menuIsOpen ? cls.open : null}`}>
        <div className={cls.menuTriggerOpen} onClick={() => toggleMenu(!menuIsOpen)}>
          <div className={`${cls.button} ${cls.icon} ${cls.open}`}></div>
          <div className={cls.title}>
            <img src={product} alt="proceset" />
          </div>
        </div>
          <NavLink exact activeClassName={cls.active} to="/profile" className={cls.menuLink} onClick={() => toggleMenu(!menuIsOpen)}>
            <img src={user} alt="user"/>
            <span>{props.userName}</span>
          </NavLink>
          <NavLink exact activeClassName={cls.active} to="/" className={cls.menuLink} onClick={() => toggleMenu(!menuIsOpen)}>
            <img src={processList} alt="process list"/>
            <span>Список процессов</span>
          </NavLink>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  userName: state.profile.firstName,
})

export default connect(mapStateToProps, {setToken})(Menu);
