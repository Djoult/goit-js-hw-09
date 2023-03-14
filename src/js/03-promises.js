import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayValue = document.querySelector('input[name=delay]');
const stepValue = document.querySelector('input[name=step]');
const amountValue = document.querySelector('input[name=amount]');
form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();
  let delay = parseInt(delayValue.value);
  const step = parseInt(stepValue.value);
  const amount = parseInt(amountValue.value);
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(result => Notiflix.Notify.success(result))
      .catch(error => Notiflix.Notify.failure(error));
    delay += step;
  }
  // form.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
}
