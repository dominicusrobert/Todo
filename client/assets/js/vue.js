const HOST = 'http://localhost:3000';

/**
 * Facebook
 */
function sendTokenToServer(token) {
    vueApp.fb_token = token;
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

function getLoginStatus(callback){
    FB.getLoginStatus(function (response) {
        callback(response.status === 'connected');
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
    js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.12&appId=377410622722299&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



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
            if (this.todolist.length != 0) {
                this.todolist.map(item => {
                    let deadlineDate = new Date(item.deadline);
                    let day = deadlineDate.getDate();
                    let month = deadlineDate.getMonth() + 1;
                    let year = deadlineDate.getFullYear();
                    item.duedate = `${day} - ${month} - ${year}`
                });
            }
            return this.todolist
        }
    }
})

Vue.component('inprogress', {
    template: `#inprogress-template`,
    props: ['progresslist'],
    computed: {
        list: function () {
            if (this.progresslist.length != 0) {
                this.progresslist.map(item => {
                    let deadlineDate = new Date(item.deadline);
                    let day = deadlineDate.getDate();
                    let month = deadlineDate.getMonth() + 1;
                    let year = deadlineDate.getFullYear();
                    item.duedate = `${day} - ${month} - ${year}`
                });
            }
            return this.progresslist
        }
    }
})

Vue.component('done', {
    template: `#done-template`,
    props: ['donelist'],
    computed: {
        list: function () {
            if (this.donelist.length != 0) {
                this.donelist.map(item => {
                    let deadlineDate = new Date(item.deadline);
                    let day = deadlineDate.getDate();
                    let month = deadlineDate.getMonth() + 1;
                    let year = deadlineDate.getFullYear();
                    item.duedate = `${day} - ${month} - ${year}`
                });
            }
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
            userList: [],
            newTask: {
                task_name: '',
                priority_level: '',
                due_date: ''
            }
        }
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
        },
        isLoggedIn: function () {
            return this.jwt != '';
        }
    },
    methods: {
        logoutFB: function () {
            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    FB.logout(function (response) {
                        location.reload();
                    });
                }
            })
        },
        showAddTaskDialog: function () {
            document.querySelector('#modal-add-task').classList.add('is-active');
        },
        closeAddTaskDialog: function () {
            document.querySelector('#modal-add-task').classList.remove('is-active');
        },
        saveNewTask: function () {
            let submitObject = {
                name: this.newTask.task_name,
                priority_level: this.newTask.priority_level,
                deadline: this.newTask.due_date
            };

            axios.post(`${HOST}/todo`, submitObject, { headers: { jwt: this.jwt } })
                .then(function (response) {
                    this.vueApp.newTask = {};
                    this.vueApp.userList.push(response.data.data);
                    this.vueApp.closeAddTaskDialog();
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
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