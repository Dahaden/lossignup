var createChar = function() {
    //var data = { name:"Barney", token:"12345" };
    var chname = document.getElementById("input").value;

    if(chname == ""){
      warning("You give me nothing? I give you nothing!");
      return;
    }

    var chtoken = rand(9);

    var toSend = JSON.stringify({ name:chname, token:chtoken });

    $.ajax({
    type: 'POST',
    url: 'http://aurora.quantonz.com:9000/adventurers',
    crossDomain: true,
    data: toSend,
    dataType: 'json',
    success: function(responseData, textStatus, jqXHR) {
        var value = responseData.someKey;
        $("#submit").toggle(200);
        $("#confirm").toggle(200);

        $("#name").html($("#name").html() + " " + chname);
        $("#token").html($("#token").html() + " " + chtoken);

        if($("#warning").css("display") != "none") {
          $("#warning").toggle(200);
        }
    },
    error: function (responseData, textStatus, errorThrown) {
        warning("Something went wrong...")
    }
});
}

function warning(text) {
  $("#warning").html(text);
  if($("#warning").css("display") == "none") {
    $("#warning").toggle(200);
  }
}

function rand(length,current){
 current = current ? current : '';
 return length ? rand( --length , "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt( Math.floor( Math.random() * 60 ) ) + current ) : current;
}
