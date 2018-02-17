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
    template: `#todo-template`,
    props: ['todolist'],
    computed: {
        list: function () {
            return this.todolist
        }
    }
})

Vue.component('inprogress', {
    template: `#inprogress-template`,
    props: ['progresslist'],
    computed: {
        list: function () {
            return this.progresslist
        }
    }
})

Vue.component('done', {
    template: `#done-template`,
    props: ['donelist'],
    computed: {
        list: function () {
            return this.donelist
        }
    }
})


var vueApp = new Vue({
    el: '#app',
    data: function () {
        return {
            fb_token: '',
            jwt: '',
            userList: []
        }
    },
    created: function () {
        facebookInvocationMethod(document, 'script', 'facebook-jssdk');
    },
    computed: {
        todoList: function () {
            return this.userList.filter(obj => {
                return obj.status == "TODO";
            })
        },
        progressList: function () {
            return this.userList.filter(obj => {
                return obj.status == "PROGRESS";
            })
        },
        doneList: function () {
            return this.userList.filter(obj => {
                return obj.status == "DONE";
            })
        }
    },
    methods: {
        getUserTodo: function (jwt) {
            this.jwt = jwt;

            axios.get(`${HOST}/todo/list/`, { headers: { jwt: jwt } })
                .then(function (response) {
                    response.data.data.forEach(function (object) {
                        this.vueApp.userList.push(object);
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

})