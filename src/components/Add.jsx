import { useState } from 'react';
import ChooseDate from './ChooseDate';
import AccountCredit from './AccountCredit';

const Add = () => {
  let [transactions, setTransactions] = useState({});
  const [stepCount, setStepCount] = useState(1);

  const addSkipTransactionHandler = (prop, value) => {
    const transaction = { [prop]: value };
    setTransactions(Object.assign(transactions, transaction));
  };
  const addTransactionHandler = (e, inputValue) => {
    const transaction = { [e.target.name]: inputValue };
    setTransactions(Object.assign(transactions, transaction));
    /* внутри Set сидит метод объединяющий два объекта в один. Соответств. transactions и 
    transaction, который по итогу даёт нужную структуру. Все остальные инстументы добавления
    свойств в объект приводили либо к ошибке, либо при первом рендеринге появлялся пустой
    объект, а не объект внутри Set */
  };

  console.log(transactions);

  /* эта функция позволяет записать в состояние свойство и значение,
    которое мы будем получать на каждом шаге из импута. В конце концов,
    сформировавшийся объект, мы передадим через npm пакет Axios на API,
    которое внесет изменение в гугл-таблицу. Формирование одного объекта,
    содержащего в себе несколько свойств названных аналогично REACT-компонентам
    со значениями из импутов внутри данных компонентов, обусловленно особенностью
    API с которым мы взаимодествуем для передачи данных в гугл-таблицы (если
    передавать свойства и значения объекта внутри каждого компонента, то данные
    из последующих компонентов вносятся на строку ниже) */

  return (
    <div>
      {localStorage.getItem('objAccounts') == undefined ? (
        <AccountCredit
          addSkipTransaction={addSkipTransactionHandler}
          addTransaction={addTransactionHandler}
          objWithInf={transactions}
          stepCount={stepCount}
          addStep={(n) => setStepCount(stepCount + n)}
          deleteStep={(n) => setStepCount(stepCount - n)}
        />
      ) : (
        <ChooseDate
          addSkipTransaction={addSkipTransactionHandler}
          addTransaction={addTransactionHandler}
          objWithInf={transactions}
          stepCount={stepCount}
          addStep={(n) => setStepCount(stepCount + n)}
          deleteStep={(n) => setStepCount(stepCount - n)}
          addBalance={() => addBalance}
        />
      )}
    </div>
  );
};

export default Add;
