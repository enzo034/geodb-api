const input = document.getElementById("place-input");
const inputMinPopulation = document.getElementById("min-population");
const inputMaxPopulation = document.getElementById("max-population");
const placeBtn = document.getElementById("place-btn");
const table = document.getElementById("table");

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '30ed671deamsh92cc402a0d75e4ep1a87d9jsn6ec76f5bd48d',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
};

async function test(place, min, max) {
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/places?minPopulation=${min}&maxPopulation=${max}&namePrefix=${place}`;
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        addInfoTable(result);
    } catch (error) {
        console.error(error);
    }
}

function addInfoTable(place) {

    table.innerHTML = "";

    place.data.forEach(p => {
        const row = table.insertRow();

        row.innerHTML = `
        <td>${p.country}</td>
        <td>${p.countryCode}</td>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.region}</td>
        <td>${p.type}</td>
        `;
    });
    input.value = "";
    inputMaxPopulation.value = "";
    inputMinPopulation.value = "";
}

function getInputValues() {
    const inputValue = input.value;
    const minPopulation = inputMinPopulation.value;
    const maxPopulation = inputMaxPopulation.value;

    if (inputValue === "") {
        alert("Write something before proceeding!");
        return null;
    }

    const min = minPopulation !== "" ? parseInt(minPopulation) : 0;
    const max = maxPopulation !== "" ? parseInt(maxPopulation) : 1000000000000000;

    return { inputValue, min, max };
}

input.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        const inputValues = getInputValues();
        if (inputValues) {
            test(inputValues.inputValue, inputValues.min, inputValues.max);
        }
    }
});

inputMaxPopulation.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        const inputValues = getInputValues();
        if (inputValues) {
            test(inputValues.inputValue, inputValues.min, inputValues.max);
        }
    }
});

inputMinPopulation.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        const inputValues = getInputValues();
        if (inputValues) {
            test(inputValues.inputValue, inputValues.min, inputValues.max);
        }
    }
});

placeBtn.addEventListener("click", () => {
    const inputValues = getInputValues();
    if (inputValues) {
        test(inputValues.inputValue, inputValues.min, inputValues.max);
    }
});
