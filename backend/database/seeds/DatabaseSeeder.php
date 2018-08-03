<?php

use Illuminate\Database\Seeder;
define('uq',15);
class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

    	factory(App\User::class,uq)->create();
        factory(App\Message::class,100)->create();

    	factory(App\Job::class,50)->create()->each(function($j){
            foreach(range(1,3) as $i){
                $a=App\Apply::create([
                    'sender_id'=>mt_rand(1,uq),
                    'boss_id'=>mt_rand(1,uq),
                    'money'=>$j->money,
                    'job_id'=>$j->id,
                    'job_title'=>$j->title,


                    ]);
             $j->applies()->save($a)->make();

            }
        });



    }
}
