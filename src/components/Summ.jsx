import { useState } from 'react';
import Steps from './Steps';
import Button from './UI/Button';
import Critery from './Critery';
import FastMenu from './FastMenu';
import style from './Components.module.css';
import Account from './Account';
const Summ = ({
  addSkipTransaction,
  addTransaction,
  id,
  objWithInf,
  stepCount,
  addStep,
  deleteStep,
}) => {
  const [isBack, setIsBack] = useState(false);
  const [isCheck, setIsCheck] = useState(false); // состояние "подтвержденности"
  const [inputValue, setInputValue] = useState('');
  const [accountsFromGoogle, setAccountsFromGoogle] = useState({});
  const submitHandler = (event) => {
    event.preventDefault();
    setIsCheck(!isCheck);
    addTransaction(event, inputValue);
    addStep(1);
  };

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  fetch(
    'https://script.google.com/macros/s/AKfycbyDo6wbCglb9ZDqyGNGMaTF0l0LzHtHwA5AiYPzNsddkUDi_hDkk8CVdlAcjpTrBMg2ug/exec',
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => setAccountsFromGoogle(JSON.parse(result)))
    .catch((error) => console.log('error', error));

  return (
    <div>
      {isCheck ? (
        <Account
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
        <Critery
          addSkipTransaction={addSkipTransaction}
          addTransaction={addTransaction}
          id={id}
          objWithInf={objWithInf}
          addStep={addStep}
          stepCount={stepCount}
          deleteStep={deleteStep}
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
                inputValue.length > 0 &&
                Object.keys(accountsFromGoogle).length > 0
                  ? false
                  : true
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
