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
    }
})