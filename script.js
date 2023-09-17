const input = document.getElementById("place-input");
const placeBtn = document.getElementById("place-btn");
const table = document.getElementById("table");

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '30ed671deamsh92cc402a0d75e4ep1a87d9jsn6ec76f5bd48d',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
};

async function test(place) {
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/places?namePrefix=${place}`;
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
}

input.addEventListener("keypress", (e) => {
    
    if (e.key == 'Enter') {
        if(input.value == "") alert("Write something before proceed!");
        else test(input.value);
    }
});
placeBtn.addEventListener("click", () => { 
    if(input.value == "") alert("Write something before proceed!");
    else test(input.value);
});