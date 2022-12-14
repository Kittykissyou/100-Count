import { useState } from 'react';
import Steps from './Steps';
import Button from './UI/Button';
import Critery from './Critery';
import FastMenu from './FastMenu';
import style from './Components.module.css';
import Account from './Account';
const Summ = ({
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
  const [inputValue, setInputValue] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    setIsCheck(!isCheck);
    addTransaction(event, inputValue);
    addStep(1);
  };

  return (
    <div>
      {isCheck ? (
        <Account
          addTransaction={addTransaction}
          id={id}
          objWithInf={objWithInf}
          addStep={addStep}
          stepCount={stepCount}
          deleteStep={deleteStep}
          accountsFromGoogle={accountsFromGoogle}
        />
      ) : isBack ? (
        <Critery
          addTransaction={addTransaction}
          id={id}
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
            name="summ"
            className={style.formContaner}
            onSubmit={submitHandler}
          >
            <h1> Введите сумму </h1>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              type="submit"
              disabled={
                inputValue.length > 0 && !!Number(inputValue) ? false : true
              }
            >
              Подтвердить
            </Button>
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
export default Summ;
