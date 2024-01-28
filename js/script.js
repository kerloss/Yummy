///////////when refresh to close side navbar//////////
let width = $('#boxContent').width();
let left = $('#allBoxNavbar').css('left');

closeNavbar();

let searchContainer = document.getElementById("searchContainer");
///////////////to go to home page///////////////////
$('#homePage').on('click', function () {
    getMeals();
});
///////////////loader/////////////////
$(function () {
    $('#loading').fadeOut(1000, function () {
        $('body').css('overflow', 'auto');
    });
});

////////////////start section of side navbar///////////////
$('#navbarOpCl').on('click', function () {
    width = $('#boxContent').width();
    left = $('#allBoxNavbar').css('left');
    console.log(left);
    console.log(width);

    if (left == '0px') {     //while close side navbar
        closeNavbar();
    } else {                // while open side navbar
        openNavbar();
    };
});

///////////////function to close side navbar///////////////
function closeNavbar() {
    $('#allBoxNavbar').animate({ left: -width }, 1000);
    $('.links li').animate({ bottom: 300 }, 500);
    $('.open-close-icon').removeClass("fa-x");
    $('.open-close-icon').addClass("fa-align-justify");
};
///////////////function to open side navbar///////////////
function openNavbar() {
    $('#allBoxNavbar').animate({ left: 0 }, 1000);
    // $('.links li').animate({ bottom: 0 }, 1500);
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            bottom: 0
        }, (i + 5) * 200);
    };
    $('.open-close-icon').addClass("fa-x");
    $('.open-close-icon').removeClass("fa-align-justify");
};
/////////////////End section of side navbar////////////////
let rowData = document.getElementById('rowData');
////////////function to get meals at first time opening app/////////////
getMeals();
async function getMeals() {
    rowData.innerHTML = ``;
    searchContainer.innerHTML = "";
    $("#loading").fadeIn(500);

    let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    response = await response.json();

    displayMeals((response.meals));
    $("#loading").fadeOut(500);
};

////////////function of Display Meals/////////////////////
function displayMeals(meals) {
    var container = '';
    for (let i = 0; i < meals.length; i++) {
        container += `
        <div class="col-md-3">
            <div onclick="getMealDetails('${meals[i].idMeal}')"
            class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${meals[i].strMealThumb}"
                alt="" srcset="">
                    <div
                    class="meal-layer position-absolute d-flex justify-content-center align-items-center text-black p-2">
                        <h3>${meals[i].strMeal}</h3>
                    </div>
            </div>
        </div>
        `
    };
    rowData.innerHTML = container;
};
/////////////////function to get categories/////////////
async function getCategories() {
    closeNavbar();
    rowData.innerHTML = ``;
    $("#loading").fadeIn(500);
    searchContainer.innerHTML = "";

    let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    response = await response.json();

    displayCategories((response.categories));
    $("#loading").fadeOut(500);
};
//////////function to display categories////////////////
function displayCategories(categories) {
    let container = ``;
    for (let i = 0; i < categories.length; i++) {
        container += `
        <div class="col-md-3">
            <div onclick="getCategoryMeals('${categories[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${categories[i].strCategoryThumb}" alt="" srcset="">
                <div class="meal-layer position-absolute text-center text-black p-2">
                    <h3>${categories[i].strCategory}</h3>
                    <p>${categories[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
            </div>
        </div>
        `
    };
    rowData.innerHTML = container;
};

////////////function of get category Meal///////////////
async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    $("#loading").fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()

    displayMeals(response.meals.slice(0, 20))
    $("#loading").fadeOut(500)
};
///////////////function to get Area//////////////////
async function getArea() {
    rowData.innerHTML = '';
    searchContainer.innerHTML = '';
    $("#loading").fadeIn(500);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    response = await response.json();
    console.log(response);

    closeNavbar();
    displayArea(response.meals);
    $("#loading").fadeOut(500);
};
///////////////function to display Area//////////////
function displayArea(area) {
    let container = '';
    for (let i = 0; i < area.length; i++) {
        container += `
        <div class="col-md-3">
            <div onclick="getAreaMeals('${area[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${area[i].strArea}</h3>
            </div>
        </div>
        `
    }
    rowData.innerHTML = container;
};
/////////////function to get Ingredients//////////////
async function getIngredients() {
    rowData.innerHTML = '';
    searchContainer.innerHTML = '';
    $("#loading").fadeIn(500);

    let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    response = await response.json();

    closeNavbar();
    displayIngredients(response.meals);
    $("#loading").fadeOut(500);
};
///////////function to display ingredients/////////////
function displayIngredients(ingredient) {
    let container = '';
    for (let i = 0; i < 21; i++) {
        container += `
        <div class="col-md-3">
            <div onclick="getIngredientsMeals('${ingredient[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${ingredient[i].strIngredient}</h3>
                    <p>${ingredient[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
        </div>
        `
    };
    rowData.innerHTML = container;
};
//////////function to get Area meals///////////////
async function getAreaMeals(area) {
    rowData.innerHTML = "";
    $("#loading").fadeIn(500);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    response = await response.json();

    displayMeals(response.meals.slice(0, 20));
    $("#loading").fadeOut(500);
};
///////////function to get ingredients meals/////////
async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = "";
    $("#loading").fadeIn(500);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    response = await response.json();

    displayMeals(response.meals);
    $("#loading").fadeOut(500);
};
/////////////function to get meal details//////////////
async function getMealDetails(mealID) {
    closeNavbar();
    rowData.innerHTML = "";
    $("#loading").fadeIn(500);

    // searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    response = await response.json();

    displayMealDetails(response.meals[0]);
    $("#loading").fadeOut(500);
};
/////////////fuction to get meals details//////////////
function displayMealDetails(meal) {
    searchContainer.innerHTML = "";

    let ingredients = ``;
    for (let i = 0; i < 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        };
    };

    let tags = meal.strTags?.split(",");  //optinal split if found
    // let tags = meal.strTags.split(",")
    if (!tags) tags = [];

    let tagsStr = '';
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    };

    let container = `
        <div class="col-md-4">
            <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
            <h2>${meal.strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
            <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
            <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
            <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${ingredients}
            </ul>
            <h3>Tags :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${tagsStr}
            </ul>

            <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
        </div>`

    rowData.innerHTML = container;
};
////////////////////function to show search inputs///////////////////
function showSearchInputs() {
    closeNavbar();
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-info" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-info" type="text" placeholder="Search By First Letter">
        </div>
    </div>`
    rowData.innerHTML = "";
};
//////////////////function to search by name///////////////
async function searchByName(name) {
    closeNavbar();
    rowData.innerHTML = "";
    $("#loading").fadeIn(100);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    response = await response.json()

    if (response.meals) {
        displayMeals(response.meals);
    } else {
        displayMeals([]);
    };
    // response.meals ? displayMeals(response.meals) : displayMeals([])
    $("#loading").fadeOut(100);
};
////////////function to search by first letter///////////
async function searchByFirstLetter(letter) {
    rowData.innerHTML = "";
    $("#loading").fadeIn(200);

    if (letter == "") {
        letter = "a";
    } else {
        "";
    };
    // letter == "" ? letter = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    response = await response.json();

    if (response.meals) {
        displayMeals(response.meals);
    } else {
        displayMeals([]);
    };
    // response.meals? displayMeals(response.meals) : displayMeals([])
    $("#loading").fadeOut(200);
};
//////////////////////////////////////////////////////////
let submitBtn;

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;
//////////////function to show contact us//////////////
function showContacts() {
    closeNavbar();
    rowData.innerHTML = `
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
            <div class="row g-4">
                <div class="col-md-6">
                    <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Special characters and numbers not allowed
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Email not valid hint: exemple@ggggg.com
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid Phone Number 01*******75
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid age from 10 years to 99
                    </div>
                </div>
                <div class="col-md-6">
                    <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid password contain at least one capital letter and one number
                    </div>
                </div>
                <div class="col-md-6">
                    <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid repassword similar to the password
                    </div>
                </div>
            </div>
            <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
    </div> `
    submitBtn = document.getElementById("submitBtn")

    $("#nameInput").on("focus", function () {
        nameInputTouched = true;
    });

    $("#emailInput").on("focus", function () {
        emailInputTouched = true;
    });

    $("#phoneInput").on("focus", function () {
        phoneInputTouched = true;
    });

    $("#ageInput").on("focus", function () {
        ageInputTouched = true;
    });

    $("#passwordInput").on("focus", function () {
        passwordInputTouched = true;
    });

    $("#repasswordInput").on("focus", function () {
        repasswordInputTouched = true;
    });
}
//////////////function to name validation//////////////////
function nameValidation() {
    const nameRegex = /^[a-zA-Z]{4,}$/;
    const nameInput = document.getElementById('nameInput');
    return nameRegex.test(nameInput.value);
};
/////////////function to email validation//////////////
function emailValidation() {
    const emailRegex = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const emailInput = document.getElementById('emailInput');
    return emailRegex.test(emailInput.value);
};
/////////////function to phone validation 01210810875//////////////
function phoneValidation() {
    const phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;
    const phoneInput = document.getElementById('phoneInput');
    return phoneRegex.test(phoneInput.value);
};
/////////////function to age validation from 10 to 99 years//////////////
function ageValidation() {
    const ageRegex = /^(1[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    const ageInput = document.getElementById('ageInput');
    return ageRegex.test(ageInput.value);
};
////////function to check password must be contain at least one capital letter and one number//////
function passwordValidation() {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const passwordInput = document.getElementById('passwordInput');
    return passwordRegex.test(passwordInput.value);
};
/////////////function to repassword validation//////////////
function repasswordValidation() {
    const repasswordInput = document.getElementById("repasswordInput");
    const passwordInput = document.getElementById("passwordInput");
    return repasswordInput.value == passwordInput.value;
};
/////////////function to validate inputs///////////////
function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            $("#nameAlert").removeClass("d-block").addClass("d-none");
        } else {
            $("#nameAlert").removeClass("d-none").addClass("d-block");
        };
    };

    if (emailInputTouched) {
        if (emailValidation()) {
            $('#emailAlert').removeClass("d-block").addClass("d-none");
        } else {
            $('#emailAlert').removeClass("d-none").addClass("d-block");
        };
    };

    if (phoneInputTouched) {
        if (phoneValidation()) {
            $('#phoneAlert').removeClass("d-block").addClass("d-none");
        } else {
            $('#phoneAlert').removeClass("d-none").addClass("d-block");
        };
    };

    if (ageInputTouched) {
        if (ageValidation()) {
            $('#ageAlert').removeClass("d-block").addClass("d-none");
        } else {
            $('#ageAlert').removeClass("d-none").addClass("d-block");
        };
    };

    if (passwordInputTouched) {
        if (passwordValidation()) {
            $('#passwordAlert').removeClass("d-block").addClass("d-none");
        } else {
            $('#passwordAlert').removeClass("d-none").addClass("d-block");
        };
    };

    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            $("#repasswordAlert").removeClass("d-block").addClass("d-none");
        } else {
            $("#repasswordAlert").removeClass("d-none").addClass("d-block");
        };
    };

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