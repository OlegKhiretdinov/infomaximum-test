import Menu from '../Menu/Menu';

import cls from './Content.module.scss';

const Content = () => {

  return (
    <>
      <Menu />
      <div className={cls.content}>
        <h1>CONTENT</h1>
      </div>
    </>
  )
}

export default Content;
