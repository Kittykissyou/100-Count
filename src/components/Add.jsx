import { useState } from 'react';
import ChooseDate from './ChooseDate';
import AccountCredit from './AccountCredit';
import Loader from './Loader';

const Add = () => {
  const [transactions, setTransactions] = useState({});
  const [stepCount, setStepCount] = useState(1);
  const addTransactionHandler = (e, inputValue) => {
    const transaction = { [e.target.name]: inputValue };
    setTransactions(Object.assign(transactions, transaction));
    /* внутри Set сидит метод объединяющий два объекта в один. Соответств. transactions и 
    transaction, который по итогу даёт нужную структуру. Все остальные инстументы добавления
    свойств в объект приводили либо к ошибке, либо при первом рендеринге появлялся пустой
    объект, а не объект внутри Set */
  };
  const [info, setInfo] = useState(false); // содержит ответ от googleSheets

  const requestOptions = {
    // получаем ответ googleSheet, либо есть счета, либо нет
    method: 'GET',
    redirect: 'follow',
  };
  fetch(
    'https://script.google.com/macros/s/AKfycbyDo6wbCglb9ZDqyGNGMaTF0l0LzHtHwA5AiYPzNsddkUDi_hDkk8CVdlAcjpTrBMg2ug/exec',
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      if (!info) {
        setInfo(JSON.parse(result));
      }
    })
    .catch((error) => console.log('error', error));

  console.log(transactions);
  return (
    <div>
      {info ? (
        Object.keys(info).length > 0 ? (
          <ChooseDate
            addTransaction={addTransactionHandler}
            objWithInf={transactions}
            stepCount={stepCount}
            addStep={(n) => setStepCount(stepCount + n)}
            deleteStep={(n) => setStepCount(stepCount - n)}
          />
        ) : (
          <AccountCredit
            addTransaction={addTransactionHandler}
            objWithInf={transactions}
            stepCount={stepCount}
            addStep={(n) => setStepCount(stepCount + n)}
            deleteStep={(n) => setStepCount(stepCount - n)}
            accountsFromGoogle={info}
          />
        )
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Add;
