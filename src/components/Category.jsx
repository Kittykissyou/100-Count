import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Steps from './Steps';
import ChooseDate from './ChooseDate';
import Critery from './Critery';
import Summ from './Summ';
import FastMenu from './FastMenu';
import style from './Components.module.css';
import categories from '../Data/categories';
const Category = ({
  addSkipTransaction,
  addTransaction,
  objWithInf,
  stepCount,
  addStep,
  deleteStep,
  accountsFromGoogle,
}) => {
  const [isBack, setIsBack] = useState(false);
  const [isCheck, setIsCheck] = useState(false); // состояние "подтвержденности"
  const [inputValue, setInputValue] = useState('расход'); // cостояние в инпуте
  const submitHandler = (event) => {
    event.preventDefault();
    setIsCheck(!isCheck);
    addTransaction(event, inputValue);
    inputValue == 'приход' || inputValue == 'перевод между счетами'
      ? addStep(2)
      : addStep(1);
    if (inputValue == 'приход') {
      addSkipTransaction('critery', 'зарплата');
    }
    if (inputValue == 'перевод между счетами') {
      addSkipTransaction('critery', 'по счетам');
    }
  }; // функция на кнопке

  return (
    <>
      {isCheck ? (
        inputValue == 'приход' || inputValue == 'перевод между счетами' ? (
          <Summ
            //  addSkipTransaction={addSkipTransaction}
            addTransaction={addTransaction}
            id={uuidv4}
            objWithInf={objWithInf}
            addStep={addStep}
            stepCount={stepCount}
            deleteStep={deleteStep}
            accountsFromGoogle={accountsFromGoogle}
          />
        ) : (
          <Critery
            // addSkipTransaction={addSkipTransaction}
            addTransaction={addTransaction}
            id={uuidv4}
            objWithInf={objWithInf}
            addStep={addStep}
            stepCount={stepCount}
            deleteStep={deleteStep}
            accountsFromGoogle={accountsFromGoogle}
          />
        )
      ) : isBack ? (
        <ChooseDate
          addSkipTransaction={addSkipTransaction}
          addTransaction={addTransaction}
          objWithInf={objWithInf}
          addStep={addStep}
          stepCount={stepCount}
          deleteStep={deleteStep}
          accountsFromGoogle={accountsFromGoogle}
        />
      ) : (
        <div>
          <Steps stepCount={stepCount} />
          <form
            name="category"
            className={style.formContaner}
            onSubmit={submitHandler}
          >
            <h1>Выберите вид операции</h1>
            <select
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            >
              {categories.map((category) => (
                <option key={uuidv4()}> {category} </option>
              ))}
            </select>
            <button type="submit">Подтвердить</button>
          </form>
          <FastMenu
            objWithInf={objWithInf}
            skip={() => setIsCheck(!isCheck)}
            back={() => setIsBack(!isBack)}
            addStep={addStep}
            deleteStep={deleteStep}
          />
        </div>
      )}
    </>
  );
};
export default Category;
