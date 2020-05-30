var cheerio = require("cheerio");
var axios = require("axios");

console.log("Grabbing NYT news articles");

axios.get("https://www.nytimes.com/").then(function (response) {

    var $ = cheerio.load(response.data);

    var results = [];

    $("article").each(function (i, element) {
        var title = $(element).find("h2").text();
        var alt_title = $(element).find("span.balancedHeadline")
        var summary = $(element).find("p.e1lfvv700").text();
        var alt_summary = $(element).find("ul").text();
        var link = $(element).find("a").attr("href");

        if (link !== undefined) {
            results.push({
                title: title || alt_title,
                summary: summary || alt_summary,
                link: link,
            });
        }
    });

    console.log(results);
})