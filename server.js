// Required packages

var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

// Require models

db = require("./models");

// Set PORT

var PORT = 3000;

// Initialize Express

var app = express();

// Configure middleware

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Connect to Mongo DB

var MONGODB_URI = process.env.MONDODB_URI || "mongodb://localhost/newsScrape";

mongoose.connect(MONGODB_URI, { urlNewUrlParser: true });

// Routes

app.get("/scrape", function (req, res) {

    console.log("Grabbing NYT news articles");

    axios.get("https://www.nytimes.com/").then(function (response) {

        var $ = cheerio.load(response.data);

        $("article").each(function (i, element) {
            let result = {};

            let title = $(element).find("h2").text();
            let alt_title = $(element).find("span.balancedHeadline")
            let summary = $(element).find("p.e1lfvv700").text();
            let alt_summary = $(element).find("ul").text();
            let link = $(element).find("a").attr("href");

            // if ((summary = '' || "" || undefined) & (alt_summary = "" || '' || undefined)) {
            //     let summary = "Article summary not available."


            if (link !== undefined) {
                result.title = title || alt_title,
                    result.summary = summary || alt_summary,
                    result.link = link,

                    db.Article.create(result).then(function (dbArticle) {
                        console.log(dbArticle);
                    }).catch(function (err) {
                        console.log(err);
                    })
            }
            // }
        });

        res.send("Scrape Complete");
    })

});

app.get("/articles", function (req, res) {
    db.Article.find({}).then(function (dbArticle) {
        res.json(dbArticle);
    }).catch(function (err) {
        res.json(err);
    })
});

app.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id }).populate("note").then(function (dbArticle) {
        res.json(dbArticle);
    }).catch(function (err) {
        res.json(err);
    })
});

app.post("/articles/:id", function (req, res) {
    db.Note.create(req.body).then(function (dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    }).then(function (dbArticle) {
        res.json(dbArticle);
    }).catch(function (err) {
        res.json(err);
    });
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});