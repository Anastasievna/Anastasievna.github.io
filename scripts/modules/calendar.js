const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]
const daysOfWeek = ["M", "T", "W", "T", "F", "S","S"]

function getById(id) {
  return document.getElementById(id);
}

let curDate = new Date();

let curMonth = {
    month: curDate.getMonth(),
    year: curDate.getFullYear()
}
let nextMonth = {
    month: curDate.getMonth() + 1,
    year: curDate.getFullYear()
}

function showMonth({year, month}, type) {
    const calendar = document.createElement("div");
    calendar.classList.add("calendar__days");
    calendar.id = "days";

    const monthTitle = document.createElement("div");
    monthTitle.classList.add("calendar__month-title");
    const title = document.createElement("p");
    title.textContent = `${months[month]} ${year}`;

    let btns = ["prev", "next"].map(btn => {
        const element = document.createElement("button");
        element.classList.add("calendar__month-title-btn", type);
        element.style.opacity = +(btn == type);
        element.id = btn == type ? btn : `${btn}_disable`;
        return element;
    });

    monthTitle.append(btns[0], title, btns[1]);

    let firstDayOfMonth = new Date(year, month, 7).getDay();
    // console.log("firstDayOfMonth", firstDayOfMonth);
    let lastDayOfMonth = new Date(year, month + 1, 0).getDate();
   
    for (let i = 1; i <= lastDayOfMonth; i+=1){
        // добавление предыдущих дней месяца
        if(i === 1) {
            for (let j = 0; j < firstDayOfMonth; j++) {
                let day = document.createElement("div");
                day.classList.add("calendar__day-title", "calendar__day-title--disabled");
                calendar.append(day);
            }
        }

        // актуальные дни
        let day = document.createElement("div");
        day.classList.add("calendar__day-title");

        if (year < curDate.getFullYear()) {
            day.classList.add("disabled");
        } else {
            if (month < curDate.getMonth()) {
                day.classList.add("disabled");
           } else {
                if (month == curDate.getMonth() && i < curDate.getDate()) day.classList.add("calendar__day-title--disabled");
           }
        }

        let span = document.createElement("span");
        span.classList.add("calendar__day-span");
        span.textContent = i;
        day.append(span);

        // привязка функцию клика и покраски
        const date = new Date(year, month, i);
        day.dataset.date = date.toLocaleDateString();
        day.dataset.dateISO = date.toISOString();

        day.addEventListener("click", () => {
            paintDay(day);
        })

        allDays.push(day);
        calendar.append(day);

        // добавление дней следующего месяца
        if(i === lastDayOfMonth){
            let remainDays = new Date(year, month, i).getDay();
            // console.log("remainDays", remainDays);
   
            for (remainDays; remainDays < 7; remainDays++) {
                let day = document.createElement("div");
                day.classList.add("calendar__day-title", "calendar__day-title--disabled");
                calendar.append(day);
            }
        }
    }

    const monthBlock = document.createElement("div");
    monthBlock.classList.add("calendar__month");

    monthBlock.append(monthTitle, createDaysTitle(), calendar);

    getById("month-box").append(monthBlock);
}

let counterClick = 0;
let allDays = [];
let clickedDays = [];
let beetweenDays = [];

function paintDay(day) {
    // обнуление выбранных дней если уже есть выбранные
    if (day.classList.contains("calendar__day-title--disabled")) return;

    if (trip && counterClick > 1 || !trip && counterClick === 1) resetPaintedDays();
    // Запрет выбора дня меньше чем текущий
    if (trip && clickedDays.length && Date.parse(day.dataset.dateISO) < Date.parse(clickedDays[0].dataset.dateISO)) {
        return;
    }

    trip ? clickedDays.push(day) : clickedDays[0] = day;

    if (trip && counterClick === 1) {
        let first = allDays.indexOf(clickedDays[0]);
        let last = allDays.indexOf(clickedDays[1]);
        beetweenDays = allDays.slice(first+1, last);
        clickedDays[0].classList.add("right");
        clickedDays[1].classList.add("left");
        beetweenDays.forEach(item => item.style.backgroundColor = "#F5F5F5");
    }

    day.classList.add("active");
    counterClick ++;
}

function createDaysTitle() {
    const daysTitleBlock = document.createElement("div");
    daysTitleBlock.classList.add("calendar__days-title");

    daysOfWeek.forEach(item => {
        let day = document.createElement("div");
        day.textContent = item;
        day.classList.add("calendar__day-title");
        daysTitleBlock.append(day);
    })

    return daysTitleBlock;
}

function showNextMonth() {
    if (curMonth.month === 11) {
        curMonth.month = 0;
        curMonth.year += 1;
    } else {
        curMonth.month +=1;
    }

   if (nextMonth.month === 11) {
        nextMonth.month = 0;
        nextMonth.year += 1;
    } else {
        nextMonth.month +=1;
    }
    
    clearBlock();
    createMonthes();
}

function showPrevMonth() {
    if (curMonth.month === 0) {
        curMonth.month = 11;
        curMonth.year -= 1;
    } else {
        curMonth.month -= 1;
    }

    if (nextMonth.month === 0) {
        nextMonth.month = 11;
        nextMonth.year -=1;
    } else {
        nextMonth.month-=1;
    }

    clearBlock();
    createMonthes();
}

function createMonthes() {
    showMonth(curMonth, "prev");
    showMonth(nextMonth, "next");

    getById("prev").addEventListener("click", showPrevMonth);
    getById("next").addEventListener("click", showNextMonth);
}

function createCalendar() {
    createMonthes();
}

function clearBlock() {
    getById("month-box").innerHTML = "";
}

let showCalendar = false;
let trip = true;

function toggleCalendar() {
    const calendar = getById("calendar");
    calendar.style.display = showCalendar ? "none" : "block";

    showCalendar = !showCalendar;
}

document.querySelectorAll(".calendar-icon").forEach(element => element.addEventListener("click", toggleCalendar));
document.body.addEventListener("click", e => {
    if (showCalendar && !clickedDays.length && ![...e.target.classList].some(className => className.includes("calendar"))) toggleCalendar();
});

const resetBtn = getById("reset");
const applyBtn = getById("apply");
const returnSpan = getById("return");
const departSpan = getById("depart");
const returnInput = getById("return-input")
const options = getById("way-btns");

options.addEventListener("change", (e) => {
    trip = e.target.value === "trip";
    if (e.target.value === "trip") {
        returnInput.classList.remove("disabled");
    } else {
        returnInput.classList.add("disabled");
        if (clickedDays.length) { 
            counterClick = 1;
            clickedDays.forEach((item, i) => {
                item.classList.remove("left", "right");
                if (i >= 1) item.classList.remove("active");
            });
            clickedDays = [clickedDays[0]];
            beetweenDays.forEach(item => item.style.backgroundColor = "inherit");
            beetweenDays = [];

            returnSpan.textContent = "Return";
            returnSpan.style.color = "inherit";
        }
    }
});

function resetPaintedDays(withSpans) {
    counterClick = 0;
    clickedDays.forEach(item => item.classList.remove("active", "left", "right"));
    clickedDays = [];
    beetweenDays.forEach(item => item.style.backgroundColor = "inherit");
    beetweenDays = [];

    if (withSpans) {
        returnSpan.textContent = "Return";
        returnSpan.style.color = "inherit";
        departSpan.textContent = "Depart";
        departSpan.style.color = "inherit";
    }
}

applyBtn.addEventListener("click", () => {
    if (!(!trip && !!clickedDays.length || trip && clickedDays.length == 2)) {
       return;
    }

    const [departDate, returnDate] = clickedDays;

    if (returnDate) {
        returnSpan.textContent = returnDate.dataset.date;
        returnSpan.style.color = "rgba(32, 32, 32, 1)";
    }
    if (departDate) {
        departSpan.textContent = departDate.dataset.date;
        departSpan.style.color = "rgba(32, 32, 32, 1)";
    }

   toggleCalendar();
})

resetBtn.addEventListener("click", () => {
    resetPaintedDays(true);
})

function validateDates() {
    if (!clickedDays.length) return null;

    const dates = clickedDays.map(div => (div?.dataset.date || null));

    if (dates.length === 2 || !!dates.length && !trip) {
        return dates;
    } else {
        return null;
    }
}

function getDates() {
    return validateDates();
}

export default function calendar() {
    return {
        createCalendar,
        getDates
    }
}