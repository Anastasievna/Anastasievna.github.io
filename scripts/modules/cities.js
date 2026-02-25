const cities = [
    'Amsterdam', 'Antwerp', 'Arkhangelsk', 'Astrakhan', 'Atlanta', 'Athens',
    'Basel', 'Bangalore', 'Barcelona', 'Berlin', 'Bern', 'Birobidzhan', 'Bonn', 'Boston', 'Bremen', 'Buffalo', 'Buenos Aires',
    'Warsaw', 'Washington', 'Weimar', 'Wels', 'Vienna', 'Venice', 'Vladivostok', 'Volgograd', 'Vologda', 'Voronezh', 
    'Hamburg','Hannover','Genoa','Denver','Detroit','Donetsk','Dorchester','Dresden','Dublin','Dover','Duisburg','Geneva', 
    'Ivanovo', 'Jerusalem', 'Ingelheim am Rhein', 'Irkutsk', 'Kazan', 'Calgary', 'Calais', 'Kaliningrad', 'Karaganda', 'Kargopol', 'Cologne', 'Copenhagen', 
    'Lan','Leipzig','Lyon','Likhoslavl','Lausanne','London','Los Angeles','Lviv','Liège','Madrid','Mainz','Malbork','Marseille','Meissen','Milan', 
    'Nazareth', 'Naryan-Mar', 'Nahalal', 'Naples', 'Nice', 'Novosibirsk', 'New Orleans', 'New York', 'Nuremberg', 
    'Omsk', 'Orenburg', 'Ottawa', 'Pavia', 'Paris', 'Perm', 'Pisa', 'Port Arthur', 'Prague', 'Pskov', 'Reims', 'Rzhev', 'Riga', 'Rome', 'Rio de Janeiro', 
    'Samara', 'San Francisco', 'Sarapul', 'Severodvinsk', 'Seattle', 'Sorrento', 'Sochi', 'Istanbul', 'Strasbourg', 'Tver', 'Tehran', 'Toronto'
];

const selectedCities = {
    departure: null,
    arrival: null
}

function getCity(type) {

    const input = getById(type);
    const list = getById(`list-${type}`);

    input.addEventListener("input", (e) => {
        clearList(list);
        createList(e.target, type, list);
    });
    
    const clearBtn = getById(`clear-${type}-input`);
    clearBtn.addEventListener("click", () => {
        selectedCities[type] = null;
        input.value = "";
        clearList(list);
    });
}

function createList(target, type, element) {
    const fragment = document.createDocumentFragment();

    const findCities = cities.filter(item => {
        const city = item.toLowerCase();
        const lowText = target.value.toLowerCase();

        if (city.startsWith(lowText) && target.value) {
            return item;
        }
    });

    findCities.forEach(city => {
        const li = document.createElement("li");
        li.textContent = city;

        li.addEventListener("click", (e) => {
            selectedCities[type] = e.target.textContent;
            target.value = selectedCities[type];

            clearList(element);
        });

        fragment.append(li);
    })

    if (!!findCities.length) {
        element.append(fragment);
        element.classList.remove("hide");
    }
}

function getById(id) {
    return document.getElementById(id);
}

function clearList(list) {
    list.innerHTML = "";
    list.classList.add("hide");
}

function getCities() {
    getCity("departure");
    getCity("arrival");
    return Object.values(selectedCities);
}

export default getCities;