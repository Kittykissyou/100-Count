import style from './Steps.module.css';
export const Steps = ({ stepCount }) => {
  return (
    <div className={style.stepsContaner}>
      <h2>{`Шаг ${stepCount} из 7`}</h2>
    </div>
  );
};
export default Steps;
