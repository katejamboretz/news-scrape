
function refreshSaved() {
    $("#title").empty();
    $("#articles").empty();

    $("#title").append("<div class='card'><div class='card-body'><h1 class='text-center'>Saved Articles</h1></div></div>");

    $.getJSON("/articles", function (data) {
        for (var i = 0; i < data.length; i++) {
            $("#articles").append("<div class='col mb-4'><div class='card m-5'><div class='card-body'><div class='article' data-id='" + data[i]._id + "'><h2 class='text-center m-15'>" + data[i].title + "</h2><br /><p class='text-center m-15'>" + data[i].summary + "</p><p class='text-center'><a href = 'https://www.nytimes.com" + data[i].link + "'>Link to Full Article</a></p><p><button type='button' class='btn btn-primary m-2' id='add-note' data-id='" + data[i]._id + "'>Add note</button><button type='button' class='btn btn-primary m-2' id='remove-article' data-id='" + data[i]._id + "'>Remove</button></p></div></div></div></div>");
        }
    });
}

$(document).on("click", "#saved", function () {
    refreshSaved();
});

$(document).on("click", "#scrape", function () {
    $("#title").empty();
    $("#articles").empty();

    $("#title").append("<div class='card'><div class='card-body'><h1 class='text-center'>Scraped Articles</h1></div></div>")

    $.ajax({
        method: "GET",
        url: "/scrape/",
    }).then(function (data) {
        // console.log(data);
        for (var i = 0; i < data.length; i++) {
            $("#articles").append("<div class='col mb-4'><div class='card m-5'><div class='card-body'><div class='article' data-id='" + data[i]._id + "'><h2 class='text-center m-15'>" + data[i].title + "</h2><br /><p class='text-center m-15'>" + data[i].summary + "</p><p class='text-center'><a href = 'https://www.nytimes.com" + data[i].link + "'>Link to Full Article</a></p><p><button type='button' class='btn btn-primary m-2' id='save-article' article-title='" + data[i].title + "' + article-summary='" + data[i].summary + "' article-link = '" + data[i].link + "'data-id='" + data[i]._id + "'>Save Article</button></p></div></div></div></div>");
        }
    })
});

$(document).on("click", "#clear-scrape", function () {
    $("#title").empty();
    $("#articles").empty();
})

$(document).on("click", "#save-article", function () {
    // let thisID = $(this).attr("data-id");
    let thisTitle = $(this).attr("article-title");
    let thisSummary = $(this).attr("article-summary");
    let thisLink = $(this).attr("article-link");
    console.log("Title: " + thisTitle + ", Sum: " + thisSummary + ", Link: " + thisLink);

    $.ajax({
        method: "POST",
        url: "/articles/",
        data: {
            title: thisTitle,
            summary: thisSummary,
            link: thisLink
        }
    }).then(function (data) {
        console.log(data);

    })
});

// Unsure why this function is not working... will add this functionality later

// $(document).on("click", "#delete-saved", function () {
//     $.ajax({
//         method: "DELETE",
//         url: "/articles/delete-all"
//     }).then(function (data) {
//         console.log(data);
//         refreshSaved();
//     })
// })


// notes are orphaned - need to update schema to prevent this

$(document).on("click", "#remove-article", function () {
    let thisID = $(this).attr("data-id");
    $.ajax({
        method: "DELETE",
        url: "/articles/" + thisID
    }).then(function (data) {
        console.log(data);
        $("#notes").empty();
        refreshSaved();
    })
})

$(document).on("click", "#add-note", function () {
    $("#notes").empty();
    let thisID = $(this).attr("data-id");


    $.ajax({
        method: "GET",
        url: "/articles/" + thisID
    }).then(function (data) {
        console.log(data);
        $("#notes").append("<div class='card'><div class='card-body'><h3>Notes for: " + data.title + "</h3>");
        $("#notes").append("<br/><input  class='m-3' id='titleinput' name='title' placeholder='Title' ><br/>");
        $("#notes").append("<textarea class='m-3' id='bodyinput' name='body' placeholder = 'Notes'></textarea><br/>");
        $("#notes").append("<button class = 'btn btn-primary m-3' data-id='" + data._id + "' id='savenote'>Save Note</button></div></div>");

        if (data.note) {
            $("#titleinput").val(data.note.title);
            $("#bodyinput").val(data.note.body);
        }
    })

});

$(document).on("click", "#savenote", function () {
    var thisID = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + thisID,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    }).then(function (data) {
        console.log(data);
        $("#notes").empty();
    });

    $("#titleinput").val("");
    $("#bodyinput").val("");
})