/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    data: {
        todo: {
            id: -1,
            name: '',
            done: false
        },

        todos: [],
        isChanged: false
    },
    methods: {
        addNewTodo: function (event) {
            var todo = {};
            let formData = new FormData();
            formData.append('name', this.todo.name);
            formData.append('done', false);
            //
            //
            // formData.forEach(function (value, key) {
            //
            //     todo[key] = value;
            // });

            todo.name = this.todo.name;
            todo.done = false;

            axios({
                method: 'POST',
                url: 'store',
                data: {name: this.todo.name, done: false},
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            })
                .then(function (response) {
                    //handle success
                    console.log(response);
                    todo.id = response.data.id;
                    app.todos.push(todo);
                    app.resetForm();
                })
                .catch(function (response) {
                    //handle error
                    console.log(response)
                });
        },
        getAllTodos: function () {

            axios.get('/all')
                .then(function (todos) {

                    app.todos = todos.data;

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        resetForm: function () {
            app.todo.name = '';
            app.todo.done = false;
        },
        triggerChange: function () {
            this.isChanged = true;
        },
        saveChanges: function (event, todo) {

            if (this.isChanged) {
                console.log(todo);
                console.log(event.target);

                axios({
                    method: 'PUT',
                    url: 'save',
                    data: {id: todo.id, name: todo.name, done: todo.done},
                    config: {headers: {'Content-Type': 'multipart/form-data'}}
                })
                    .then(function (response) {
                        //handle success
                        console.log(response);

                    })
                    .catch(function (response) {
                        //handle error
                        console.log(response)
                    });
            }


        },
        deleteTodo: function (event, todo) {
            axios({
                method: 'DELETE',
                url: 'delete',
                data: {id: todo.id},
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            })
                .then(function (response) {
                    //handle success
                    console.log(response);
                    app.todos.splice(app.todos.indexOf(todo), 1)

                })
                .catch(function (response) {
                    //handle error
                    console.log(response)
                });
        }
    },
    mounted: function () {
        this.getAllTodos();
    },
    watch: {}
});
