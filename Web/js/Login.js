 var googleUser = {};

  var startApp = function() {
    gapi.load('auth2', function(){
      auth2 = gapi.auth2.init({
        client_id: '220046422079-4kh9474bd11aqt4rjebdq3ir0f0bjj1i.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
       attachSignin(document.getElementById('loginBtn'));
    });
  };

  function attachSignin(element) {    
    auth2.attachClickHandler(element, {},
        function(googleUser) {   
          sessionStorage.setItem("UserEmailId",googleUser.getBasicProfile().getEmail());
          sessionStorage.setItem("UserAvatar",googleUser.getBasicProfile().getImageUrl());
          sessionStorage.setItem("UserProfileGoogle",JSON.stringify(googleUser));
          window.location.pathname = '/ChatBot.html'
              //googleUser.getBasicProfile().getName();
        }, function(error) {
          //alert(JSON.stringify(error, undefined, 2));
        });
  }

startApp();