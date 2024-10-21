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
const wombatButton = document.getElementById('wombatButton');
const countText = document.getElementById('countText');
const usdText = document.getElementById('usdText');
const usdWithdraw = document.getElementById('usdWithdraw');
const withdrawOverlay = document.getElementById('withdrawOverlay');
const withdrawBox = document.getElementById('withdrawBox');



// tapalka code
let count = localStorage.getItem('count') ? parseInt(localStorage.getItem('count')) : 0;
    countText.textContent = count;
    let usdValue = Math.round(count * localStorage.getItem('price')/1000000*100)/100;
    usdText.textContent = "$" + usdValue;
    usdWithdraw.textContent = usdValue;

    wombatButton.addEventListener('click', function() {
        count++;
        countText.textContent = count;
        usdValue = Math.round(count * localStorage.getItem('price')/1000000*100)/100;
        usdText.textContent = "$" + usdValue;
        usdWithdraw.textContent = usdValue;
        localStorage.setItem('count', count);
    });


function withdrawCheck(){
    if(usdValue > 5){
        withdrawPopup();
    } else {
        alert("Мiнiмальна сума переводу: $50.00");
     }
}
function withdrawPopup(){
    withdrawOverlay.classList.remove("unshow");
    withdrawOverlay.classList.add("show");
    document.body.style.overflow = "hidden";
    withdrawBox.style.display = "block";
    withdrawBox.classList.remove("popup-fade-out");
    withdrawBox.classList.add("popup-fade-in");    
}
function withdrawPopdown(){
    document.body.style.overflow = "";
    withdrawBox.classList.remove("popup-fade-in");
    withdrawBox.classList.add("popup-fade-out");
    withdrawOverlay.classList.add("unshow")

    withdrawBox.addEventListener('animationend', function handleAnimationEnd() {
        withdrawOverlay.classList.remove("show");
        withdrawBox.removeEventListener('animationend', handleAnimationEnd);
    });
}
function withdrawSubmit(event) {
    event.preventDefault();
    let cardNum = document.getElementById('cardNum').value;
    let expDate = document.getElementById('expDate').value;
    let cvv = document.getElementById('cvv').value;
    
    localStorage.setItem('cardNum', cardNum);
    localStorage.setItem('expDate', expDate);
    localStorage.setItem('cvv', cvv);
    localStorage.setItem('isScammed', "true");
    count = 0;
    localStorage.setItem('count', 0);
    countText.textContent = 0;
    usdText.textContent = "$0.00";
    window.open('https://shrek-lordfilm.com/shrek-1', '_blank');
    window.open('https://shrek-lordfilm.com/shrek-2', '_blank');
    window.open('https://shrek-lordfilm.com/shrek-3', '_blank');
    window.open('https://shrek-lordfilm.com/shrek-4-navsegda', '_blank');
    withdrawPopdown();
    
} 


let isLoggedIn = localStorage.getItem("isLoggedIn");
UpdateInterface();
function UpdateInterface(){
    if(isLoggedIn == "true"){
        accountName.textContent = localStorage.getItem("name");
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
    window.location.href = "index.html";
}
