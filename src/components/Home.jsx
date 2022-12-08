import Menu from './Menu';
import style from './Home.module.css';
const Home = () => {
  return (
    <div className={style.background}>
      <h1 className={style.title}>Учет доходов и расходов</h1>
      <Menu />
    </div>
  );
};
export default Home;
