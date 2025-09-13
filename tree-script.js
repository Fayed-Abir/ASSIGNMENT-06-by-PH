// Responsive + spinner

const showSpinner = () => {
  const spinner = document.getElementById("loading-spinner");
  if (!spinner) return;
  spinner.classList.remove("hidden");
  spinner.classList.add("flex");
};



const hideSpinner = () => {
  const spinner = document.getElementById("loading-spinner") ;
  if (!spinner) return;
  spinner.classList.add("hidden");
  spinner.classList.remove("flex");

};


const loadAllPlants = () => {
  showSpinner();
  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(json => {
      displayCategoryPlant(json.plants);
      hideSpinner();
    })
    .catch(() => hideSpinner());
};

const loadCategories = () => {
  showSpinner();
  fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(json => {
      displayCategories(json.categories);
      hideSpinner();
    })
    .catch(() => hideSpinner());
};

const loadDetailModal = async (id) => {
  showSpinner();
  try {
    const url = `https://openapi.programming-hero.com/api/plant/${id}` ;
    const res = await fetch(url);
    const details = await res.json();
    displayDetailModal(details.plants);
  } catch (e) {
    console.error(e);
  } finally {
    hideSpinner();
  }
};

const displayDetailModal = (plant) => {
  const detailsBox = document.getElementById("details-container");
  if (!detailsBox) return;
  detailsBox.innerHTML = `
     <h3 class="text-lg font-bold">${plant.name}</h3>
    <img src="${plant.image}" alt="${plant.name}" class="my-3 mx-auto h-[26vh] w-full object-cover rounded-lg">
    <p class="py-2 text-[1rem]"><span class="font-bold text-[1rem]">Category: </span>${plant.category}</p>
    <p class="py-2 text-[1rem]"><span class="font-bold text-[1rem]">Price: </span>৳${plant.price}</p>
    <p class="py-2 text-[1rem]"><span class="font-bold text-[1rem]">Description: </span>${plant.description}</p>
    <div class="modal-action flex justify-end">
      <form method="dialog" class="mt-2">
        <button class="btn flex justify-end hover:bg-gray-200 hover:cursor-pointer px-2 py-1 shadow-sm border-1 border-gray-200 rounded-lg">Close</button>
      </form>
    </div>
  `;


 const dialog = document.getElementById("my_modal_5");
  if (dialog && typeof dialog.showModal === "function")  {
    dialog.showModal();
  }


};

const loadCategoryPlant = (id, selectedButton) => {
  categoryShade(selectedButton);
  showSpinner();
const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(json => {
      displayCategoryPlant(json.plants);
      hideSpinner();
    })

    .catch(() => hideSpinner());
};



const categoryShade = (selectedButton) => {
   const BtnAllSelected = document.querySelectorAll(".category-btn");
    BtnAllSelected.forEach(btn => btn.classList.remove("bg-[#15803D]", "text-white"));
 if (selectedButton) selectedButton.classList.add("bg-[#15803D]", "text-white");
};
  


const displayCategoryPlant = (plants) => {
    const cardContainer = document.getElementById("card-container");
    if (!cardContainer) return;
    cardContainer.innerHTML = "";

      plants.forEach(plant => {
      const card = document.createElement("div");
      card.innerHTML = `
         <div id="card-${plant.id}" class="flex flex-col p-4 gap-2 bg-white shadow-sm rounded-lg h-full">
            <img src="${plant.image}" alt="${plant.name}" class="w-full h-52 object-cover rounded-md">
        <button class="hover:cursor-pointer text-start" onclick="loadDetailModal(${plant.id})"><h2 class="text-[14px] font-semibold">${plant.name}</h2></button>
        <p class="text-[12px] max-h-[3.5rem] overflow-hidden">${plant.description}</p>
        <div class="flex flex-row justify-between items-center">
          <button class="bg-[#bffad4] text-green-800 font-semibold rounded-3xl px-3 py-1 text-center">${plant.category}</button>
          <p class="text-green-800 font-bold">৳${plant.price}</p>
        </div>

        <button class="bg-[#15803D] mx-auto text-white w-full py-1 rounded-3xl hover:bg-[#2ccf68] hover:cursor-pointer" onclick="addToCart('${plant.name}','${plant.price}')">Add to Cart</button>
      </div>
    `;

       cardContainer.append(card)
  });
};

let totalPrice = 0;

const updateTotalPrice = () => {
  const totalDiv = document.getElementById("cart-total");
  if (!totalDiv) return;
  if (totalPrice > 0) {
    totalDiv.innerHTML = `<p>Total: ৳${totalPrice}</p>`;
  } else {
    totalDiv.innerHTML = "";
  }
};

const addToCart = (name, price) => {
     alert(`${name} has been added to the cart.`);
  const cartItems = document.getElementById("cart-items");
  if (!cartItems) return;

  const itemDiv = document.createElement("div");
  itemDiv.id = name;
  itemDiv.className = "flex justify-between items-center mb-2";
  itemDiv.innerHTML = `
    <p class="text-[.875rem] font-semibold">${name}</p>
    <div class="flex gap-2 items-center">
      <p class="text-[.875rem]">৳${price}</p>
      <button onclick="removeFromCart('${name}', ${price})" class="text-red-600 font-bold">x</button>
    </div>
  `;

  cartItems.appendChild(itemDiv);
  let addPrice = Number(price);
  totalPrice += addPrice;
  updateTotalPrice();
}

const removeFromCart = (name, price) => {
  const itemDiv = document.getElementById(name);
  if (itemDiv) {
  itemDiv.remove();
  totalPrice -= price;
    updateTotalPrice();
  }
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  if (!categoryContainer) return;
  categoryContainer.innerHTML = "";

    for (let category of categories) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `<button onclick="loadCategoryPlant(${category.id},this)" class="category-btn hover:bg-[#2ccf68] rounded-lg w-full text-left p-2 hover:cursor-pointer">${category.category_name}</button>`;

    categoryContainer.append(btnDiv);
  }
};



// For Mobile
document.getElementById('mobile-menu-btn')?.addEventListener('click', function () {
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileNav) mobileNav.classList.toggle('hidden');

}) ;


loadCategories();
loadAllPlants();
