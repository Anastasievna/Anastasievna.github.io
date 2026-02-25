import calendar from './modules/calendar.js'
import getCities from './modules/cities.js'
import getPassengersCounter from './modules/addPassengers.js'
import showToast from './modules/toast.js'

const {createCalendar, getDates} = calendar();

createCalendar();
getCities();
getPassengersCounter();

const sendBtn = document.getElementById("send-form");

sendBtn.addEventListener("click", () => {
    validate();
});

function validate() {
    const cities = getCities();
    console.log("cities", cities);
    const dates = getDates();
    console.log("dates", dates);

    if (!cities.every(city => !!city)) {
        showToast({
            type: "error",
            title: "Error",
            text: "Add cities"
        });
        return;
    }
    if (!dates) {
        showToast({
            type: "error",
            title: "Error",
            text: "Add dates"
        });
        return;
    }

    showToast({
        type: "success",
        title: "Success",
        text: "Get your tickets"
    });

    const body = {
        dates: {
            depart: dates[0],
            arrive: dates[1] || null
        },
        passengers: getPassengersCounter(),
        cities: {
            depart: cities[0],
            arrive: cities[1]
        }
    }
    
    console.log(body);
}

const qstsBoxes = document.querySelectorAll(".faq__question-box");

qstsBoxes.forEach(item => {
    item.addEventListener("click", (e) => {
        if (e.target.classList.contains("faq__image")) {
            item.children[1].classList.toggle("faq__image--clicked");

            const isHidden = item.nextElementSibling.classList.contains("faq__answer--hidden");
            if (isHidden) {
                item.nextElementSibling.classList.remove('faq__answer--hidden');
                setTimeout(() => {
                    item.nextElementSibling.classList.add("faq__answer--visible");
                }, 20);
            } else {
                item.nextElementSibling.classList.remove('faq__answer--visible');
                setTimeout(() => {
                    item.nextElementSibling.classList.add("faq__answer--hidden");
                }, 700);
            }
        }
    });
});

const burgerBtn = document.querySelector(".header__burger-menu");
const menu = document.querySelector(".header__menu");
const menuCloseBtn = document.getElementById("close-menu-btn");

burgerBtn.addEventListener("click", () => {
    menu.classList.toggle("header__menu--visible");
    menuCloseBtn.classList.toggle("hide");
    burgerBtn.classList.toggle("hide");
    document.body.style.overflowY = "hidden";
});

menuCloseBtn.addEventListener("click", () => {
   menu.classList.toggle("header__menu--visible"); 
   menuCloseBtn.classList.toggle("hide");
   burgerBtn.classList.toggle("hide");
   document.body.style.overflowY = "auto";
})