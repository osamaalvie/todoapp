<?php
/**
 * Created by PhpStorm.
 * User: Dell
 * Date: 9/25/2019
 * Time: 11:31 PM
 */

namespace App\Http\Controllers;

use App\ToDo;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class TodoController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     *
     */
    public function store(Request $request)
    {
        try {
            $todo = new ToDo();
            $todo->name = $request->get('name');
            $todo->done = $request->get('done') == 'true' ? 1 : 0;
            $todo->user_id = Auth::user()->id;

            if (!$todo->save()) {
                return Response::HTTP_BAD_REQUEST;
            }

            return json_encode($todo);

        } catch (\Exception $exception) {

            return Response::HTTP_BAD_REQUEST;
        }
    }

    /**
     * Show the application dashboard.
     *
     *
     */
    public function update(Request $request)
    {
        try {
            $todo = ToDo::find($request->get('id'));
            $todo->name = $request->get('name');
            $todo->done = $request->get('done') == 1 ? 1 : 0;
            $todo->save();

            if (!$todo->save()) {
                return Response::HTTP_BAD_REQUEST;
            }

            return Response::HTTP_OK;
        } catch (\Exception $exception) {

            return Response::HTTP_BAD_REQUEST;
        }
    }

    /**
     * Show the application dashboard.
     *
     *
     */
    public function destroy(Request $request)
    {
        try {
            $todo = ToDo::find($request->get('id'));

            if (!$todo->delete()) {
                return Response::HTTP_BAD_REQUEST;
            }

            return Response::HTTP_OK;
        } catch (\Exception $exception) {

            return Response::HTTP_BAD_REQUEST;
        }


    }

    public function getAllTodos()
    {
        return Auth::user()->todos;
    }


}
