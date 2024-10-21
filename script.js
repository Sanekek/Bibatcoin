const overlay = document.getElementById('popupOverlay');
const registrationBox = document.getElementById('registrationBox');
const profileBox = document.getElementById('profileBox');
const accountName = document.getElementById('accountName');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('passwordConfirm');
const profileInfoName = document.getElementById('profileInfoName');
const profileInfoEmail = document.getElementById('profileInfoEmail');
const priceText = document.getElementById('priceText');
const priceDifferenceText = document.getElementById('priceDifferenceText');
const priceTextNarrow = document.getElementById('priceTextNarrow');
const priceDifferenceTextNarrow = document.getElementById('priceDifferenceTextNarrow');
const propaganda = document.getElementById('propaganda');

let isLoggedIn = localStorage.getItem("isLoggedIn");

UpdateInterface();
function UpdateInterface(){
    if(isLoggedIn == "true"){
        accountName.textContent = localStorage.getItem("name");
        propaganda.textContent="Продовжити тапати"
        profileInfoName.textContent = localStorage.getItem("name");
        profileInfoEmail.textContent = localStorage.getItem("email");
    }
}

// price texts
getCurrentPrice();
async function getCurrentPrice() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        const price = data.bitcoin.usd;
        console.log(`current Bitcoin price: ` + price);
        localStorage.setItem('price', price);
    } catch (error) {
        console.error('Error fetching current Bitcoin price:', error);
    }
    priceText.textContent = "$" + localStorage.getItem('price')/1000000;
    priceTextNarrow.textContent = "$" + localStorage.getItem('price')/1000000;
}
const today = new Date();
const sevenDaysAgo = new Date(today);
sevenDaysAgo.setDate(today.getDate() - 7);
const apiUrl = `https://api.coingecko.com/api/v3/coins/bitcoin/history?date=${sevenDaysAgo.getUTCDate()}-${sevenDaysAgo.getUTCMonth() + 1}-${sevenDaysAgo.getUTCFullYear()}`;

getPriceDifference();
async function getPriceDifference() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      const oldPrice = data.market_data.current_price.usd;
      console.log(`Bitcoin price 7 days ago: ` + oldPrice);
      localStorage.setItem('oldPrice', oldPrice);
    } catch (error) {
      console.error('Error fetching Bitcoin price 7 days ago:', error);
    }
    const a = localStorage.getItem('price');
    const b = localStorage.getItem('oldPrice');
    let result = Math.round((a/b-1) * 100 * 100) / 100;
    if(result >= 0){
        priceDifferenceText.textContent = "▴" + result + "%";
        priceDifferenceTextNarrow.textContent = "▴" + result + "% (7d)";
    } else {
        priceDifferenceText.textContent = "▾" + Math.abs(result) + "%";
        priceDifferenceText.style.color = "red";
        priceDifferenceTextNarrow.textContent = "▾" + Math.abs(result) + "% (7d)";
        priceDifferenceTextNarrow.style.color = "red";
    }
  }

//  registration stuff

function AccountCheck(){
    overlay.classList.remove("unshow");
    overlay.classList.add("show");

    isLoggedIn = localStorage.getItem("isLoggedIn");
    if(isLoggedIn == "true"){
        PopupProfile();
    } else {
        PopupRegistration();
     }
}
function PopupRegistration() {
    document.body.style.overflow = "hidden";
    registrationBox.style.display = "block";
    profileBox.style.display = "none";
    registrationBox.classList.remove("popup-fade-out");
    registrationBox.classList.add("popup-fade-in");
}
function PopdownRegistration() {
    document.body.style.overflow = "";
    registrationBox.classList.remove("popup-fade-in");
    registrationBox.classList.add("popup-fade-out");
    overlay.classList.add("unshow")

    registrationBox.addEventListener('animationend', function handleAnimationEnd() {
        overlay.classList.remove("show");
        registrationBox.removeEventListener('animationend', handleAnimationEnd);
    });
}
function saveFormData(event) {
    event.preventDefault();
    if (password.value == passwordConfirm.value && password.value !== null){
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
    
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('isLoggedIn', "true");
        PopdownRegistration();
        location.reload();
    } else { 
        password.style.borderColor = "red";
        passwordConfirm.style.borderColor = "red";
     }
}
function PopupProfile(){
    document.body.style.overflow = "hidden";
    registrationBox.style.display = "none";
    profileBox.style.display = "block";
    profileBox.classList.remove("popup-fade-out");
    profileBox.classList.add("popup-fade-in");
}
function PopdownProfile() {
    document.body.style.overflow = "";
    profileBox.classList.remove("popup-fade-in");
    profileBox.classList.add("popup-fade-out");
    overlay.classList.add("unshow")

    profileBox.addEventListener('animationend', function handleAnimationEnd() {
        overlay.classList.remove("show");
        profileBox.removeEventListener('animationend', handleAnimationEnd);
    });
}
function AccountExit(){
    PopdownProfile();
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    location.reload();
}

function tapalkaCheck(){
    if(isLoggedIn == "true"){
        window.location.assign("tapalka.html");
    }
    else{
        AccountCheck();
    }
}

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("review");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}