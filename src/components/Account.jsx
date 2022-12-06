import { useState } from 'react';
import Steps from './Steps';
import Description from './Description';
import Summ from './Summ';
import FastMenu from './FastMenu';
import style from './Components.module.css';

const Account = ({
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
  const [inputValue, setInputValue] = useState();

  const submitHandler = (event) => {
    event.preventDefault();
    setIsCheck(!isCheck);
    addTransaction(event, inputValue);
    addStep(1);
  };

  return (
    <div>
      {isCheck ? (
        <Description
          addSkipTransaction={addSkipTransaction}
          addTransaction={addTransaction}
          objWithInf={objWithInf}
          id={id}
          addStep={addStep}
          stepCount={stepCount}
          deleteStep={deleteStep}
          accountsFromGoogle={accountsFromGoogle}
        />
      ) : isBack ? (
        <Summ
          addSkipTransaction={addSkipTransaction}
          addTransaction={addTransaction}
          objWithInf={objWithInf}
          id={id}
          addStep={addStep}
          stepCount={stepCount}
          deleteStep={deleteStep}
        />
      ) : (
        <div>
          <Steps stepCount={stepCount} />
          <form
            name="account"
            className={style.formContaner}
            onSubmit={submitHandler}
          >
            <h1>Выберите cчет</h1>
            <select
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            >
              {Object.keys(accountsFromGoogle).map((account) => (
                <option key={id()}> {account}</option>
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
    </div>
  );
};
export default Account;
