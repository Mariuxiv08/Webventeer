$(document).ready(function() {
    const userKey = localStorage.getItem('firebase:authUser:AIzaSyDCLWq4ztLhiD3biupsmc1RbU07xyDT7zE:[DEFAULT]');
    if (userKey) {
        const greeter = JSON.parse(userKey);
        $("#greeting").text("Hello, " + greeter.displayName);
        if (window.location == "index.html") {
            return;
        } else if (window.location == "firebase.html") {
            window.location.href = "index.html";
        }
    } else {
        window.location.href = "firebase.html";
    }

    $("#searchBtn").on("click", function(event) {
        event.preventDefault();
        $("#resultsContainer").empty();
        const category = $("#categories").find("option:selected").text();
        const location = $("#location").val();
        const resultsAmount = $("#resultsAmount").find("option:selected").text();
        const eventType = $("#eventType").find("option:selected").val();

        proxyUrl = 'https://shielded-hamlet-43668.herokuapp.com/';
        apiKey = "hzLFnwMG6SqhpZmc"
        queryURL = "http://api.eventful.com/json/events/search?app_key=" + apiKey + "&keywords=volunteer+" + category + "&location=" + location + "&page_size=" + resultsAmount;

        $.ajax({
                url: proxyUrl + queryURL,
                headers: {
                    authorization: 'Bearer ' + apiKey
                },
            })
            .done(response => {
                const obj = JSON.parse(response)
                console.log(obj)
                if (obj.events == null) {
                    const noResults = $("<p>");
                    noResults.text("No results found. Please try again later or try another location.");
                    $("#resultsContainer").append(noResults);
                    return;
                }
                for (let i = 0; i < obj.events.event.length; i++) {
                    const result = obj.events.event[i]
                    const newResult = $("<div>");
                    const resultLink = $("<a>");
                    const resultTitle = $("<h4>");
                    const resultDescription = $("<p class='paralignment'>");
                    const resultLocation = $("<p>");
                    const resultTime = $("<p>");
                    const resultMap = $("<img>");
                    const resultLocationString = result.venue_address + " " + result.city_name + ", " + result.region_abbr + " " + result.postal_code;

                    const resultTimeSplit = result.start_time.split(" ");
                    const convertTime = new Date(result.start_time);
                    const hh = convertTime.getHours();
                    let m = convertTime.getMinutes();
                    let dd = "AM";
                    var h = hh;
                    if (h >= 12) {
                        h = hh - 12;
                        dd = "PM";
                    }

                    if (h == 12) {
                        h = 12
                    }

                    m = m < 10 ? "0" + m : m;

                    const newResultTime = h + ":" + m + " " + dd;

                    resultLink.attr("href", result.url);
                    resultLink.attr("target", "_blank");
                    resultTitle.text(result.title);
                    resultDescription.html(result.description);
                    resultLocation.html("<strong>Location: </strong>" + resultLocationString);
                    resultTime.html("<strong>Date: </strong>" + resultTimeSplit[0] + "<br /><strong>Time: </strong>" + newResultTime);
                    resultMap.attr("src", "https://maps.googleapis.com/maps/api/staticmap?center=" + resultLocationString + "&zoom=14&size=640x200&markers=color:red|" + resultLocationString + "&key=AIzaSyD8hdaFJ3hGdnX1aS4nFWAoa2zQv8U4k_o")

                    resultLink.append(resultTitle);
                    newResult.append(resultLink, resultDescription, resultLocation, resultTime, resultMap);
                    $("#resultsContainer").append(newResult);
                }
            })
            .catch(error => {
                console.error(error);
            })

    });

    $('#aboutLink').on('click', function() {
        $("html, body").animate({ scrollTop: $('html, body').height() + 3000 });
    });

    $('#searchLink').on('click', function() {
        // const top = $('#search').offset().top;
        $("html, body").animate({ scrollTop: $('#search-box').height() + 120 });
    });

    $('#homeLink').on('click', function() {
        const top = $('#home').offset().top;

        $("html, body").animate({ scrollTop: top + "0" });
    });

    $("#signOut").on("click", function() {
        localStorage.removeItem('firebase:authUser:AIzaSyDCLWq4ztLhiD3biupsmc1RbU07xyDT7zE:[DEFAULT]');
    })

})