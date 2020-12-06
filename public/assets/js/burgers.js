
$(function () {
  $.ajax("/burgers", {
    type: "GET"
  }).then(function (data) {


    let burgers = data.burgers;
    let len = burgers.length;

    let ul_elem_eat = $("#eat-burger")
    let ul_elem_del = $("#delete-burger")

    for (var i = 0; i < length; i++) {
      if (burgers[i].devoured === 0) {
        ul_elem_eat.append("<li>" +
          "<button data-id='" +
          burgers[i].id + "' data-devoured='" + burgers[i].devoured + "' class='btn btn-danger eat'>Eat!</button>"
          + burgers[i].burger_name + "</li>")
      }
      else {
        ul_elem_del.append("<li>" +
          "<button data-id='" +
          burgers[i].id + "' data-devoured='" + burgers[i].devoured + "' class='btn btn-danger delete'>Delete!</button>"
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
$(document).on("click",".submit", function (event) {
  // Make sure to preventDefault on a submit event.
  event.preventDefault();

  var burgerName = $("#burger_name").val()
  console.log(burgerName);

  var newBurger = {
    name: burgerName,
    devoured: false,
  }


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




















