<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->string('user_name');
            $table->string('user_avatar');

            $table->string('title');
            $table->integer('money');
            $table->string('position');
            $table->string('time');
            $table->text('content');
            $table->string('city');
            $table->string('contact');
            $table->boolean('status')->default(0);
            // 0 normal 1 finish 
            $table->boolean('top')->default(0);
            $table->date('expire')->default('2097-12-31 06:13:19');
            $table->boolean('delete')->default(0);
            

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jobs');
    }
}
