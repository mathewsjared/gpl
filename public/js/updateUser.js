'use strict';

var button = document.querySelector('button');

var oriUsername = document.querySelector('form').username.value;

button.addEventListener('click', function(event) {
  event.preventDefault();
  var form = document.querySelector('form');
  var user = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    username: form.username.value,
    password: form.password.value
  };

  var url = 'http://localhost:3000/users/' + oriUsername;

  $.put(url, user, function(data){
    window.location.replace(data + user.username);
  });
});


$.put = function(url, data, callback) {

  return $.ajax({
    url: url,
    type: 'PUT',
    success: callback,
    data: data,
    contentType: "application/x-www-form-urlencoded; charset=UTF-8"
  });
};
