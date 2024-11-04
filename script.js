const cart = []
const totalElement = document.getElementById('total')
const cartItemsElement = document.querySelector('.cart-items')
const modal = document.getElementById('order-confirmation')
const orderSummaryElement = document.querySelector('.order-summary')
const orderTotalElement = document.getElementById('order-total')
const dessertList = document.querySelector('.dessert-list')

fetch('./data.json')
	.then((response) => {
		if (!response.ok) {
			throw new Error(`http Error ${response.status}`)
		}
		return response.json()
	})
	.then((data) => {
		console.log(data)
		dessertList.innerHTML = data
			.map(
				(dessert) => `
			<div class="dessert-item">
						<img
							src= ${dessert.image.desktop}
							alt= ${dessert.name}
						/>
						<p class="dessert-name">${dessert.name}</p>
						<p class="price">$${dessert.price}</p>
						<button class="add-to-cart">
						<i class="fas fa-cart-shopping">Add to Cart</i></button>
					</div>
			`
			)
			.join('')
	})

document.querySelectorAll('.add-to-cart').forEach((button, index) => {
	button.addEventListener('click', () => addToCart(index))
})

document
	.querySelector('.confirm-order')
	.addEventListener('click', showOrderConfirmation)
document
	.querySelector('.start-new-order')
	.addEventListener('click', startNewOrder)

function addToCart(index) {
	const dessertItem = document.querySelectorAll('.dessert-item')[index]
	const dessertName = dessertItem.querySelector('.dessert-name').innerText
	const price = parseFloat(
		dessertItem.querySelector('.price').innerText.replace('$', '')
	)

	const existingItem = cart.find((item) => item.name === dessertName)
	if (existingItem) {
		existingItem.quantity += 1
	} else {
		cart.push({ name: dessertName, price, quantity: 1 })
	}
	function updateCart() {
		cartItemsElement.innerHTML = ''
		let total = 0
		cart.forEach((item) => {
			const cartItemElement = document.createElement('li')
			cartItemElement.innerText = `${item.name} x${item.quantity} - $${(
				item.price * item.quantity
			).toFixed(2)}`
			cartItemsElement.appendChild(cartItemElement)
			total += item.price * item.quantity
		})
		totalElement.innerText = total.toFixed(2)
	}
}

function showOrderConfirmation() {
	orderSummaryElement.innerHTML = ''
	let ordertotal = 0

	cart.forEach((item) => {
		const orderItem = document.createElement('li')
		orderItem.innerText = `${item.name} x${item.quantity} - $${(
			item.price * item.quantity
		).toFixed(2)}`
		orderSummaryElement.appendChild(orderItem)

		ordertotal += item.price * item.quantity
	})

	orderTotalElement.innerText = ordertotal.toFixed(2)
	modal.classList.remove('hidden')
}
function startNewOrder() {
	cart.length = 0 // Clear the cart array
	updateCart()
	modal.classList.add('hidden')
}
