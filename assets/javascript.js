$(document).ready(function(){
    $("#searchBtn").on("click", function() {
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
		const event = obj.events.event[0].title;
		console.log(event)
	})
	.catch(error => {
		console.error(error);

	});
    }) 
})