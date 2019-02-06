$( ".scrape-new" ).click(function() {  // event listener that will trigger ajax call
        // Empty the notes from the note section
        // $("#notes").empty();
        // Save the id from the p tag
        // var thisId = $(this).attr("data-id");
        // Now make an ajax call for the Article
        $.ajax({
          method: "GET",
          url: "/api/scrape"
        })
          .then(function(data) { // With that done, add the Articles to the page
            console.log(data);
            for (let i = 0; i < data.length; i++) {  
            // The title of the article
            $(".article-container").append("<h2>" + data.title + "</h2>");
            // An input to enter a new title
            $(".article-container").append("<input id='titleinput' name='title' >");
            // A textarea to add a new note body
            $(".article-container").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $(".article-container").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
            }
            // If there's a note in the article
            if (data.note) {
              // Place the title of the note in the title input
              $("#titleinput").val(data.note.title);
              // Place the body of the note in the body textarea
              $("#bodyinput").val(data.note.body);
            }
          });
      });
  