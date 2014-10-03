$(document).ready(function () {

  var ERR_BAD_CREDENTIALS = -1,
      ERR_USER_EXISTS = -2,
      ERR_BAD_USERNAME = -3,
      ERR_BAD_PASSWORD = -4;

  $('#logged-in-screen').hide();

  $('#login').click(function (e) {
    e.preventDefault();

    var username = $('#username').val(),
        password = $('#password').val();

    $.ajax({
      type: 'post',
      url: '/users/login',
      data: JSON.stringify({ 
        user: username,
        password: password
      }),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        if (data.errCode === ERR_BAD_CREDENTIALS) {
          console.log('BAD_CREDENTIALS');
          $('#message').html("Invalid username and password combination. Please try again.");
        } else {
          console.log('SUCCESS');
          $('#username-placeholder').html(username);
          $('#count-placeholder').html(data.count);

          $('#main-screen').hide();
          $('#logged-in-screen').show();
        }
      }
    });
  });

  $('#add-user').click(function (e) {
    e.preventDefault();

    var username = $('#username').val(),
        password = $('#password').val();

    $.ajax({
      type: 'post',
      url: '/users/add',
      data: JSON.stringify({ 
        user: username,
        password: password
      }),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        if (data.errCode === ERR_USER_EXISTS) {
          console.log('ERR_USER_EXISTS');
          $('#message').html("This username already exists. Please try again.");
        } else if (data.errCode === ERR_BAD_USERNAME) {
          $('#message').html("The user name should be non-empty and at most 128 characters long. Please try again.");
        } else if (data.errCode === ERR_BAD_PASSWORD) {
          $('#message').html("The password should be at most 128 characters long. Please try again.");
        } else {
          console.log('SUCCESS');
          $('#username-placeholder').html(username);
          $('#count-placeholder').html(data.count);

          $('#main-screen').hide();
          $('#logged-in-screen').show();
        }
      }
    });
  });

});