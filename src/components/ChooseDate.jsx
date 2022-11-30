import { useState } from 'react';
import Category from './Category.jsx';
import Steps from './Steps.jsx';
import FastMenu from './FastMenu.jsx';
import style from './Components.module.css';
import moment from 'moment'; // позволяет задать дате нужный формат, необх. для инпута кален.

const ChooseDate = ({
  addTransaction,
  addSkipTransaction,
  objWithInf,
  stepCount,
  addStep,
  deleteStep,
}) => {
  const currentDate = () => {
    //Функция возвращающая текующую дату
    const today = moment().format('YYYY-MM-DD');
    return today;
  };

  const [isCheck, setIsCheck] = useState(false); // состояние "подтвержденности"
  const [inputValue, setInputValue] = useState(currentDate()); // состояние даты в инпуте
  const submitHandler = (event) => {
    event.preventDefault();
    setIsCheck(!isCheck);
    addTransaction(event, inputValue); // это функция из Add, формирующая единый объект с данными
    addStep(1);
  }; // функция на кнопке

  return (
    <>
      {isCheck ? ( // при нажатии на кнопку, чек становиться true и появляется следующий комп.
        <Category
          addSkipTransaction={addSkipTransaction}
          addTransaction={addTransaction}
          objWithInf={objWithInf}
          stepCount={stepCount}
          addStep={addStep}
          deleteStep={deleteStep}
        />
      ) : (
        <div>
          <Steps stepCount={stepCount} />
          <form
            name="date"
            className={style.formContaner}
            onSubmit={submitHandler}
          >
            <h1>Введите дату</h1>
            <input
              type="date"
              value={inputValue}
              max={currentDate()}
              onChange={(e) => setInputValue(e.target.value)}
            ></input>
            <button type="submit">Подтвердить</button>
          </form>
          <FastMenu
            objWithInf={objWithInf}
            skip={() => setIsCheck(!isCheck)}
            addStep={addStep}
            stepCount={stepCount}
          />
        </div>
      )}
    </>
  );
};
export default ChooseDate;
