document.querySelector('#loan-form').addEventListener('submit', function (e) {
  // Hide Results
  document.querySelector('#results').style.display = 'none';
  // Show loader
  document.querySelector('#loading').style.display = 'block';

  setTimeout(calculateResult, 2000);

  e.preventDefault();
});

// Calculate Result
function calculateResult() {

  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payments
  const X = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * X * calculatedInterest) / (X - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // Show results
    document.querySelector('#results').style.display = 'block';
    // Hide Loader
    document.querySelector('#loading').style.display = 'none';
  } else {
    showError('Check your input');
  }
};

// Shoe Error Message 
function showError(error) {
  // Show results
  document.querySelector('#results').style.display = 'none';
  // Hide Loader
  document.querySelector('#loading').style.display = 'none';
  const erorrDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  erorrDiv.className = 'alert alert-danger';
  erorrDiv.appendChild(document.createTextNode(error));

  card.insertBefore(erorrDiv, heading);
  console.log(erorrDiv);
  setTimeout(clearError, 3000);
};

function clearError() {
  document.querySelector('.alert').remove();
};