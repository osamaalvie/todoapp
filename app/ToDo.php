<?php
/**
 * Created by PhpStorm.
 * User: Dell
 * Date: 9/25/2019
 * Time: 12:56 AM
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class ToDo extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'todos';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'done',
    ];
}