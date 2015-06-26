$(function(){
    $.get("newsPostTemplate.html", function(data){
        $.template("cachedNewsPostTemplate", data );
    });

    $.get("newsDescriptionTemplate.html", function(data){
        $.template("cachedNewsDescriptionTemplate", data );
    });

    getData("http://pipes.yahoo.com/pipes/pipe.run?_id=e9a2e77dffb3205d035c4e311d77bbe6&_render=json", generateContent, handleError);

    $("#all-news").delegate(".news-post", "click", this, toggleDescription);
});

function getData(url, callback, errorHandler){
    $.ajax({
        type: 'GET',
        url: url,
        async: true,
        dataType: 'json',
        success: function(data){
            callback(data);
        },
        error: function(request, textStatus, message){
            errorHandler(textStatus);
        }
    });
}

function generateContent(data){
    $.tmpl("cachedNewsPostTemplate", data.value.items).appendTo("#all-news");
}

function handleError(textStatus) {
    $("#header").find("h1").text("Ooops...Something went wrong.");
    alert("Request aborted. Reason: " + textStatus);
}

function toggleDescription() {
    $(this).find(".news-description").slideToggle();
}