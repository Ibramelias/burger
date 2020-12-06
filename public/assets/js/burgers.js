
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

$(document).on("click",".eat", function (event) {
  event.preventDefault();

  var burger_id = $(this).data("id");

  $.ajax({
    method: "PUT",
    url: "/burgers/" + burger_id,
    dataType: 'json',
    contentType: 'application/json'
  }).then(function (data) {
    // reload page to display devoured burger in proper column
    location.reload();
  });

});

$(document).on("click",".delete", function (event) {
  event.preventDefault();

  var burger_id = $(this).data("id");

  $.ajax({
    method: "DELETE",
    url: "/burgers/" + burger_id,
  }).then(function (data) {
    // reload page to display devoured burger in proper column
    location.reload();
  });

});

// POST New Burger Name.
$("#addBurger").on("submit", function (event) {
  // Make sure to preventDefault on a submit event.
  event.preventDefault();

  let newBurger = { burger_name: $("#addBurger [name=burger_name]").val().trim()};


  // Send the POST request.
  $.ajax("/burgers", {
    type: "POST",
    data: JSON.stringify(newBurger),
    dataType: 'json',
    contentType: 'application/json'
  }).then(function () {
    console.log("added new burger");
    // Reload the page to get the updated list
    location.reload();
  });
});
















