
function onClick(content){
    try{
        sendPost(content);
    }catch(err){
        console.error(err);
    }
}

function sendPost(content){
    let data = extractForm(document.getElementById("mForm"));
    if(document.getElementById("deal")){
        data.dealData = document.getElementById("deal").getAttribute("data-deal");
    }
    //let state = document.getElementById("state").getAttribute("data-state");
    console.log('Page content was requested: ' + content);
    console.log(data);

    $.ajax({
        url: document.location.origin + "/"  + content,
        type: 'POST',
        data: JSON.stringify(data),
        processData: false,
        contentType: "application/json; charset=utf-8",
        error: function(err){
            console.log("error:");
            console.log(err);
        },
        success: function (data) {
            //document.getElementById("content").innerHTML = data;
            //by using jquery to replace the innerHTML we allow inserted script tags to be evaluated
            $("#content").html(data);
        }
    });
}

function extractForm(form) {
    var data = {};
    for (var x=0; x < form.elements.length; x++) {
        var field = form.elements[x];
        if (field.name && field.type !== "submit") {
            data[field.name] = (field.type == "radio" || field.type == "checkbox") ? (field.checked == "checked") : field.value;
        }
    }
    return data;
}
