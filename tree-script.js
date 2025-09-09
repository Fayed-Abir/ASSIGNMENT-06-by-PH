const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(json => displayCategories(json.categories));

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

//     category
// : 
// "Fruit Tree"
// description
// : 
// "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals."
// id
// : 
// 1
// image
// : 
// "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg"
// name
// : 
// "Mango Tree"
// price
// : 
// 500

    plants.forEach(plant => {
        console.log(plant)
        const card = document.createElement("div")
        card.innerHTML = `
       <div id="card" class="flex flex-col p-4 max-h-full gap-2 bg-white">
              <img src="${plant.image}" alt="" class="md:w-[312px] h-full mx-auto">
              <h2 class="text-[14px] font-semibold">${plant.name}</h2>
              <p class="text-[12px]">
                ${plant.description}
              </p>
                <div class="flex flex-row justify-between items-center">
                  <button class="bg-[#bffad4] text-green-800 font-semibold rounded-3xl px-3 py-1 text-center ">${plant.category}</button>
                  <p>৳${plant.price}</p>
                </div>
                <button class="bg-[#15803D] mx-auto text-white w-full py-1 rounded-3xl">Add to Cart</button>
          </div>
        `;
        cardContainer.append(card);
    });
}

const displayCategories = (categories) => {
    // 1. Get the container & Empty that
    const categoryContainer = document.getElementById("category-container");
    categoryContainer.innerHTML = "";
   
    // 2. Get into Every Lessons
    for(let category of categories){
        // 3. Create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `<button onclick="loadCategoryPlant(${category.id})" class="hover:bg-[#2ccf68] rounded-lg w-full text-left p-2">${category.category_name}</button>`

    // 4. append into container
       categoryContainer.append(btnDiv);
    }


}



loadCategories();