const { createPromise } = require('../promise');

function waitThenPass(timeout, message) {
  return createPromise((resolve, reject) => {
    setTimeout(() => resolve(message), timeout);
  });
}

waitThenPass(3000, 'Hello')
  .then((message) => {
    console.log(message);
    return waitThenPass(3000, message + 'again');
  })
  .then((message) => {
    console.log(message);
    return waitThenPass(3000, message + 'again');
  })
  .then((message) => {
    console.log(message);
    console.log('done');
  })