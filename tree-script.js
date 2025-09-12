const loadAllPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(json => displayCategoryPlant(json.plants))
}



const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(json => displayCategories(json.categories));

}

const loadDetailModal = async(id)=>{
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
     
    const res = await fetch(url);
    const details = await res.json();
   displayDetailModal(details.plants);
   
}

const displayDetailModal =(plant)=>{
   console.log(plant);
   const detailsBox = document.getElementById("details-container");
   detailsBox.innerHTML = `
        <h3 class="text-lg font-bold">${plant.name}</h3>
             <img src="${plant.image}" alt="${plant.name}" class=" my-3 mx-auto h-[26vh] w-full object-cover rounded-lg">
              <p class="py-2 text-[1rem] "><span class="font-bold text-[1rem]">Category: </span>${plant.category}</p>
             <p class="py-2  text-[1rem]"><span class="font-bold text-[1rem]">Price: </span>৳${plant.price}</p>
             <p class="py-2  text-[1rem]"><span class="font-bold text-[1rem]">Description: </span>${plant.description}</p>
             <div class="modal-action flex justify-end">
               <form method="dialog" class="mt-2">
                
                 <button class="btn flex justify-end hover:bg-gray-200 hover:cursor-pointer px-2 py-1 shadow-sm border-1  border-gray-200 rounded-lg">Close</button>
               </form>
             </div>
   `
    document.getElementById("my_modal_5").showModal();
} 
const loadCategoryPlant = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then(json => displayCategoryPlant(json.plants) )
    
}

const displayCategoryPlant = (plants) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";


    plants.forEach(plant => {
        console.log(plant)
        const card = document.createElement("div")
        card.innerHTML = `
       <div id="card-${plant.id}" class="flex flex-col p-4  gap-2 bg-white shadow-sm rounded-lg">
              <img src="${plant.image}" alt="" class="md:w-[312px] h-52 mx-auto object-cover overflow-hidden">
              <button class="hover:cursor-pointer text-start" onclick="loadDetailModal(${plant.id})"><h2 class="text-[14px] font-semibold">${plant.name}</h2></button>
              <p class="text-[12px] max-h-[3.5rem] overflow-hidden">
                ${plant.description}
              </p>
                <div class="flex flex-row justify-between items-center">
                  <button class="bg-[#bffad4] text-green-800 font-semibold rounded-3xl px-3 py-1 text-center ">${plant.category}</button>
                  <p class="text-green-800 font-bold">৳${plant.price}</p>
                </div>
                <button class="bg-[#15803D] mx-auto text-white w-full py-1 rounded-3xl hover:bg-[#2ccf68] hover:cursor-pointer" onclick="addToCart('${plant.name}','${plant.price}')">Add to Cart</button>
          </div>
        `;
        cardContainer.append(card);
    });
}


let totalPrice = 0; // track total price

// Update total price display
const updateTotalPrice = () => {
  const totalDiv = document.getElementById("cart-total");

  if (totalPrice > 0) {
    totalDiv.innerHTML = `<p>Total: ৳${totalPrice}</p>`;
  } else {
    totalDiv.innerHTML = ""; // clear when no items
  }
};

// Add item to cart
const addToCart = (name, price) => {
  const cartItems = document.getElementById("cart-items");

  // Create item div
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
   let addPrice = Number(price)
  // Update total
  totalPrice += addPrice;
  updateTotalPrice();
};

// Remove item from cart
const removeFromCart = (name, price) => {
  const itemDiv = document.getElementById(name);
  if (itemDiv) {
    itemDiv.remove();
    totalPrice -= price;
    updateTotalPrice();
  }
};

const displayCategories = (categories) => {
    // 1. Get the container & Empty that
    const categoryContainer = document.getElementById("category-container");
    categoryContainer.innerHTML = "";
   
    // 2. Get into Every Lessons
    for(let category of categories){
        // 3. Create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `<button onclick="loadCategoryPlant(${category.id})" class="hover:bg-[#2ccf68] rounded-lg w-full text-left p-2 hover:cursor-pointer">${category.category_name}</button>`

    // 4. append into container
       categoryContainer.append(btnDiv);
    }


}


//  Modal Codes 
//   Open the modal using ID.showModal() method -->
{/* <button class="btn" onclick="my_modal_1.showModal()">${plant.name}</button>
<dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">${plant.name}</h3>
    <img src="${plant.image}"></img>
    <p class="py-2"><span class="font-bold">Category:</span>${plant.category_name}</p>
    <p class="py-2"><span class="font-bold">Price:</span>৳${plant.price}</p>
    <p class="py-2"><span class="font-bold">Description:</span>${plant.description}</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog> */}

loadCategories();
loadAllPlants()