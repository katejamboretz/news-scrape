$.getJSON("/articles", function (data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append("<div class='col mb-4'><div class='card m-5' style='width: 36rem;'><div class='card-body'><div class='article' data-id='" + data[i]._id + "'><h2 class='text-center m-15'>" + data[i].title + "</h2><br /><p class='text-center m-15'>" + data[i].summary + "</p><p class='text-center'><a href = 'https://www.nytimes.com" + data[i].link + "'>Link to Full Article</a></p></div></div></div>");
    }
});

$(document).on("click", ".article", function () {
    $("#notes").empty();
    var thisID = $(this).attr("data-id");


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