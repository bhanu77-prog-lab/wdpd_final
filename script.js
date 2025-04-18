Here’s the full and final script.js with all issues fixed:

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.trim();
    if (!query) {
        alert('Please enter a search term.');
        return;
    }

    const apiKey = '9f138744a5msh3a9eedcf419e464p1950b5jsn5b86cd60b9f8';
    const apiUrl = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=10&q=${encodeURIComponent(query)}`;

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
        resultsDiv.innerHTML = '';

        if (data.results && data.results.length > 0) {
            data.results.forEach(recipe => {
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe-card');

                const ingredients = recipe.sections?.[0]?.components?.map(c => c.raw_text).join(', ') || 'Not listed';
                const instructions = Array.isArray(recipe.instructions)
                    ? recipe.instructions.map(step => step.display_text).join(' ')
                    : 'Not available';

                recipeDiv.innerHTML = `
                    <h2>${recipe.name}</h2>
                    <img src="${recipe.thumbnail_url}" alt="${recipe.name}" style="width:100%; border-radius:8px; margin-bottom:10px;">
                    <p><strong>Ingredients:</strong> ${ingredients}</p>
                    <p><strong>Instructions:</strong> ${instructions}</p>
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

Let me know if you'd like the code packed in a downloadable ZIP or if you want help deploying it on GitHub Pages correctly.

