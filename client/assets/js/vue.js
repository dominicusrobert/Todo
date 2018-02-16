const HOST = 'http://localhost:3000';

/**
 * Facebook
 */
function sendTokenToServer(token) {
    axios.post(`${HOST}/user/fb`, {}, { headers: { fb_token: token } })
        .then(function (response) {
            vueApp.getUserTodo(response.data.token);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function statusChangeCallback(response) {
    if (response.status === 'connected') {
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

function facebookInvocationMethod(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}


/**
 * Vue 
 */

Vue.component('dropdown-sort', {
    template: `#dropdown-sort-template`
})

Vue.component('todo', {
    template: `#todo-template`
})

Vue.component('inprogress', {
    template: `#inprogress-template`
})

Vue.component('done', {
    template: `#done-template`
})


var vueApp = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        fb_token: '',
        jwt: ''
    },
    created: function () {
        facebookInvocationMethod(document, 'script', 'facebook-jssdk');
    },
    methods: {
        getUserTodo: function (jwt) {
            axios.get(`${HOST}/todo/list/`, { headers: { jwt: jwt } })
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

})