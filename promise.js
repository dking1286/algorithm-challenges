const EventEmitter = require('events');


function createPromise(asyncFunction) {
  const promise = Object.assign(new EventEmitter(), PromiseSkeleton);

  asyncFunction(createResolve(promise), createReject(promise));

  return promise;
}


const PromiseSkeleton = {
  status: 'pending',
  successCallback: () => { },
  failureCallback: () => { },

  then(successCallback) {
    this.successCallback = successCallback;

    return createPromise((resolve, reject) => {
      this.on('resolve', (value) => {
        const next = this.successCallback(value);

        if (!isPromise(next)) resolve(next);
        else next.on('resolve', (value) => resolve(value));
      });
    });
  },

  catch(failureCallback) {
    
  },
};


const createResolve = (promise) => (value) => {
  promise.emit('resolve', value);
  promise.status = 'fulfilled';
};


const createReject = (promise) => (value) => {
  promise.emit('reject', value);
  promise.status = 'rejected';
};


function isPromise(obj) {
  return (
    obj                    &&
    obj.then !== undefined &&
    obj.catch !== undefined
  );
}


module.exports = {
  createPromise,
}

