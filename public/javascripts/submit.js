var createChar = function() {

    var chname = document.getElementById("input").value;

    if(chname == ""){
      warning("You give me nothing? I give you nothing!");
      return;
    }

    var chtoken = rand(9);

    var toSend = JSON.stringify({ name:chname, token:chtoken });

    var xhr = createCORSRequest('POST', "http://aurora.quantonz.com:9000/adventurers");
    if (!xhr) {
      throw new Error('CORS not supported');
    }

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

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}
