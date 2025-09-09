console.log("JS is Working")

const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(json => displayCategories(json.categories));

}

const displayCategories = (categories) => {
    // 1. Get the container & Empty that
    const categoryContainer = document.getElementById("category-container");
    categoryContainer.innerHTML = "";
   
    // 2. Get into Every Lessons
    for(let category of categories){
        // 3. Create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `<button class="hover:bg-[#2ccf68] rounded-lg w-full text-left p-2">${category.category_name}</button>`

    // 4. append into container
       categoryContainer.append(btnDiv);
    }


}



loadCategories();