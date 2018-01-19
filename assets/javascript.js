$(document).ready(function() {
    $("#searchBtn").on("click", function(event) {
        event.preventDefault();
        const category = $("#categories").find("option:selected").text();
        const location = $("#location").val();
        const resultsAmount = $("#resultsAmount").find("option:selected").text();

        proxyUrl = 'https://shielded-hamlet-43668.herokuapp.com/';
        apiKey = "hzLFnwMG6SqhpZmc"
        queryURL = "http://api.eventful.com/json/events/search?app_key=" + apiKey + "&keywords=volunteer+" + category + "&location=" + location + "&date=Future&page_size=" + resultsAmount;

        $.ajax({
                url: proxyUrl + queryURL,
                headers: {
                    authorization: 'Bearer ' + apiKey
                },
            })
            .done(response => {
                const obj = JSON.parse(response)
                console.log(obj)
            })
            .catch(error => {
                console.error(error);
            })

    })
    $('#aboutLink').on('click', function() {
        $("html, body").animate({ scrollTop: $('html, body').height() + "3000" });
    });
    $('#searchLink').on('click', function() {
        const top = $('#search').offset().top;
        $("html, body").animate({ scrollTop: top + "580" });
    });
    $('#homeLink').on('click', function() {
        const top = $('#search').offset().top;
        $("html, body").animate({ scrollTop: top + "0" });
    });
})