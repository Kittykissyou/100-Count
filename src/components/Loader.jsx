import { SlRefresh, SlCheck } from 'react-icons/sl';
import style from './Loader.module.css';
const Loader = ({ check }) => {
  return (
    <div>
      {!check ? (
        <div>
          <SlRefresh className={style.refresh} />
          <h3> Вносим данные в гугл таблицы</h3>
        </div>
      ) : (
        <div>
          <SlCheck className={style.check} />
          <h3> Готово!</h3>
        </div>
      )}
    </div>
  );
};
export default Loader;
