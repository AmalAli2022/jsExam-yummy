const openCloseMenu = document.querySelector(".open-close-icon");
const navbar = document.querySelector(".nav-tab")
const categoryLink= "https://www.themealdb.com/api/json/v1/1/categories.php";

const mainContent=document.getElementById("data");
const category = document.getElementById("category");
const search = document.getElementById("search");
const searcharea = document.getElementById("searcharea");
const area = document.getElementById("area");
const ingredient = document.getElementById("ingredient");
const contactlink = document.getElementById("contactLink");
const contact =document.getElementById("contact");



function closeSidebar(){
    let sidebarWidth = $('.nav-tab').outerWidth();
    $('.side-nav-menu').animate({left:- sidebarWidth},500);

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
}

function openSidebar(){
    $('.side-nav-menu').animate({left:- sidebarWidth},500);

    $(".open-close-icon").addClass("fa-align-justify fa-x");
    $(".open-close-icon").removeClass("open-close-icon");
}



async function getCategorie(){
    const response = await fetch(categoryLink);
    const data = await response.json();
    displayCategories(data.categories);
}

function displayCategories(data){
    let card ="";
    contact.innerHTML="";
    mainContent.innerHTML="";
    searcharea.innerHTML= "";
    for(let i=0;i< data.length;i++){
        card +=` <div class="col-md-3"> 
        <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer" onclick="getCategoryMeal('${data[i].strCategory}');">
            <img class="w-100" src="${data[i].strCategoryThumb}" alt="image">
            <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>${data[i].strCategory}</h3>
                <p>${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>
    </div>`
    }

    mainContent.innerHTML=card;
    
}

async function getCategoryMeal(catName){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`);
    const data = await response.json();
    displayCategoryMeal(data.meals.slice(0, 20))
     console.log(data.meals.slice(0, 20))
}

function displayCategoryMeal(data){
    let card ="";
    contact.innerHTML="";
    mainContent.innerHTML="";
    searcharea.innerHTML= "";
    for(let i=0;i< data.length;i++){
        card +=` <div class="col-md-3"> 
        <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer" onclick="getMeal(${data[i].idMeal});">
            <img class="w-100" src="${data[i].strMealThumb}" alt="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>${data[i].strMeal}</h3>
            </div>
        </div>
    </div>`
    }

    mainContent.innerHTML=card;
    
}


async function getMeal(id){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    displayMealDetails(data.meals[0])
}

function displayMealDetails(Mealdata){
    console.log(Mealdata);
    let card ="";
    contact.innerHTML="";
    mainContent.innerHTML="";
    searcharea.innerHTML= "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (Mealdata[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${Mealdata[`strMeasure${i}`]} ${Mealdata[`strIngredient${i}`]}</li>`
        }
    }


    let tags = Mealdata.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }


        card +=` <div class="col-md-4"> 
            <img class="w-100" src="${Mealdata.strMealThumb}" alt="">
                <h3>${Mealdata.strMeal}</h3>
            </div>

            <div class="col-md-8"> 
            <h2>Instructions</h2>
            <p> ${Mealdata.strInstructions}<p>
            <h3> <span class="fw-bolder"> Area :  </span>${Mealdata.strArea} </h3>
            <h3> <span class="fw-bolder">Category : </span> ${Mealdata.strCategory} </h3>
            <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredients}
            </ul>

        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${tagsStr}
        </ul>

        <a target="_blank" href="${Mealdata.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${Mealdata.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`


    mainContent.innerHTML=card;

    console.log('xxxxxxxxx ' + card)
}


async function searchMealByName(MealName){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${MealName}`);
    const data = await response.json();
    console.log(data.meals);
    displayCategoryMeal(data.meals)
}

async function searchMealFirstLetter(MealName){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${MealName}`);
    const data = await response.json();
    console.log(data.meals);
    displayCategoryMeal(data.meals)
}

async function getArea(){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const data = await response.json();
    displayArea(data.meals);
}

function displayArea(data) {
    let card = "";
    contact.innerHTML="";
    mainContent.innerHTML="";
    searcharea.innerHTML= "";
    for (let i = 0; i < data.length; i++) {
        card += `
        <div class="col-md-3 py-3">
                <div onclick="getAreaMeals('${data[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${data[i].strArea}</h3>
                </div>
        </div>
        `
    }
    mainContent.innerHTML = card
}


async function getAreaMeals(AreaName){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${AreaName}`);
    const data = await response.json();
    displayCategoryMeal(data.meals);
}


async function getIngredient(){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    const data = await response.json();
    console.log(data.meals);
    displayIngredient(data.meals.slice(0, 20));
}

function displayIngredient(data) {
    let card = "";
    contact.innerHTML="";
    mainContent.innerHTML="";
    searcharea.innerHTML= "";
    for (let i = 0; i < data.length; i++) {
        card += `
        <div class="col-md-3 py-3">
                <div class="rounded-2 text-center cursor-pointer" onclick="getIngredientData('${data[i].strIngredient}')" > 
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${data[i].strIngredient}</h3>
                        <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }
    mainContent.innerHTML = card
}

async function getIngredientData(meals){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${meals}`);
    const data = await response.json();
    console.log(data.meals);
    displayCategoryMeal(data.meals);
}


function getContactInput(){
    contact.innerHTML="";
    mainContent.innerHTML="";
    searcharea.innerHTML= "";
    let input =`
    <div class="row g-4">
    <div class="col-md-6 "> 
    <input type="text" id="nameInput" class="form-control bg-white text-black bg-white" placeholder="Enter Your Name" onkeyup="inputsValidation()"> 
    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
    Special characters and numbers not allowed
    </div>
    </div>
    <div class="col-md-6 "> 
    <input type="text" id="emailInput" class="form-control bg-white text-black" placeholder="Enter Your Email" onkeyup="inputsValidation()"> 
    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
        Email not valid *exemple@yyy.zzz
    </div>
    </div>
    <div class="col-md-6 "> 
    <input type="text" id="phoneInput" class="form-control bg-white text-black" placeholder="Enter Your Phone" onkeyup="inputsValidation()"> 
    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
        Enter valid Phone Number
    </div>
    </div>
    <div class="col-md-6 ">
    <input type="text" id="ageInput" class="form-control bg-white text-black" placeholder="Enter Your Age" onkeyup="inputsValidation()"> 
    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
        Enter valid age
    </div>
    </div>
    <div class="col-md-6 "> 
    <input type="password" id="passwordInput" class="form-control bg-white text-black" placeholder="Enter Your Password" onkeyup="inputsValidation()"> 
    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
        Enter valid password *Minimum eight characters, at least one letter and one number:*
    </div>
    </div>
    <div class="col-md-6 ">
    <input type="password" id="repasswordInput" class="form-control bg-white text-black" placeholder="Repassword" onkeyup="inputsValidation()"> 
    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
        Enter valid repassword 
    </div>
    </div>
    </div>
    <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    `
    contact.innerHTML= input;
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInput = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInput = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInput = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInput = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInput = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInput = true
    })
}

let nameInput = false;
let emailInput = false;
let phoneInput = false;
let ageInput = false;
let passwordInput = false;
let repasswordInput = false;




function inputsValidation() {
    if (nameInput) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInput) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInput) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInput) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInput) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInput) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}

window.addEventListener("load",function(){
    searchMealByName("");
})

category.addEventListener("click",function(){
    getCategorie();
    closeSidebar();
})

search.addEventListener("click",function(){
    let input ="";
    contact.innerHTML="";
    mainContent.innerHTML="";
    searcharea.innerHTML= "";
    input = `
    <div class="col-md-6 py-5"> 
    <input type="text" class="form-control bg-transparent text-white" placeholder="Search By Name" onkeyup="searchMealByName(this.value)"> 
    </div>
    <div class="col-md-6 py-5"> 
    <input type="text" class="form-control bg-transparent text-white" placeholder="Search By First Letter" onkeyup="searchMealFirstLetter(this.value)" maxlength="1"> 
    </div>
    `
    console.log(this.value);
    searcharea.innerHTML= input;
})

area.addEventListener("click", function(){
    getArea();
    closeSidebar();
})

ingredient.addEventListener("click", function(){
    getIngredient();
    closeSidebar();
})


contactlink.addEventListener("click", function(){
    getContactInput();
    closeSidebar();
})

