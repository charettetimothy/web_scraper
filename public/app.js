$(".scrape-new").click(function() {
  // event listener that will trigger ajax call
  $.ajax({
    method: "GET",
    url: "/api/scrape"
  }).then(function(data) {
    // With that done, add the Articles to the page
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      console.log(data.headline);
      $(".article-display").append("<h2>" + data[i].headline + "</h2>");
      $(".article-display").append("<p>" + data[i].summary + "</p>");
      $(".article-display").append("<a>" + data[i].url + "</a>");
    }
  });
});
