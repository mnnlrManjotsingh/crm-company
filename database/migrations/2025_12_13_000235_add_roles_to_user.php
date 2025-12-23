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
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('employee')->after('email');
            $table->string('mobile')->nullable(false)->after('role');
            $table->enum('gender', ['male', 'female'])->nullable(false)->after('mobile'); 
            $table->string('address')->nullable()->after('gender'); 
            $table->string('city')->nullable()->after('address'); 
            $table->text('about')->nullable()->after('city'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
             $table->dropColumn('role');
            $table->dropColumn('mobile');
            $table->dropColumn('gender');
            $table->dropColumn('address');
            $table->dropColumn('city');
            $table->dropColumn('about');
        });
    }
};
