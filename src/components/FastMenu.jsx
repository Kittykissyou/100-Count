import { Link } from 'react-router-dom';
import {
  RiHome3Line,
  RiArrowRightSLine,
  RiArrowLeftSLine,
  RiTable2,
} from 'react-icons/ri';

import Button from './UI/Button';
import style from './FastMenu.module.css';
const FastMenu = ({ skip, back, stepCount, addStep, deleteStep }) => {
  return (
    <div className={style.fastMenuContaner}>
      <Button title="На главную">
        <Link to="..">
          <RiHome3Line />
        </Link>
      </Button>
      <Button
        title="Назад"
        disabled={stepCount == 1 ? true : false}
        onClick={() => {
          back();
          deleteStep(1);
        }}
      >
        <RiArrowLeftSLine />
      </Button>
      <Button
        title="Далее"
        disabled={stepCount == 7 ? true : false}
        onClick={() => {
          skip();
          addStep(1);
        }}
      >
        <RiArrowRightSLine />
      </Button>
      <Button title="Перейти к таблице">
        <Link to="/table">
          <RiTable2 />
        </Link>
      </Button>
    </div>
  );
};
export default FastMenu;
