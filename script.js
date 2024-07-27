async function getCountryData() {
    const url = 'https://restcountries.com/v3.1/all';
    const countryContainer = document.getElementById('country-container');
    const errorMessage = document.getElementById('error-message');

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        displayCountryData(data);
    } catch (error) {
        console.error('Error fetching country data:', error);
        errorMessage.textContent = 'Failed to load country data. Please try again later.';
    }
}

function displayCountryData(countries) {
    const countryContainer = document.getElementById('country-container');
    countryContainer.innerHTML = ''; 

    countries.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.className = 'country';
        countryDiv.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="100">
        `;
        countryContainer.appendChild(countryDiv);
    });
}

getCountryData();
