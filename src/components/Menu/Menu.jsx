import { connect } from 'react-redux';
import { toggleMenu } from '../../redux/menu-reducer';
import cls from './Menu.module.scss';
import product from '../../assets/product.png';
import { NavLink } from 'react-router-dom';

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
        <NavLink exact activeClassName={cls.active} to="/profile" className={cls.menuLink}>UserName</NavLink>
        <NavLink exact activeClassName={cls.active} to="/" className={cls.menuLink}>Список процессов</NavLink>
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