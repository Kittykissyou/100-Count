import { useState } from 'react';
import { SlRefresh } from 'react-icons/sl';
import ChooseDate from './ChooseDate';
import Button from './UI/Button';
import style from './AccountCredit.module.css';

const AccountCredit = ({
  addTransaction,
  objWithInf,
  stepCount,
  addStep,
  deleteStep,
}) => {
  const [inputValueName, setInputValueName] = useState('');
  const [inputValueBalance, setInputValueBalance] = useState('');
  const [isCheck, setIsCheck] = useState(false);
  const [checkAccount, setCheckAccount] = useState(false);
  const addAccountHandler = (event) => {
    event.preventDefault();
    setInputValueName('');
    setInputValueBalance('');
    setCheckAccount(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var urlencoded = new URLSearchParams();
    urlencoded.append(inputValueName, inputValueBalance);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    fetch(
      'https://script.google.com/macros/s/AKfycby5V-bp2ae8wbpNX7iVTgc_TbvP2UPD1bMRXRjqtyAZ5bqvjy1tkXkENRTd_uunM8nHAw/exec',
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };
  const refreshHandler = (event) => {
    event.preventDefault();
    setInputValueName('');
    setInputValueBalance('');
  };
  const nextStepHandler = (event) => {
    event.preventDefault();
    setIsCheck(!isCheck);
  };

  return (
    <>
      {isCheck ? (
        <ChooseDate
          addTransaction={addTransaction}
          objWithInf={objWithInf}
          stepCount={stepCount}
          addStep={addStep}
          deleteStep={deleteStep}
        />
      ) : (
        <div>
          <h1 style={{ fontSize: '40px', marginTop: '10%' }}>
            У вас ещё нет сохраненный счетов
          </h1>
          <h2> Внесите сведения о своих счетах</h2>
          <form className={style.formContaner} onSubmit={nextStepHandler}>
            <div className={style.inputContaner}>
              <input
                type="text"
                placeholder="Введите название счета"
                value={inputValueName}
                onChange={(e) => setInputValueName(e.target.value)}
              ></input>
              <input
                type="text"
                placeholder="Введите актуальный остаток"
                value={inputValueBalance}
                onChange={(e) => setInputValueBalance(e.target.value)}
              ></input>
              <Button
                onClick={refreshHandler}
                disabled={
                  inputValueName.length > 0 || inputValueBalance > 0
                    ? false
                    : true
                }
              >
                <SlRefresh />
              </Button>
            </div>
            <Button
              onClick={addAccountHandler}
              disabled={
                inputValueName.length > 0 &&
                inputValueBalance.length > 0 &&
                !!Number(inputValueBalance)
                  ? false
                  : true
              }
            >
              Добавить
            </Button>
            <Button>Редактировать</Button>
            <Button type="submit" disabled={checkAccount ? false : true}>
              Далее
            </Button>
          </form>
        </div>
      )}
    </>
  );
};
export default AccountCredit;
