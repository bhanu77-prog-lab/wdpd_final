document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.trim();
    if (!query) {
        alert('Please enter a search term.');
        return;
    }

    // Replace 'your-api-key' with your actual RapidAPI key
    const apiKey = '9f138744a5msh3a9eedcf419e464p1950b5jsn5b86cd60b9f8';
    const apiUrl = `https://tasty.p.rapidapi.com/recipes/list?tags=${encodeURIComponent(query)}`;

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; // Clear previous results

        if (data.results && data.results.length > 0) {
            data.results.forEach(recipe => {
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe');

                recipeDiv.innerHTML = `
                    <h3>${recipe.name}</h3>
                    <img src="${recipe.thumbnail_url}" alt="${recipe.name}">
                    <p><strong>Ingredients:</strong> ${recipe.sections[0].components.map(c => c.raw_text).join(', ')}</p>
                    <p><strong>Instructions:</strong> ${recipe.instructions || 'Not available'}</p>
                `;

                resultsDiv.appendChild(recipeDiv);
            });
        } else {
            resultsDiv.innerHTML = '<p>No recipes found. Please try a different search term.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching recipes:', error);
        document.getElementById('results').innerHTML = '<p>An error occurred while fetching recipes. Please try again later.</p>';
    });
});