const products = [
  {
    name: "twixx",
    price: 2200,
    description: "Candy",
    type: "chocolate",
    image:"https://pbs.twimg.com/profile_images/1219344620405981185/2juY3NZ3_400x400.jpg",
  },
  {
    name: "snickers",
    price: 2500,
    description: "Candy",
    type: "chocolate",
    image:"https://www.snickers.com/sites/g/files/fnmzdf616/files/migrate-product-files/dryeqrv2efldaaoyceat.png",
  },
  {
    name: "haribo",
    price: 5500,
    description: "Candy",
    type: "gummy",
    image:"https://assets.haribo.com/image/upload/s--drEjHlju--/ar_2700:3722,c_fill,f_auto,q_60/w_730/v1/consumer-sites/en-us/Products/Haribo-US-Goldbears-5-oz.png",
  },
  {
    name: "",
    price: 550,
    description: "Candy",
    type: "gummy",
    image:
      "https://thumbs.dreamstime.com/b/colorful-candy-background-8939634.jpg",
  },
  {
    name: "candyFive",
    price: 3200,
    description: "Candy",
    type: "chocolate",
    image:
      "https://thumbs.dreamstime.com/b/colorful-candy-background-8939634.jpg",
  },
];

function PrintProducts() {
  const productsContainer = document.getElementById("products");
  let newDiv = "";

  for (let i = 0; i < products.length; i++) {
    const product = products[i];


    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img class='productImage' src="${product.image}"
      <h3 class="title">${product.name}</h3>
      <p>${product.description}</p>
      <p id="price">${product.price}</p>
      <button onclick="AddItem('${product.name}')">add</button>
      <button onclick="MinusItem('${product.name}')">minus</button>
    `;

    newDiv += div.outerHTML;
  }

  productsContainer.innerHTML = newDiv;
}

window.onload = PrintProducts;

const userbasket = [];

function AddItem(itemName) {
  const itemIndex = userbasket.findIndex((item) => item.name === itemName);

  if (itemIndex !== -1) {
    userbasket[itemIndex].quantity += 1;
  } else {
    userbasket.push({ name: itemName, quantity: 1 });
  }

  Basket();
}

function MinusItem(itemName) {
  const itemIndex = userbasket.findIndex((item) => item.name === itemName);

  if (itemIndex !== -1) {
    userbasket[itemIndex].quantity -= 1;

    if (userbasket[itemIndex].quantity === 0) {
      userbasket.splice(itemIndex, 1);
    }
  }

  Basket();
}

function Purchase() {
  let total = 0;
  for (let i = 0; i < userbasket.length; i++) {
    const { name, quantity } = userbasket[i];
    const product = products.find((p) => p.name === name);
    if (product) {
      total += product.price * quantity;
    }
  }

  document.getElementById("total").innerHTML = total;
  Clear();
}

function Clear() {
  userbasket = [];
}

function Basket() {
  const basketDiv = document.getElementById("basket");
  const basketHtml = userbasket
    .map(
      ({ name, quantity }) => `
    <h1>${name} - ${quantity}</h1>
  `
    )
    .join("");
  basketDiv.innerHTML = basketHtml;
}
