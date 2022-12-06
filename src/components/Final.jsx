import { useState } from 'react';
import Steps from './Steps';
import Description from './Description';
import Button from './UI/Button';
import FastMenu from './FastMenu';
import Loader from './Loader';
import style from './Components.module.css';

const Final = ({
  addSkipTransaction,
  objWithInf,
  id,
  addTransaction,
  stepCount,
  addStep,
  deleteStep,
  accountsFromGoogle,
}) => {
  const [isBack, setIsBack] = useState(false); // возврат назад из FASTMENU
  const [finalObj, setFinalObj] = useState({}); // Инф. после расчетов
  const [checkLoader, setCheckLoader] = useState(false); // отображ. чек лоадера
  const [goLoader, setGoLoader] = useState(false); // запуск спина лоадера
  const [checkTransaction, setCheckTransaction] = useState(false);

  const doTransaction = () => {
    setFinalObj({
      ...objWithInf,
      ['balance']:
        accountsFromGoogle[objWithInf.account] - Number(objWithInf.summ),
    });
    setCheckTransaction(!checkTransaction);
  };

  const goGoogle = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    const urlencoded = new URLSearchParams();
    for (let i = 0; i <= Object.keys(finalObj).length; i++) {
      urlencoded.append(
        Object.keys(finalObj)[i],
        finalObj[Object.keys(finalObj)[i]]
      );
    }
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    fetch(
      'https://script.google.com/macros/s/AKfycbyxVAz8eQcxaXNLq8gd2fediyz6wAJouJr9KFV96OqB4rM7xUn991salvy7ra9KuYtw/exec',
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setCheckLoader(!checkLoader);
        setTimeout(() => location.reload(), 1500);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

        const urlencoded = new URLSearchParams();
        urlencoded.append('event', 'изменение после транзакции');
        urlencoded.append('account', finalObj.account);
        urlencoded.append('sum', finalObj.balance);

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow',
        };

        fetch(
          'https://script.google.com/macros/s/AKfycbzP8RyNXYFn3w2qEccTxbJVNCSvt_1ma5nvHkbgw2t2xLdVyOzMtO8TLSOgrTlwCOAzMw/exec',
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log('error', error));
      })
      .catch((error) => console.log('error', error));
    setGoLoader(!goLoader);
  };

  return (
    <div>
      {goLoader ? (
        <Loader check={checkLoader} />
      ) : isBack ? (
        <Description
          addSkipTransaction={addSkipTransaction}
          objWithInf={objWithInf}
          id={id}
          addTransaction={addTransaction}
          addStep={addStep}
          stepCount={stepCount}
          deleteStep={deleteStep}
          accountsFromGoogle={accountsFromGoogle}
        />
      ) : (
        <div>
          <Steps stepCount={stepCount} />
          <h1 className={style.title}> Проверьте данные перед их отправкой</h1>
          {Object.keys(objWithInf).length == 0 ? (
            <h1>Заполненные поля отсутствуют</h1>
          ) : (
            <div>
              <table width="90%" border="1" className={style.tableContaner}>
                <thead>
                  <tr>
                    {Object.keys(objWithInf).map((prop) => (
                      <th key={id()}>{prop}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {Object.values(objWithInf).map((inf) => (
                      <td key={id()}> {inf}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
              <Button
                onClick={doTransaction}
                style={{ margin: '20px' }}
                disabled={Object.values(objWithInf).length < 6 ? true : false}
                title={
                  Object.values(objWithInf).length < 6
                    ? 'Сначала внесите недостающие данные'
                    : ''
                }
              >
                Подтвердить
              </Button>
              <Button
                onClick={goGoogle}
                disabled={!checkTransaction ? true : false}
              >
                Отправить
              </Button>
            </div>
          )}

          <FastMenu
            objWithInf={objWithInf}
            back={() => setIsBack(!isBack)}
            deleteStep={deleteStep}
            stepCount={stepCount}
          />
        </div>
      )}
    </div>
  );
};
export default Final;
