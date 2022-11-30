import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import menu from '../Data/menu';
import style from './Menu.module.css';

export const Menu = () => {
  return (
    <nav>
      {menu.map((category) => (
        <Link className={style.menu} to={category.slug} key={uuidv4()}>
          {category.name}
        </Link>
      ))}
    </nav>
  );
};
export default Menu;
