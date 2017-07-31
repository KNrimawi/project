
var passwordMatch= false;
$(function(){
  var loginFormInstance    = $('#login-form').parsley(),
      registerFormInstance = $('#register-form').parsley();


    $('#register-submit').click(function(e){

        var data = {
            username : $('#username-register').val().trim() ,
            password : $('#password-register').val().trim(),
            email    : $('#email-register').val().trim()
        };

        data = JSON.stringify(data);



        if($('#register-form').parsley().validate()){
            $.ajax({
              type:"POST",
              url:"http://99e28565.ngrok.io/createAccount",
              data:data,
              dataType:"json",
              success:function(){
                  showLoginForm();
              },
              error:function (response, textStatus, errorThrown) {
                //  $('#error-message-register').html( JSON.parse(response.responseText).message);
                  $.toast({
                    heading : 'Successfully registered',
                    text:'You have Successfully signed up!',
                    hideAfter : 5000,
                    showHideTransition : 'fade',
                    position : 'bottom-right',
                    icon : 'success'
                  });
              }

            });
      }




});


    $('#login-submit').click(function(){



        var data ={
            username :$('#username-login').val().trim(),
            password : $('#password-login').val().trim()
        };

        data = JSON.stringify(data);
        if($('#login-form').parsley().validate()){
            $.ajax({
                type:"POST",
                url:"http://99e28565.ngrok.io/login",
                data:data,
                dataType:"json",
                success: function(data){
                  localStorage.setItem('token',data.message);
                  window.location.replace("HTML_pages/Home.html");

                },

                error: function (response, textStatus, errorThrown) {
                    $('#error-message').html( JSON.parse(response.responseText).message);

                }

          });
      }


});

  function showLoginForm(){
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $('#register-form-link').removeClass('active');
    $('#login-form-link').addClass('active');
    $('#username-login').val($('#username-register').val());
  }
});
