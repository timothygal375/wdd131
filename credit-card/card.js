function isCardNumberValid(number) {
  return number === '1234123412341234';
}

function displayError(msg) {
  const errorEl = document.querySelector('.errorMsg');
  if (errorEl) {
    errorEl.innerText = msg;
  } else {
    console.warn("No .errorMsg element found.");
  }
}

function submitHandler(event) {
  event.preventDefault(); 
  displayError(''); 

  let errorMsg = '';

  const cardNum = event.target.querySelector('#cardNumber').value;
  if (isNaN(cardNum)) {
    errorMsg += 'Card number is not a valid number\n';
  } else if (!isCardNumberValid(cardNum)) {
    errorMsg += 'Card number is not a valid card number\n';
  }

  const month = parseInt(event.target.querySelector('#expMonth').value, 10);
  const year = parseInt(event.target.querySelector('#expYear').value, 10);

  if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
    errorMsg += 'Expiration date is invalid\n';
  } else {
    const expDate = new Date(2000 + year, month); 
    const currentDate = new Date();
    if (expDate <= currentDate) {
      errorMsg += 'Card has already expired\n';
    }
  }

  if (errorMsg !== '') {
    displayError(errorMsg);
    return false;
  }

  alert('Payment submitted successfully!');
  return true;
}

document.querySelector('#paymentForm').addEventListener('submit', submitHandler);
