import { useState } from 'react';
import Steps from './Steps';
import Final from './Final';
import Account from './Account';
import Button from './UI/Button';
import FastMenu from './FastMenu';
import style from './Description.module.css';
const Description = ({
  addSkipTransaction,
  addTransaction,
  objWithInf,
  id,
  stepCount,
  addStep,
  deleteStep,
  accountsFromGoogle = { accountsFromGoogle },
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
        <Final
          addSkipTransaction={addSkipTransaction}
          objWithInf={objWithInf}
          id={id}
          addTransaction={addTransaction}
          addStep={addStep}
          stepCount={stepCount}
          deleteStep={deleteStep}
          accountsFromGoogle={accountsFromGoogle}
        />
      ) : isBack ? (
        <Account
          addSkipTransaction={addSkipTransaction}
          objWithInf={objWithInf}
          id={id}
          addTransaction={addTransaction}
          addStep={addStep}
          stepCount={stepCount}
          deleteStep={deleteStep}
        />
      ) : (
        <div>
          <Steps stepCount={stepCount} />
          <form
            name="description"
            onSubmit={submitHandler}
            className={style.formContaner}
          >
            <h1> Введите описание </h1>
            <textarea
              className={`${style.input} ${
                inputValue.length >= 19 && inputValue.length <= 29
                  ? style.bigInput
                  : inputValue.length >= 30 && inputValue.length <= 39
                  ? style.bigX2Input
                  : inputValue.length >= 40 && inputValue.length <= 64
                  ? style.bigX3Input
                  : inputValue.length >= 65 && inputValue.length <= 128
                  ? style.bigX4Input
                  : inputValue.length >= 129 && inputValue.length <= 192
                  ? style.bigX5Input
                  : inputValue.length >= 193
                  ? style.bigX6Input
                  : ''
              }`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              className={style.descriptionBtn}
              type="submit"
              disabled={inputValue.length > 4 ? false : true}
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
export default Description;

/* <input
          className={`${style.input} ${
            inputValue.length >= 19 && inputValue.length <= 29
              ? style.bigInput
              : inputValue.length >= 30 && inputValue.length <= 39
              ? style.bigX2Input
              : inputValue.length >= 40
              ? style.bigX3Input
              : ''
          }`}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        */
