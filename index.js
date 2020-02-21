function fixFooter() {
  var docHeight = $(window).height();
  var footerHeight = $('.footer').height();
  var footerTop = $('.footer').position().top + footerHeight;

  if (footerTop < docHeight) {
    $('.footer').css('margin-top', (docHeight - footerTop) + 'px');
  }
}

function shortenURL(act){
  var redir = "http";
  if($("#html").prop('checked')){
    redir = "html";
  }

  var payload = {
    "type": act,
    "url": $("#inputURL").val(),
    "redirect": redir,
    "short_code": $("#shortURL").val(),
  };

  $.ajax({
    type: "POST",
    url: "/api/shorten",
    data: JSON.stringify(payload),
    contentType: "application/json",
    dataType: "json",
    success: function(data){
      if(data.result) {
        $("#inputURL").val(data.short_url);
        $("#errormsg").addClass("hidden-xs-up");
      } else {
        $("#errormsg").text(data.error);
        $("#errormsg").removeClass("hidden-xs-up");
      }
      fixFooter();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      if(jqXHR.status == 502) {
        $("#errormsg").text("Error 502: Could not connect to mau\\Lu backend.");
        $("#errormsg").removeClass("hidden-xs-up");
      } else if (jqXHR.responseJSON) {
        $("#errormsg").text(jqXHR.responseJSON.error);
        $("#errormsg").removeClass("hidden-xs-up");
      }
      fixFooter();
    }
  });
}

function google(){
  shortenURL("google");
}

function ddg(){
  shortenURL("duckduckgo");
}

function shorten(){
  shortenURL("shorten");
}

function unshorten(){
  var payload = {
    "url": $("#inputURL").val(),
  };

  $.ajax({
    type: "POST",
    url: "/api/unshorten",
    data: JSON.stringify(payload),
    contentType: "application/json",
    dataType: "json",
    success: function(data){
      if(data.result) {
        $("#inputURL").val(data.url);
        $("#errormsg").addClass("hidden-xs-up");
      } else {
        $("#errormsg").text(data.error);
        $("#errormsg").removeClass("hidden-xs-up");
      }
      fixFooter();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      if(jqXHR.status == 502) {
        $("#errormsg").text("Error 502: Could not connect to mau\\Lu backend.");
        $("#errormsg").removeClass("hidden-xs-up");
      } else if (jqXHR.responseJSON) {
        $("#errormsg").text(jqXHR.responseJSON.error);
        $("#errormsg").removeClass("hidden-xs-up");
      }
      fixFooter();
    }
  });
}
