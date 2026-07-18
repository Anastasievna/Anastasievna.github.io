### **Project M3-1: Railway Ticket Booking на React**


### **Введение**

Твой отпуск в Индию был почти спланирован. Маршрут к священной реке Ганг проложен, рюкзак собран. Осталась мелочь — купить онлайн билеты на поезд. И тут начался ад... ты просто хотел купить билет, а не проходить квест!

По счастливой случайности, твои жалобы дошли до нужных ушей. Знакомые из местной IT-компании, которая как раз получила контракт с Индийскими железными дорогами, сделали тебе предложение: «Раз такой умный — сделай нам прототип».

Ваша задача — создать **MVP**, показав, как должен выглядеть современный и удобный сервис. Выбери **3 любые страницы** из дизайна и реализуй их. Остальное подхватят твои новые товарищи по команде.

Удачи, и пусть Ганг принесет тебе чистого кода

*   **Дизайн:** [Ссылка на Figma](https://www.figma.com/design/dYoRBMtssFlGNjrBtTAruo/Module-3-React-Train-Ticket--Share-?node-id=2182-1991&t=U32ZjeGj5kOohWm8-1)
*   **Стек:** React (хуки), React Router, TypeScript, Context или Redux.


### **Как будем работать:**
- У тебя будет 4 занятия с ментором, где вы вместе разберете важные части проекта. Ментор выберит странички для реализации.
- **Остальные страницы из дизайна — это бэклог.** Если ты быстро справишься с основным функционалом, сможешь, как и в реальной команде, взять дополнительную задачу и сделать проект еще круче.

### **Ключевая логика и упрощения**

Чтобы вы могли сфокусироваться на изучении React, мы упрощаем серверную логику. Приложение будет работать в "демо-режиме" по следующим правилам:

1.  **Список городов (два варианта на выбор):**
    *   **Простой вариант:** для полей "Departure / Arrival" используйте заранее подготовленный массив.
    *   **Продвинутый вариант (по желанию):** для тех, кто хочет попрактиковаться в работе с внешними данными, можно получить список станций из API. Рекомендуем использовать [этот API](https://rapidapi.com/shivesh96/api/real-time-pnr-status-api-for-indian-railways), у которого есть бесплатный план, не требующий банковской карты.
2.  **Логика поиска.** Независимо от выбранных городов и дат, страница `/search-results` **всегда отображает три одинаковых поезда**, которые показаны в дизайне. При этом выбранные города должны корректно передаваться и отображаться на следующих шагах.
3.  **Количество пассажиров.** На странице `/review-booking` количество форм для ввода данных пассажиров должно **создаваться динамически** в соответствии с числом, выбранным на главной странице.
4.  Все цены (на билеты, налоги, сборы) являются **статичными** и берутся прямо из дизайна. Ваша задача — правильно их отобразить и просуммировать.

---

### **Техническое задание по страницам**

#### **1. Главная страница (Homepage)**

**Компонент:** `<HomePage />`

**Функциональность:**
    
    *   Форма поиска билетов с полями:
    *   Города Departure / Arrival (с автоподстановкой из списка выше).
    *   Даты, количество пассажиров.

**Навигация:** при клике на кнопку `Ticket, Please!` → `/search-results`.

#### **2. Страница результатов поиска (Train List)**

**URL:** `/search-results`

**Компонент:** `<SearchResultsPage />`

**Функциональность:**
    
    *   Отображение параметров поиска, выбранных на главной странице.
    *   Список доступных поездов, где каждый поезд — это компонент `<TrainCard />`.

**`<TrainCard />` Структура карточки поезда:**

    *   22426 – VANDE BHARAT номер и название поезда.
    *   Информация о маршруте.
    *   Блоки выбора класса: список кликабельных карточек для бронирования. Каждая содержит:
        *   Класс вагона** `3A`, `2A`, `1A`.
        *   Статус доступности: показывает количество свободных мест (Avl - 046) или место в очереди, если билеты закончились (WL - 36).
        *   Тип тарифа `Tatkal`.
        *   Стоимость `₹800`.

**Навигация:** При клике на один из блоков выбора класса (например, на блок с ценой ₹800) происходит переход на страницу `/review-booking`.

#### **3. Страница подтверждения бронирования (Review Page)**

**URL:** `/review-booking`

**Компонент:** `<ReviewBookingPage />`

**Функциональность:**
    *   Информация о выбранном поезде и классе.
    *   Формы для ввода данных пассажиров. Этот блок должен динамически дублироваться в соответствии с количеством пассажиров, выбранным на главной странице.

**Блок выбора питания**:

    *   Стоимость этого блюда должна добавляться к итоговой сумме в блоке «Bill details».
    *   В «Bill details» должна появиться новая строка с названием и стоимостью блюда.
    *   Состояние кнопки может меняться на «Added» или «Remove», позволяя отменить выбор.

**Блоки «Offers», «Apply Code», «Extra Baggage»** 

Промокоды не суммируются. Применение нового промокода заменяет предыдущий.


    *   `Offers`: cписок доступных промокодов. Клик по кнопке `Apply` автоматически вставляет код в поле «Apply Code» и применяет скидку.
    *   `Apply Code`: поле для ручного ввода промокода. Применение кода должно обновлять строку Discount и Total Charge в блоке «Bill details».
    *   `Extra Baggage`: кнопка `Add to Ticket` добавляет фиксированную стоимость за дополнительный багаж в «Bill details».  


**Блок «Bill details»**. Все строки в этом блоке должны автоматически обновляться при изменении опций на странице (добавление еды, багажа, применении скидки).    


Навигация:
** при клике на `Book Now` → `/payment`.
** при клике на `Cancel` → `/search-results`


#### **4. Страница оплаты (Payment Page)**

**URL:** `/payment`

**Компонент:** `<PaymentPage />`

**Функциональность:**

    *   Сводка по бронированию.
    *   Формы для выбора и ввода данных способа оплаты.

**Навигация:** после клика на `Pay` → `/success`.

#### **5. Страница успеха (Booked Ticket)**

**URL:** `/success`

**Компонент:** `<SuccessPage />`

**Функциональность:**

- Подтверждение брони
- Информация о билете:
  - Данные поезда
  - Данные пассажиров
  - Стоимость
- QR-код для билета
- Кнопки:
  - `Book another ticket`
  - `Download ticket (PDF)`

---

## Дополнительно

#### Состояние:

- Данные формы и выбора поездов можно хранить в Context или Redux
- Логика маршрутов через React Router

#### Возможности для расширения:

- Валидация форм
- Сохранение брони в localStorage
- Загрузка PDF с билетом
- Адаптивность



---


const indianRailwayStations = [
{ name: "New Delhi", code: "NDLS" },
{ name: "Mumbai Central", code: "BCT" },
{ name: "Chennai Central", code: "MAS" },
{ name: "Kolkata Howrah", code: "HWH" },
{ name: "Bengaluru City Junction", code: "SBC" },
{ name: "Hyderabad Deccan", code: "HYB" },
{ name: "Ahmedabad Junction", code: "ADI" },
{ name: "Pune Junction", code: "PUNE" },
{ name: "Jaipur Junction", code: "JP" },
{ name: "Lucknow Junction", code: "LJN" },
{ name: "Kanpur Central", code: "CNB" },
{ name: "Agra Cantt", code: "AGC" },
{ name: "Varanasi Junction", code: "BSB" },
{ name: "Amritsar Junction", code: "ASR" },
{ name: "Guwahati", code: "GHY" },
{ name: "Patna Junction", code: "PNBE" },
{ name: "Surat", code: "ST" },
{ name: "Nagpur Junction", code: "NGP" },
{ name: "Bhopal Junction", code: "BPL" },
{ name: "Coimbatore Junction", code: "CBE" },
{ name: "Kochi Ernakulam Junction", code: "ERS" },
{ name: "Trivandrum Central", code: "TVC" },
{ name: "Vijayawada Junction", code: "BZA" },
{ name: "Madurai Junction", code: "MDU" },
{ name: "Jammu Tawi", code: "JAT" },
{ name: "Gwalior Junction", code: "GWL" },
{ name: "Chandigarh", code: "CDG" },
{ name: "Jhansi Junction", code: "JHS" },
{ name: "Gaya Junction", code: "GAYA" },
{ name: "Mysore Junction", code: "MYS" },
{ name: "Visakhapatnam", code: "VSKP" },
{ name: "Jodhpur Junction", code: "JU" },
{ name: "Dehradun", code: "DDN" },
{ name: "Gorakhpur Junction", code: "GKP" },
{ name: "Raipur Junction", code: "R" },
{ name: "Ranchi Junction", code: "RNC" },
{ name: "Mangalore Central", code: "MAQ" },
{ name: "Hubli Junction", code: "UBL" },
{ name: "Allahabad Junction", code: "PRYJ" },
{ name: "Jabalpur Junction", code: "JBP" },
{ name: "Bhubaneswar", code: "BBS" },
{ name: "Tirupati", code: "TPTY" },
{ name: "Udaipur City", code: "UDZ" },
{ name: "Ajmer Junction", code: "AII" },
{ name: "Haridwar Junction", code: "HW" },
{ name: "Salem Junction", code: "SA" },
{ name: "Warangal", code: "WL" },
{ name: "Kota Junction", code: "KOTA" },
{ name: "Dhanbad Junction", code: "DHN" },
{ name: "Bilaspur Junction", code: "BSP" },
{ name: "Secunderabad Junction", code: "SC" },
{ name: "Moradabad Junction", code: "MB" },
{ name: "Kathgodam", code: "KGM" },
{ name: "Bharuch Junction", code: "BH" },
{ name: "Vasco Da Gama", code: "VSG" },
{ name: "Vadodara Junction", code: "BRC" },
{ name: "Jaisalmer", code: "JSM" },
{ name: "Dibrugarh", code: "DBRG" },
{ name: "Rameswaram", code: "RMM" },
{ name: "Shimla", code: "SML" },
{ name: "Indore Junction", code: "INDB" },
{ name: "Darjeeling", code: "DJ" },
{ name: "Silchar", code: "SCL" },
{ name: "Bikaner Junction", code: "BKN" },
{ name: "Gandhinagar Capital", code: "GNC" },
{ name: "Rishikesh", code: "RKSH" },
{ name: "Durgapur", code: "DGR" },
{ name: "Siliguri Junction", code: "SGUJ" },
{ name: "Bhuj", code: "BHUJ" },
{ name: "Ooty", code: "UAM" },
{ name: "Nasik Road", code: "NK" },
{ name: "Guntur Junction", code: "GNT" },
{ name: "Erode Junction", code: "ED" },
{ name: "Asansol Junction", code: "ASN" },
{ name: "Kharagpur Junction", code: "KGP" },
{ name: "Tatanagar Junction", code: "TATA" },
{ name: "Kalyan Junction", code: "KYN" },
{ name: "Mathura Junction", code: "MTJ" },
{ name: "Tinsukia Junction", code: "TSKU" },
{ name: "Panipat Junction", code: "PNP" },
{ name: "Ratnagiri", code: "RN" },
{ name: "Anand Vihar Terminal", code: "ANVT" },
{ name: "Thrissur", code: "TCR" },
{ name: "Cuttack", code: "CTC" },
{ name: "Katihar Junction", code: "KIR" },
{ name: "Hoshiarpur", code: "HSX" },
{ name: "Palakkad Junction", code: "PGT" },
{ name: "Karnal", code: "KUN" },
{ name: "Rajkot Junction", code: "RJT" },
{ name: "Pondicherry", code: "PDY" },
{ name: "Yesvantpur Junction", code: "YPR" },
{ name: "Kozhikode", code: "CLT" },
{ name: "Mirzapur", code: "MZP" },
{ name: "Ludhiana Junction", code: "LDH" },
{ name: "Borivali", code: "BVI" },
{ name: "Saharanpur Junction", code: "SRE" },
{ name: "Vadakara", code: "BDJ" },
{ name: "Bareilly Junction", code: "BE" },
{ name: "Muzaffarpur Junction", code: "MFP" },
{ name: "Kakinada Town", code: "CCT" },
{ name: "Aligarh Junction", code: "ALJN" },
{ name: "Ambala Cantt Junction", code: "UMB" },
{ name: "Anand Junction", code: "ANND" },
{ name: "Aurangabad", code: "AWB" },
{ name: "Balasore", code: "BLS" },
{ name: "Bangalore East", code: "BNCE" },
{ name: "Bankura Junction", code: "BQA" },
{ name: "Barauni Junction", code: "BJU" },
{ name: "Barddhaman Junction", code: "BWN" },
{ name: "Begampet", code: "BMT" },
{ name: "Belgaum", code: "BGM" },
{ name: "Bellary Junction", code: "BAY" },
{ name: "Betul", code: "BZU" },
{ name: "Bhagalpur", code: "BGP" },
{ name: "Bhavnagar Terminus", code: "BVC" },
{ name: "Bhilai Power House", code: "BPHB" },
{ name: "Bhiwani Junction", code: "BNW" },
{ name: "Bina Junction", code: "BINA" },
{ name: "Bokaro Steel City", code: "BKSC" },
{ name: "Brahmapur", code: "BAM" },
{ name: "Burhanpur", code: "BAU" },
{ name: "Canacona", code: "CNO" },
{ name: "Chalisgaon Junction", code: "CSN" },
{ name: "Chhatrapati Shivaji Terminus", code: "CSMT" },
{ name: "Chittaurgarh", code: "COR" },
{ name: "Dadar Western", code: "DDR" },
{ name: "Danapur", code: "DNR" },
{ name: "Darbhanga Junction", code: "DBG" },
{ name: "Davangere", code: "DVG" },
{ name: "Delhi Sarai Rohilla", code: "DEE" },
{ name: "Dharmavaram Junction", code: "DMM" },
{ name: "Dhaulpur", code: "DHO" },
{ name: "Dindigul Junction", code: "DG" },
{ name: "Durg", code: "DURG" },
{ name: "Duvvada", code: "DVD" },
{ name: "Eluru", code: "EE" },
{ name: "Falaknuma", code: "FM" },
{ name: "Faridabad", code: "FDB" },
{ name: "Fatehpur", code: "FTP" },
{ name: "Firozpur Cantt", code: "FZR" },
{ name: "Gandidham", code: "GIMB" },
{ name: "Ghaziabad Junction", code: "GZB" },
{ name: "Gonda Junction", code: "GD" },
{ name: "Gudur Junction", code: "GDR" },
{ name: "Gulbarga", code: "GR" },
{ name: "Guntakal Junction", code: "GTL" },
{ name: "Hapa", code: "HAPA" },
{ name: "Hassan", code: "HAS" },
{ name: "Hazrat Nizamuddin", code: "NZM" },
{ name: "Hospet Junction", code: "HPT" },
{ name: "Howrah Junction", code: "HWH" },
{ name: "Igatpuri", code: "IGP" },
{ name: "Itarsi Junction", code: "ET" },
{ name: "Jalandhar City", code: "JRC" },
{ name: "Jalgaon Junction", code: "JL" },
{ name: "Jharsuguda Junction", code: "JSG" },
{ name: "Jolarpettai Junction", code: "JTJ" },
{ name: "Junagadh Junction", code: "JND" },
{ name: "Kannur", code: "CAN" },
{ name: "Katni Junction", code: "KTE" },
{ name: "Kazipet Junction", code: "KZJ" },
{ name: "Khammam", code: "KMT" },
{ name: "Khurda Road Junction", code: "KUR" },
{ name: "Kodaikanal Road", code: "KQN" },
{ name: "Kolhapur", code: "KOP" },
{ name: "Koppal", code: "KBL" },
{ name: "Korba", code: "KRBA" },
{ name: "Kurnool City", code: "KRNT" },
{ name: "Latur", code: "LUR" },
{ name: "Lonavala", code: "LNL" },
{ name: "Machilipatnam", code: "MTM" },
{ name: "Malda Town", code: "MLDT" },
{ name: "Manduadih", code: "MUV" },
{ name: "Meerut City", code: "MTC" },
{ name: "Mhow", code: "MHOW" },
{ name: "Moga", code: "MOGA" },
{ name: "Mokama Junction", code: "MKA" },
{ name: "Mumbai Dadar", code: "DR" },
{ name: "Munger", code: "MGR" },
{ name: "Nadiad Junction", code: "ND" },
{ name: "Nagercoil Junction", code: "NCJ" },
{ name: "Nanded", code: "NED" },
{ name: "Navsari", code: "NVS" },
{ name: "Nizamabad", code: "NZB" },
{ name: "Ongole", code: "OGL" },
{ name: "Palghat Junction", code: "PGT" },
{ name: "Palwal", code: "PWL" },
{ name: "Parbhani Junction", code: "PBN" },
{ name: "Pathankot", code: "PTK" },
{ name: "Patiala", code: "PTA" },
{ name: "Porbandar", code: "PBR" },
{ name: "Pratapgarh Junction", code: "PBH" },
{ name: "Ratlam Junction", code: "RTM" },
{ name: "Rewari Junction", code: "RE" },
{ name: "Rohtak Junction", code: "ROK" },
{ name: "Sagara Jambagaru", code: "SRF" },
{ name: "Sambalpur", code: "SBP" },
{ name: "Satna Junction", code: "STA" },
{ name: "Sawai Madhopur Junction", code: "SWM" }
];