
$(function () {
  $.ajax("/burgers", {
    type: "GET"
  }).then(function (data) {


    let burgers = data.burgers;
    let len = burgers.length;

    let ul_elem_eat = $("#devoured")
    let ul_elem_del = $("#not_devoured")

    for (var i = 0; i < len; i++) {
      if (burgers[i].devoured === 0) {
        ul_elem_eat.append("<li>" +
          "<button data-id='" +
          burgers[i].id + "' data-devoured='" + burgers[i].devoured + "' class='submit btn-primary eat'>Eat!</button>"
          + burgers[i].burger_name + "</li>")
      }
      else {
        ul_elem_del.append("<li>" +
          "<button data-id='" +
          burgers[i].id + "' data-devoured='" + burgers[i].devoured + "' class='submit btn-primary delete'>Delete!</button>"
          + burgers[i].burger_name + "</li>")
      }
    }
  })
})

$(document).on("click", ".eat", function (e) {
  let id = $(this).data("id");
  let isDevoured = $(this).data("devoured") === 0;

  console.log(`Burger id clicked: ${id} and isDevoured: ${isDevoured}`);

  let burgerState = {
      devoured: isDevoured
  };

  // PUT request to update burgers.
  $.ajax("/burgers/" + id, {
      type: "PUT",
      data: JSON.stringify(burgerState),
      dataType: "json",
      contentType: "application/json"
  }).then(function () {
      console.log(`Changed burger state to: ${burgerState}`);
      location.reload();
  })
});

// POST New Burger Name.
$(".submit").on("click", function(event) {
  event.preventDefault();
  var burgerName = $("#burger_name").val().trim();
  console.log(burgerName);
  var newBurger = {
      name: burgerName,
      devoured: false
  };

  // Send the POST request.
  $.ajax("/burgers", {
    type: "POST",
    data: JSON.stringify(newBurger),
    dataType:'json',
    contentType: 'application/json'
  }).then(function() {
    console.log("created new burger");
    // Reload the page to get the updated list
    location.reload();
  });
});


$(document).on("click", ".delete", function (event) {
  var id = $(this).data("id");

  // Send the DELETE request.
  $.ajax("/burgers/" + id, {
      type: "DELETE"
  }).then(function () {
      console.log("deleted burger", id);
      // Reload the page to get the updated list
      location.reload();
  });
});
















