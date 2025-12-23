<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Drop the old foreign key constraint
        Schema::table('leads', function (Blueprint $table) {
            // First, drop the foreign key
            $table->dropForeign(['employee_id']);
        });

        // Re-add the foreign key with correct reference
        Schema::table('leads', function (Blueprint $table) {
            $table->foreign('employee_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down(): void
    {
        // Reverse the changes
        Schema::table('leads', function (Blueprint $table) {
            $table->dropForeign(['employee_id']);
            $table->foreign('employee_id')->references('id')->on('employees')->onDelete('set null');
        });
    }
};