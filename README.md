# NYT News Scrape

This is a web app that scrapes the latest news from the New York Times website, providing users with the title, summary (if available) and link to the website. Users can save articles to reference later, and add notes to saved articles. Data is saved through Mongo, Express is used for routing, and Bootstrap is used for styling.

Ongoing issues:
- The first 3 articles provide http links, while the remaining are provided as local directory routes. The first three links are unhandled and come back undefined.
- A delete saved button is commented out, for now.
- Saved and noted content should be specific to the local machine, instead of universal.

## Link to Deployed Site

[NYT News Scrape](https://nyt-news-scrape.herokuapp.com/)


## Built With

- [Heroku](https://www.heroku.com/) - platform to deploy live websites
- [MongoDB](https://www.mongodb.com/) - noSQL database
- [mLabMongoDB](https://mlab.com/) - Heroku add-on for deploying a MongoDB
- [Node](https://nodejs.org/en/) - a Javascript libary for backend logic, or for use outside a browser
- [Mongoose](https://www.npmjs.com/package/mongoose) - node package ORM for accessing MongoDB
- [Cheerio](https://www.npmjs.com/package/cheerio) - node package for accessing MongoDB
- [Axios](https://www.npmjs.com/package/axios) - a node package for making database requests
- [Express](https://www.npmjs.com/package/express) - a node library for initiating servers and setting up routes
- [JQuery](https://jquery.com/) - a Javascript library to dynamically write content to the page
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) - HyperText Markup Language used for structure
- [CSS](https://www.w3schools.com/css/css_intro.asp) - custom styling of html
- [Subtle Patterns](https://www.toptal.com/designers/subtlepatterns/page/2/) - background pattern


## Authors

- **Kate Jamboretz** - _Initial Work_ - [katejamboretz](https://github.com/katejamboretz)
- **UCB Full Stack Development Program** - _provide guidance for app functionality_

## Acknowledgments

- UC Berkeley Extension Full Stack Development 2020 Instructor, TAs and classmates
- [PurpleBooth README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)