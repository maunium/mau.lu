function fixFooter() {
  var docHeight = $(window).height();
  var footerHeight = $('.footer').height();
  var footerTop = $('.footer').position().top + footerHeight;

  if (footerTop < docHeight) {
    $('.footer').css('margin-top', (docHeight - footerTop) + 'px');
  }
}

function submitQuery(act){
  var redir = "http";
  if($("#html").prop('checked')){
    redir = "html";
  }

  var payload = {
    "action": act,
    "url": $("#inputURL").val(),
    "redirect-type": redir,
    "short-request": $("#shortURL").val(),
  };

  $.ajax({
    type: "POST",
    url: "/query/",
    data: JSON.stringify(payload),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
      if(data.result) {
        $("#inputURL").val(data.result);
        $("#errormsg").addClass("hidden-xs-up");
      } else {
        $("#errormsg").text(data["error-long"]);
        $("#errormsg").removeClass("hidden-xs-up");
      }
      fixFooter();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      if(jqXHR.status == 502) {
        $("#errormsg").text("Error 502: Could not connect to mau\\Lu backend.");
        $("#errormsg").removeClass("hidden-xs-up");
      } else if (jqXHR.responseJSON) {
        $("#errormsg").text(jqXHR.responseJSON["error-long"]);
        $("#errormsg").removeClass("hidden-xs-up");
      }
      fixFooter();
    }
  });
}

function google(){
  submitQuery("google");
}

function ddg(){
  submitQuery("duckduckgo");
}

function shorten(){
  submitQuery("shorten");
}

function unshorten(){
  submitQuery("unshorten");
}
