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

function getLoginStatus(callback) {
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

Vue.component('todo', {
    template: `#todo-template`,
    props: ['jwt', 'todolist', 'edittask'],
    computed: {
        list: function () {
            if (this.todolist.length != 0) {
                this.todolist.map(item => {
                    item.duedate = new Date(item.deadline).toISOString().substr(0, 10);
                });
            }

            return this.todolist;
        }
    },
    methods: {
        deleteTaskChild: function (taskId) {
            axios.delete(`${HOST}/todo/id/${taskId}`, { headers: { jwt: this.jwt } })
                .then(function (response) {
                    this.vueApp.taskList.forEach(function (item, index) {
                        if (item.todo_id == response.data.id) {
                            this.vueApp.taskList.splice(index, 1);
                            return;
                        }
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        showEditTaskDialog: function (taskId, name, priority_level, due_date) {
            this.edittask.todo_id = taskId;
            this.edittask.task_name = name;
            this.edittask.priority_level = priority_level;
            this.edittask.due_date = due_date;

            document.querySelector('#modal-edit-task').classList.add('is-active');
        },
        changeStatus: function (taskId, status) {
            axios.put(`${HOST}/todo/id/${taskId}/markTodo`, { status: status }, { headers: { jwt: this.jwt } })
                .then(function (response) {

                    for (let index = 0; index < this.vueApp.taskList.length; index++) {
                        let object = this.vueApp.taskList[index];

                        if (response.data.data.todo_id == object.todo_id) {
                            this.vueApp.taskList.splice(index, 1, response.data.data);
                            break;
                        }
                    }

                    this.vueApp.closeEditTaskDialog();

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
})

Vue.component('inprogress', {
    template: `#inprogress-template`,
    props: ['jwt', 'progresslist', 'edittask'],
    computed: {
        list: function () {
            if (this.progresslist.length != 0) {
                this.progresslist.map(item => {
                    item.duedate = new Date(item.deadline).toISOString().substr(0, 10);
                });
            }
            return this.progresslist
        }
    },
    methods: {
        deleteTaskChild: function (taskId) {
            axios.delete(`${HOST}/todo/id/${taskId}`, { headers: { jwt: this.jwt } })
                .then(function (response) {
                    this.vueApp.taskList.forEach(function (item, index) {
                        if (item.todo_id == response.data.id) {
                            this.vueApp.taskList.splice(index, 1);
                            return;
                        }
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        showEditTaskDialog: function (taskId, name, priority_level, due_date) {
            this.edittask.todo_id = taskId;
            this.edittask.task_name = name;
            this.edittask.priority_level = priority_level;
            this.edittask.due_date = due_date;

            document.querySelector('#modal-edit-task').classList.add('is-active');
        },
        changeStatus: function (taskId, status) {
            axios.put(`${HOST}/todo/id/${taskId}/markTodo`, { status: status }, { headers: { jwt: this.jwt } })
                .then(function (response) {

                    for (let index = 0; index < this.vueApp.taskList.length; index++) {
                        let object = this.vueApp.taskList[index];

                        if (response.data.data.todo_id == object.todo_id) {
                            this.vueApp.taskList.splice(index, 1, response.data.data);
                            break;
                        }
                    }

                    this.vueApp.closeEditTaskDialog();

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
})

Vue.component('done', {
    template: `#done-template`,
    props: ['jwt', 'donelist', 'edittask'],
    computed: {
        list: function () {
            if (this.donelist.length != 0) {
                this.donelist.map(item => {
                    item.duedate = new Date(item.deadline).toISOString().substr(0, 10);
                });
            }
            return this.donelist
        }
    },
    methods: {
        deleteTaskChild: function (taskId) {
            axios.delete(`${HOST}/todo/id/${taskId}`, { headers: { jwt: this.jwt } })
                .then(function (response) {
                    this.vueApp.taskList.forEach(function (item, index) {
                        if (item.todo_id == response.data.id) {
                            this.vueApp.taskList.splice(index, 1);
                            return;
                        }
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        showEditTaskDialog: function (taskId, name, priority_level, due_date) {
            this.edittask.todo_id = taskId;
            this.edittask.task_name = name;
            this.edittask.priority_level = priority_level;
            this.edittask.due_date = due_date;

            document.querySelector('#modal-edit-task').classList.add('is-active');
        },
        changeStatus: function (taskId, status) {
            axios.put(`${HOST}/todo/id/${taskId}/markTodo`, { status: status }, { headers: { jwt: this.jwt } })
                .then(function (response) {

                    for (let index = 0; index < this.vueApp.taskList.length; index++) {
                        let object = this.vueApp.taskList[index];

                        if (response.data.data.todo_id == object.todo_id) {
                            this.vueApp.taskList.splice(index, 1, response.data.data);
                            break;
                        }
                    }

                    this.vueApp.closeEditTaskDialog();

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
})


var vueApp = new Vue({
    el: '#app',
    data: function () {
        return {
            fb_token: '',
            jwt: '',
            taskList: [],
            newTask: {
                task_name: '',
                priority_level: '',
                due_date: ''
            },
            editTask: {
                todo_id: '',
                task_name: '',
                priority_level: '',
                due_date: ''
            },
            todoSortby: '',
            progressSortby: '',
            doneSortby: ''
        }
    },
    computed: {
        todoList: function () {
            return this.taskList.filter(obj => {
                return obj.status == "TODO";
            })
            .sort(this.sortProperty(this.todoSortby))
        },
        progressList: function () {
            return this.taskList.filter(obj => {
                return obj.status == "PROGRESS";
            })
            .sort(this.sortProperty(this.progressSortby))
        },
        doneList: function () {
            return this.taskList.filter(obj => {
                return obj.status == "DONE";
            })
            .sort(this.sortProperty(this.doneSortby))
        },
        isLoggedIn: function () {
            return this.jwt != '';
        }
    },
    methods: {
        sortProperty(prop) {
            return (a, b) => {
                if (a[prop] < b[prop]) return -1;
                if (a[prop] > b[prop]) return 1;
                return 0;
            }
        },
        loginFB: function () {
            FB.login(function(response) {
                if (response.authResponse) {
                    this.checkLoginState();
                    // access_token = response.authResponse.accessToken; //get access token
                    // user_id = response.authResponse.userID; //get FB UID
                } 
            }, 
            {
                scope: 'public_profile,email'
            });
        },
        logoutFB: function () {
            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    FB.logout(function (response) {
                        location.reload();
                    });
                }
            })
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
                    this.vueApp.taskList.push(response.data.data);
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
                        this.vueApp.taskList.push(object);
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        editUserTask: function () {
            let editObject = {
                name: this.editTask.task_name,
                priority_level: this.editTask.priority_level,
                deadline: this.editTask.due_date
            };

            axios.put(`${HOST}/todo/id/${this.editTask.todo_id}`, editObject, { headers: { jwt: this.jwt } })
                .then(function (response) {

                    for (let index = 0; index < this.vueApp.taskList.length; index++) {
                        let object = this.vueApp.taskList[index];

                        if (response.data.data.todo_id == object.todo_id) {
                            this.vueApp.taskList.splice(index, 1, response.data.data);
                            break;
                        }
                    }

                    this.vueApp.closeEditTaskDialog();

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        showAddTaskDialog: function () {
            document.querySelector('#modal-add-task').classList.add('is-active');
        },
        closeAddTaskDialog: function () {
            document.querySelector('#modal-add-task').classList.remove('is-active');
        },
        closeEditTaskDialog: function () {
            document.querySelector('#modal-edit-task').classList.remove('is-active');
        }
    }

})