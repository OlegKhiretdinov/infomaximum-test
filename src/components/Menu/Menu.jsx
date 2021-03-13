import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { toggleMenu } from '../../redux/menu-reducer';

import cls from './Menu.module.scss';
import product from '../../assets/product.png';
import user from '../../assets/user.png';
import processList from '../../assets/process_list.png';


const Menu = (props) => {
  return (
    <>
      <div className={cls.menu}>
        <div className={cls.menuTrigger} onClick={props.toggleMenu}>
          <div className={`${cls.button} ${cls.icon} ${cls.close}`}></div>
          <div className={cls.title}>Меню</div>
        </div>
      </div>

      <div className={`${cls.overlay} ${props.menuIsOpen ? null : cls.hide}`} onClick={props.toggleMenu}></div>

      <div className={`${cls.list} ${props.menuIsOpen ? cls.open : null}`}>
        <div className={cls.menuTriggerOpen} onClick={props.toggleMenu}>
          <div className={`${cls.button} ${cls.icon} ${cls.open}`}></div>
          <div className={cls.title}>
            <img src={product} alt="proceset" />
          </div>
        </div>
          <NavLink exact activeClassName={cls.active} to="/profile" className={cls.menuLink} onClick={props.toggleMenu}>
            <img src={user} alt="user"/>
            <span>UserName</span>
          </NavLink>
          <NavLink exact activeClassName={cls.active} to="/" className={cls.menuLink} onClick={props.toggleMenu}>
            <img src={processList} alt="process list"/>
            <span>Список процессов</span>
          </NavLink>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  menuIsOpen: state.menu.menuIsOpen,
})

const mapDispatchToProps = (dispatch) => ({
  toggleMenu: () => {
    dispatch(toggleMenu())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu);