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
        sharedUsers: [],
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

                    $.toast({
                        heading: 'Success',
                        text: 'Todo successfully added.',
                        showHideTransition: 'slide',
                        icon: 'success'
                    });

                    //handle success
                    todo.id = response.data.id;
                    app.todos.push(todo);
                    app.resetForm();
                })
                .catch(function (response) {
                    //handle error

                    $.toast({
                        heading: 'Error',
                        text: 'error while saving!',
                        showHideTransition: 'fade',
                        icon: 'error'
                    })
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


                axios({
                    method: 'PUT',
                    url: 'save',
                    data: {id: todo.id, name: todo.name, done: todo.done},
                    config: {headers: {'Content-Type': 'multipart/form-data'}}
                })
                    .then(function (response) {
                        //handle success
                        $.toast({
                            heading: 'Success',
                            text: 'save successfully.',
                            showHideTransition: 'slide',
                            icon: 'success'
                        });


                    })
                    .catch(function (response) {
                        //handle error
                        $.toast({
                            heading: 'Error',
                            text: 'error while saving!',
                            showHideTransition: 'fade',
                            icon: 'error'
                        })
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
                    app.todos.splice(app.todos.indexOf(todo), 1)

                })
                .catch(function (response) {
                    //handle error
                });
        },
        shareTodo: function (event, todo) {
            console.log(todo);
            axios.get('/allUsers')
                .then(function (response) {
                    var users = response.data;
                    let userShareModal = $("#userShareModal");
                    let table = userShareModal.find("#userTable");
                    let body = table.find("tbody");
                    body.empty();
                    $.each(users, function (k, user) {
                        var isShared = false;
                        $.each(user.shared_todos, function (ki, vi) {

                            if (todo.id === vi.id) {
                                isShared = true;
                            }
                        });

                        var checked = isShared ? 'checked' : '';
                        let html = "<tr>" +
                            "<td>" + user.name + "</td>" +
                            "<td><input type='checkbox' name='user' value='" + user.id + "' " + checked + " @click='pushUsers($event," + todo + "," + user + ")'></td>" +
                            "</tr>";
                        body.append(html);
                    });


                    userShareModal.modal();

                })
                .catch(function (error) {
                    console.log(error);
                });


        },
        pushUsers: function (event, todo, user) {

            axios.get('/shareTodo')
                .then(function (response) {


                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    mounted: function () {
        this.getAllTodos();
    },
    watch: {}
});
