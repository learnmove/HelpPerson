<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('sender_id');
            $table->integer('receive_id');
            $table->string('sender_name');
            $table->string('receive_avatar')->default("http://lorempixel.com/50/50/");
            $table->string('receive_name');
            $table->string('sender_avatar')->default("http://lorempixel.com/50/50/");
            $table->boolean('read')->default(0);
            $table->text('content');
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
        Schema::dropIfExists('messages');
    }
}
