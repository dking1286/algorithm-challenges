const PromiseMethods = {
  then(successCallback) {
    this.successCallbacks.push(successCallback);
    return this;
  },

  catch(failureCallback) {
    this.failureCallback.push(failureCallback);
    return this;
  },
};

function newPromise(f) {
  f(resolve, reject);

  const promise = Object.create(PromiseMethods);
  return Object.assign(promise, {
    status: 'pending',
    successCallbacks: [],
    failureCallbacka: [],
  });

  function resolve(value) {
    promise.status = 'fulfilled';
    promise.successCallback(value);
  }

  function reject(value) {
    promise.status = 'rejected';
    promise.failureCallback(value);
  }
}

function waitThenPass(timeout, message) {
  return newPromise((resolve, reject) => {
    setTimeout(() => resolve(message), timeout);
  });
}

console.log(waitThenPass(3000, 'Hello')
  .then((message) => console.log(message)));
