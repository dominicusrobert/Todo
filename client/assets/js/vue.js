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


var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    },
    methods: {
        signIn: function () {
            console.log('sign in');
        },
        getTodo: function () {
            // axios.get(
            //     'http://localhost:3000/fb/data/',
            //     {
            //         headers: {
            //             access_token: token,
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
    }

})