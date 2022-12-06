import { useState, useEffect } from 'react';
import { SlRefresh } from 'react-icons/sl';
import ChooseDate from './ChooseDate';
import Button from './UI/Button';
import style from './AccountCredit.module.css';

const AccountCredit = ({
  addTransaction,
  addSkipTransaction,
  objWithInf,
  stepCount,
  addStep,
  deleteStep,
}) => {
  const [inputValueName, setInputValueName] = useState('');
  const [inputValueBalance, setInputValueBalance] = useState('');
  const [isCheck, setIsCheck] = useState(false);
  // const [objAccounts, setObjAccounts] = useState({});
  const addAccountHandler = (event) => {
    event.preventDefault();
    // setObjAccounts({ ...objAccounts, [inputValueName]: inputValueBalance });
    setInputValueName('');
    setInputValueBalance('');
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
    //location.reload();
  };

  /* useEffect(() => {
    localStorage.setItem('objAccounts', JSON.stringify(objAccounts));
  }, [objAccounts]);
  */

  return (
    <>
      {isCheck ? (
        <ChooseDate
          addSkipTransaction={addSkipTransaction}
          addTransaction={addTransaction}
          objWithInf={objWithInf}
          stepCount={stepCount}
          addStep={addStep}
          deleteStep={deleteStep}
        />
      ) : (
        <div>
          <h1 style={{ fontSize: '40px' }}>У вас ещё нет сохраненный счетов</h1>
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
                inputValueName.length > 0 || inputValueBalance > 0
                  ? false
                  : true
              }
            >
              Добавить
            </Button>
            <Button>Редактировать</Button>
            <Button
              type="submit"
              // disabled={Object.keys(objAccounts).length > 0 ? false : true}
            >
              Далее
            </Button>
          </form>
        </div>
      )}
    </>
  );
};
export default AccountCredit;

/*{
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SlPlus, SlMinus } from 'react-icons/sl';
import style from './AccountCredit.module.css';

const AccountCredit = () => {
  const [howManyInputs, setHowManyInputs] = useState([1]);
  const addInputHandler = () => {
    setHowManyInputs([...howManyInputs, howManyInputs.length + 1]);
  };
  const deleteInputHandler = () => {
    setHowManyInputs(
      howManyInputs.filter((el, index) => index !== howManyInputs.length - 1)
    );
  };

  const [inputValue, setInputValue] = useState({});
  const onSubmitHandler = (event) => {
    event.preventDefault();
    let myObj = {};
    for (let i = 0; i < howManyInputs.length; i++) {
      myObj[document.getElementById(`${i}-prop`).value] =
        document.getElementById(`${i}-value`).value;
    }
    setInputValue(myObj);
  }; /* в этом обработчике заложена логика возврата значений из импутов. Вне зависимости от кол-ва
  инпутов, по нажатию кнопки, все значения попадают в объект, который в дальнейшем будет испол. в 
  других компонентах 
  const [inInput, setInInput] = useState('');
  const inputHandler = (event) => {
    setInInput(event.target.value);
  };
  console.log(inInput);
  return (
    <div>
      <h3>Ввнесите сведения о ваших счетах</h3>
      <form onSubmit={onSubmitHandler}>
        <div className={style.formContaner}>
          <div>
            {howManyInputs.map((el, index) => (
              <input
                type="text"
                name={`${index}-prop-input`}
                key={uuidv4()}
                id={`${index}-prop`}
                placeholder={`${index}-prop`}
              ></input>
            ))}
          </div>
          <div>
            {howManyInputs.map((el, index) => (
              <input
                type="text"
                name={`${index}-valu-input`}
                key={uuidv4()}
                id={`${index}-value`}
                placeholder={`${index}-value`}
              ></input>
            ))}
          </div>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <button
              onClick={addInputHandler}
              className={`${style.aloneButtonTop} ${
                howManyInputs.length > 1 ? style.buttonTop : ''
              }`}
            >
              <SlPlus />
            </button>
            {howManyInputs.length > 1 ? (
              <button
                onClick={deleteInputHandler}
                className={style.buttonBottom}
              >
                <SlMinus />
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
        <button onClick={onSubmitHandler}>Подтвердить</button>
      </form>
    </div>
  );
};
export default AccountCredit;
}*/
