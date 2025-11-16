<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable(false); 
            $table->string('email')->unique()->nullable(false); 
            $table->string('mobile')->nullable(false);
            $table->string('password')->nullable(); 
            $table->enum('gender', ['male', 'female'])->nullable(false); 
            $table->string('address')->nullable(); 
            $table->string('city')->nullable(); 
            $table->text('about')->nullable(); 
            $table->string('role')->nullable(false); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
