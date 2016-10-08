function loadCountries(selector) {
    $.ajax({
        url: 'https://restcountries.eu/rest/v1/all',
        context: document.body
    }).done(function (countries) {
        var $countries = $(selector);

        countries.forEach(function (country) {
            $countries.append('<option value="' + country.name + '">');
        });
    });
}