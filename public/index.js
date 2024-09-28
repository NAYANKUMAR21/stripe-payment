const checkout = document.querySelector('#checkout');

checkout.addEventListener('click', async () => {
  try {
    const response = await fetch('http://localhost:8080/checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            id: 1,
            quantity: 3,
          },
          {
            id: 2,
            quantity: 1,
          },
        ],
      }),
    });
    if (response.ok) {
      const { url } = await response.json();
      window.location = url;
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

// Example of updating displayed prices (if applicable)
function updatePriceDisplay(price) {
  return `₹${price.toFixed(2)}`;
}

// Use this function when displaying prices to the user
