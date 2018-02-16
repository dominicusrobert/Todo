function sendTokenToServer(token) {
    console.log('SEND TOKEN TO SERVER')
    console.log(token)
    // axios.get(
    //     'http://localhost:3000/fb/data/',
    //     {
    //         headers: {
    //             access_token : token,
    //         }
    //     })
    //     .then(function (response) {
    //         console.log('AXIOS response');
    //         console.log(response.data);
    //     })
    //     .catch(function (error) {
    //         console.log('error');
    //         console.log(error);
    //     });
}

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        console.log('connected', response);
        sendTokenToServer(response.authResponse.accessToken);
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '377410622722299',
        cookie: true,
        xfbml: true,
        version: 'v2.8'
    });

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });

};


(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));