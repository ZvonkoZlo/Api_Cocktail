$(document).ready(function () {

// Dodajte funkciju za pretragu koktela po imenu
function searchCocktailByName(cocktailName) {
    const settings = {
        async: true,
        crossDomain: true,
        url: `https://the-cocktail-db.p.rapidapi.com/search.php?s=${cocktailName}`,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '36abe3e54bmshc8a9cc11352fa46p1a991cjsnd004769b0c8b',
            'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
        }
    };

    $.ajax(settings).done(function (response) {
        const cocktails = response.drinks;

        if (cocktails) {
            $('#cocktail-list').empty(); // Ispraznite trenutni prikaz koktela

            cocktails.forEach(cocktail => {
                const cocktailCard = `
                    <div class="cocktail-card">
                        <h3>${cocktail.strDrink}</h3>
                        <img class="cocktail-img" src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
                        <p>${cocktail.strInstructions}</p>
                        <button class="show-ingredients-button" data-cocktail="${cocktail.idDrink}">Prikaži sastojke</button>
                        <div class="ingredients-list" id="ingredients-${cocktail.idDrink}"></div>
                    </div>
                `;
                $('#cocktail-list').append(cocktailCard);

                // Dodavanje događaja za prikaz sastojaka
                $(`.show-ingredients-button[data-cocktail="${cocktail.idDrink}"]`).click(function () {
                    const cocktailId = $(this).data('cocktail');
                    const ingredientsContainer = $(`#ingredients-${cocktailId}`);
                    ingredientsContainer.slideToggle();
                    if (ingredientsContainer.is(':visible')) {
                        // Ako su sastojci vidljivi, dohvatite ih i prikažite
                        getIngredientsForCocktail(cocktailId, ingredientsContainer);
                    }
                });
            });
        } else {
            $('#cocktail-list').html('<p>Nema rezultata.</p>');
        }
    });
}

// Dodajte funkciju za prijedloge koktela dok korisnik unosi ime
function suggestCocktails(cocktailName) {
    const settings = {
        async: true,
        crossDomain: true,
        url: `https://the-cocktail-db.p.rapidapi.com/search.php?s=${cocktailName}`,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '36abe3e54bmshc8a9cc11352fa46p1a991cjsnd004769b0c8b',
            'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
        }
    };

    $.ajax(settings).done(function (response) {
        const cocktails = response.drinks;

        if (cocktails) {
            const suggestions = cocktails.map(cocktail => cocktail.strDrink);
            const suggestionsList = $('#cocktail-suggestions');
            suggestionsList.empty();

            suggestions.forEach(cocktail => {
                suggestionsList.append(`<li>${cocktail}</li>`);
            });

            // Osluškivanje klika na prijedlog koktela
            suggestionsList.find('li').click(function () {
                const selectedCocktail = $(this).text();
                $('#cocktail-name').val(selectedCocktail);
                suggestionsList.empty(); // Isprazni prijedloge
            });
        }
    });
}

// Osluškivanje unosa u polje za pretragu koktela po imenu
$('#cocktail-name').on('input', function () {
    const userInput = $(this).val();
    if (userInput.length >= 2) { // Prikazi prijedloge samo ako ima najmanje 2 znaka
        suggestCocktails(userInput);
    } else {
        $('#cocktail-suggestions').empty(); // Isprazni prijedloge ako je unos prekratak
    }
});

// Osluškivanje klika na gumb za pretragu koktela po imenu
$('#search-cocktail-button').click(function () {
    const cocktailName = $('#cocktail-name').val();
    searchCocktailByName(cocktailName);
});








    // Funkcija za dohvat popisa sastojaka
    function getIngredientsList() {
        const settings = {
            async: true,
            crossDomain: true,
            url: 'https://the-cocktail-db.p.rapidapi.com/list.php?i=list',
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '36abe3e54bmshc8a9cc11352fa46p1a991cjsnd004769b0c8b',
                'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
            }
        };

        $.ajax(settings).done(function (response) {
            const ingredients = response.drinks;
            if (ingredients) {
                // Spremanje popisa sastojaka za kasnije korištenje
                const ingredientList = ingredients.map(ingredient => ingredient.strIngredient1);
                // Pozivanje funkcije za dohvat koktela prema odabranom sastojku
                $('#ingredient-select').empty(); // Ispraznite trenutne opcije
                ingredientList.forEach(ingredient => {
                    $('#ingredient-select').append(`<option value="${ingredient}">${ingredient}</option>`);
                });
            }
        });
    }

    // Poziv funkcije za dohvat popisa sastojaka pri pokretanju stranice
    getIngredientsList();
// Ažurirana funkcija za dohvat koktela prema odabranom sastojku
function getCocktailsByIngredient(ingredient) {
    const settings = {
        async: true,
        crossDomain: true,
        url: `https://the-cocktail-db.p.rapidapi.com/filter.php?i=${ingredient}`,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '36abe3e54bmshc8a9cc11352fa46p1a991cjsnd004769b0c8b',
            'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
        }
    };
//-----------------------------------------------------------------------<<<<<<<<
    $.ajax(settings).done(function (response) {
        const cocktails = response.drinks;

        if (cocktails) {
            $('#cocktail-list').empty(); // Ispraznite trenutni prikaz koktela

            cocktails.forEach(cocktail => {
                const cocktailCard = `
                    <div class="cocktail-card">
                        <h3>${cocktail.strDrink}</h3>
                        <img class="cocktail-img" src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
                        <p>${cocktail.strInstructions}</p>
                        <button class="show-ingredients-button" data-cocktail="${cocktail.idDrink}">Prikaži sastojke</button>
                        <div class="ingredients-list" id="ingredients-${cocktail.idDrink}"></div>
                    </div>
                `;
                $('#cocktail-list').append(cocktailCard);

                // Dodavanje događaja za prikaz sastojaka
                $(`.show-ingredients-button[data-cocktail="${cocktail.idDrink}"]`).click(function () {
                    const cocktailId = $(this).data('cocktail');
                    const ingredientsContainer = $(`#ingredients-${cocktailId}`);
                    ingredientsContainer.slideToggle();
                    if (ingredientsContainer.is(':visible')) {
                        // Ako su sastojci vidljivi, dohvatite ih i prikažite
                        getIngredientsForCocktail(cocktailId, ingredientsContainer);
                    }
                });
            });
        } else {
            $('#cocktail-list').html('<p>Nema rezultata.</p>');
        }
    });
}



    // Funkcija za dohvat sastojaka za određeni koktel
    function getIngredientsForCocktail(cocktailId, container) {
        const settings = {
            async: true,
            crossDomain: true,
            url: `https://the-cocktail-db.p.rapidapi.com/lookup.php?i=${cocktailId}`,
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '36abe3e54bmshc8a9cc11352fa46p1a991cjsnd004769b0c8b',
                'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
            }
        };

        $.ajax(settings).done(function (response) {
            const cocktail = response.drinks[0];
            if (cocktail) {
                const ingredients = [];
                for (let i = 1; i <= 15; i++) {
                    const ingredient = cocktail[`strIngredient${i}`];
                    const measure = cocktail[`strMeasure${i}`];
                    if (ingredient && measure) {
                        ingredients.push(`${ingredient} - ${measure}`);
                    } else if (ingredient) {
                        ingredients.push(ingredient);
                    }
                }

                // Prikaz sastojaka u kontejneru
                container.html(`<p><strong>Sastojci:</strong></p><ul><li>${ingredients.join('</li><li>')}</li></ul>`);
            }
        });
    }

    // Funkcija za dohvat najpopularnijih koktela
    function getPopularCocktails() {
        const settings = {
            async: true,
            crossDomain: true,
            url: 'https://the-cocktail-db.p.rapidapi.com/popular.php',
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '36abe3e54bmshc8a9cc11352fa46p1a991cjsnd004769b0c8b',
                'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
            }
        };

        $.ajax(settings).done(function (response) {
            const popularCocktails = response.drinks;

            if (popularCocktails) {
                $('#cocktail-list').empty(); // Ispraznite trenutni prikaz koktela

                popularCocktails.forEach(cocktail => {
                    const cocktailCard = `
                        <div class="cocktail-card">
                            <h3>${cocktail.strDrink}</h3>
                            <img class="cocktail-img" src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
                            <p>${cocktail.strInstructions}</p>
                            <button class="show-ingredients-button" data-cocktail="${cocktail.idDrink}">Prikaži sastojke</button>
                            <div class="ingredients-list" id="ingredients-${cocktail.idDrink}"></div>
                        </div>
                    `;
                    $('#cocktail-list').append(cocktailCard);

                    // Dodavanje događaja za prikaz sastojaka
                    $(`.show-ingredients-button[data-cocktail="${cocktail.idDrink}"]`).click(function () {
                        const cocktailId = $(this).data('cocktail');
                        const ingredientsContainer = $(`#ingredients-${cocktailId}`);
                        ingredientsContainer.slideToggle();
                        if (ingredientsContainer.is(':visible')) {
                            // Ako su sastojci vidljivi, dohvatite ih i prikažite
                            getIngredientsForCocktail(cocktailId, ingredientsContainer);
                        }
                    });
                });
            } else {
                $('#cocktail-list').html('<p>Nema rezultata.</p>');
            }
        });
    }

    // Osluškivanje promjene u izborniku
    $('#ingredient-select').change(function () {
        const selectedIngredient = $(this).val();
        getCocktailsByIngredient(selectedIngredient);
    });

    // Osluškivanje klika na gumb za najpopularnije koktele
    $('#popular-cocktails-button').click(function () {
        getPopularCocktails();
    });



});
