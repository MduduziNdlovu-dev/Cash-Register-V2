const addToCartBtns = document.querySelectorAll('.add-to-cart');
const paymentInput = document.getElementById('payment');
const payBtn = document.getElementById('pay-btn');
const receiptItems = document.getElementById('receipt-items');
const totalCostDisplay = document.getElementById('total-cost');
const receiptContent = document.getElementById('receipt-content');
const changeDueDisplay = document.getElementById('change-due');
const receiptSection = document.querySelector('.receipt-section');

let cart = [];
let totalCost = 0;

addToCartBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const itemName = btn.parentElement.querySelector('h3').innerText;
    const price = parseFloat(btn.parentElement.getAttribute('data-price'));
    
    // Add item to cart
    cart.push({ itemName, price });
    totalCost += price;
    
    // Update the cart and total cost display
    updateReceipt();
    
    // Visual feedback for selected item
    btn.parentElement.classList.add('selected');
  });
});

payBtn.addEventListener('click', () => {
  const payment = parseFloat(paymentInput.value);
  if (payment >= totalCost) {
    const change = payment - totalCost;
    showReceipt(change);
  } else {
    alert('Not enough money!');
  }
});

function updateReceipt() {
  // Show cart items
  receiptItems.innerHTML = cart
    .map(
      ({ itemName, price }) =>
        `<p>Item: ${itemName} - R{price.toFixed(2)}</p>`
    )
    .join('');
  
  // Update total cost
  totalCostDisplay.innerHTML = `Total Cost: R${totalCost.toFixed(2)}`;
}

function showReceipt(change) {
  // Show the purchased items in the receipt
  const itemsBought = cart
    .map(
      ({ itemName, price }) =>
        `<p><strong>${itemName}</strong>: R${price.toFixed(2)}</p>`
    )
    .join('');
  
  receiptContent.innerHTML = itemsBought;
  
  // Show the total cost and the change
  changeDueDisplay.innerHTML = `Change Due: R${change.toFixed(2)}`;
  
  // Display the receipt section
  receiptSection.style.display = 'block';
}
