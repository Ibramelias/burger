$(document).ready(function() {
    
  $.ajax("/burgers", {
    type: "GET"
  }).then(function(data) {


    let burgers = data.burgers;
    let len = burgers.length;

    for (var i = 0; i < len; i++) {

      let text = "Devour"
      let elem = $("#not_devoured");
      let klass = "btn-primary devour"

      if (burgers[i].devoured) {
        text = "Delete";
        elem = $("#devoured");
        klass="btn-danger delete"
      }

      let new_elem = "<div class='row burger-row'><div class='col-md-9 text-center'>"+burgers[i].id+". "+burgers[i].burger_name+"</div><div class='col-md-3 text-center'><button type='button' class='btn "+klass+"' data-id='"+burgers[i].id+"'>"+text+"</button></div></div>"

      elem.append(new_elem)

    }
  })

  $(document).on("click", ".devour", function(event) {
    event.preventDefault();

    var burger_id = $(this).data("id");

    $.ajax({
      method: "PUT",
      url: "/burgers/" + burger_id,
      dataType:'json',
      contentType: 'application/json'
    }).then(function(data) {
      // reload page to display devoured burger in proper column
      location.reload();
    });

  });

  $(document).on("click", ".delete", function(event) {
    event.preventDefault();

    var burger_id = $(this).data("id");

    $.ajax({
      method: "DELETE",
      url: "/burgers/" + burger_id,
    }).then(function(data) {
      // reload page to display devoured burger in proper column
      location.reload();
    });

  });

  $(document).on("submit", ".add-burger", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger_name: $("#burger_name").val().trim()
    };

    // Send the POST request.
    $.ajax("/burgers", {
      type: "POST",
      data: JSON.stringify(newBurger),
      dataType:'json',
      contentType: 'application/json'
    }).then(function() {
      console.log("added new burger");
      // Reload the page to get the updated list
      location.reload();
    });
  });

});
