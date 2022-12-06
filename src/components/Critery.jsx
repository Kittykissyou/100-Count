import { useState } from 'react';
import FastMenu from './FastMenu';
import Summ from './Summ';
import Steps from './Steps';
import Category from './Category';
import criteries from '../Data/criteries';
import style from './Components.module.css';
const Critery = ({
  addSkipTransaction,
  addTransaction,
  id,
  objWithInf,
  stepCount,
  addStep,
  deleteStep,
  accountsFromGoogle,
}) => {
  const [isBack, setIsBack] = useState(false);
  const [isCheck, setIsCheck] = useState(false); // состояние "подтвержденности"
  const [inputValue, setInputValue] = useState('Непредвиденные расходы');
  const submitHandler = (event) => {
    event.preventDefault();
    setIsCheck(!isCheck);
    addTransaction(event, inputValue);
    addStep(1);
  }; // функция на кнопке

  return (
    <div>
      {isCheck ? (
        <Summ
          addSkipTransaction={addSkipTransaction}
          addTransaction={addTransaction}
          id={id}
          objWithInf={objWithInf}
          addStep={addStep}
          stepCount={stepCount}
          deleteStep={deleteStep}
          accountsFromGoogle={accountsFromGoogle}
        />
      ) : isBack ? (
        <Category
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
            name="critery"
            className={style.formContaner}
            onSubmit={submitHandler}
          >
            <h1>Выберите критерий</h1>
            <select
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            >
              {objWithInf.category !== 'приход' &&
              objWithInf.category !== 'перевод между счетами'
                ? criteries
                    .filter(
                      (critery) =>
                        critery !== 'зарплата' && critery !== 'по счетам'
                    )
                    .map((critery) => <option key={id()}> {critery}</option>)
                : objWithInf.category == 'приход'
                ? criteries
                    .filter((critery) => critery == 'зарплата')
                    .map((critery) => <option key={id()}> {critery}</option>)
                : objWithInf.category == 'перевод между счетами'
                ? criteries
                    .filter((critery) => critery == 'по счетам')
                    .map((critery) => <option key={id()}> {critery}</option>)
                : ''}
              {/* В соответсвии с наименованием столбцов в гугл-таблице реализована логика, согласно
                которой при выборе в компоненте Categorory значения "приход" или "между своими счетами"
                игнорируется компонент Critery и сразу же отображается компонент Summ, однако в объект,
                который объявлен в компоненте Add, содержащий все данные переданные из компонентов,
                принудительно добавляется свойство Category: 'зарплата' или 'по счетам'. Чтобы избежать
                бага, который позволяет, несмотря на выбор в Category значений "приход" и "между своими счетами",
                выбрать логически несоответсвующие этим Категориям Критерии и который может возникнуть, 
                при использовании в компоненте FastMenu кнопки НАЗАД, в тренарном операторе выше был описан
                механизм отражения внутри select компонентов, которые отражаются там в зависимости от значения
                 input'a в компоненте Category. */}
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
    </div>
  );
};
export default Critery;
