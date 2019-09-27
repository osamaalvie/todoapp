@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">ToDo List</div>

                    <div class="card-body">
                        <form @submit.prevent="addNewTodo">
                            <div class="form-group row">
                                <label for="newTodo"
                                       class="col-md-4 col-form-label text-md-right">New Todo </label>
                                <div class="col-md-4">

                                    <input type="text" class="form-control" name="todo"
                                           v-model="todo.name"
                                           value="" required autofocus/>

                                </div>
                                <div class="col-md-4">
                                    <button class="btn btn-success" type="submit">Add</button>

                                </div>


                            </div>

                        </form>
                        <table border='1' width='100%' style='border-collapse: collapse;'>
                            <tr>
                                <th>ToDo Name</th>
                                <th>Finished</th>
                                <th>Action</th>

                            </tr>

                            <tr v-for='t in todos' :key="t.id">

                                <td>
                                    <div class="form-group">
                                        <input type="text"
                                               class="form-control"
                                               v-model="t.name"
                                               data-attribute="name"
                                               @change="triggerChange"
                                               @blur="saveChanges($event,t)"
                                               ref="todo"/>
                                    </div>

                                </td>
                                <td>
                                    <div class="form-group">
                                        <input :class="{done:t.done}" class="form-control"
                                               type="checkbox"
                                               v-model="t.done"
                                               data-attribute="done"
                                               @change="triggerChange"
                                               @blur="saveChanges($event,t)"
                                               ref="done"
                                        />
                                    </div>
                                </td>
                                <td>
                                    <button class="btn btn-danger btn-sm" type="button" @click="deleteTodo($event,t)">
                                        Delete
                                    </button>
                                    <button class="btn btn-info btn-sm" type="button" @click="shareTodo($event,t)">
                                        Share
                                    </button>
                                </td>

                            </tr>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('styles')
    <style>
        .done {
            text-decoration: line-through;
        }
    </style>
@endpush

