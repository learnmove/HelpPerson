<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rates', function (Blueprint $table) {
            $table->increments('id');
            $table->string('sender_name');
            $table->string('sender_id');
            $table->string('sender_avatar');
            $table->tinyinteger('star');
            $table->string('job_title');
            $table->string('content');
            $table->boolean('boss')->default('0');
            $table->integer('receiver_id');
            $table->integer('apply_id');

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
        Schema::dropIfExists('rates');
    }
}
