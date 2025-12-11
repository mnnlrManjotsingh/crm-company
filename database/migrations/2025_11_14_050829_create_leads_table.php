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
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('company_name')->nullable(false);
            $table->string('city')->nullable(false); 
            $table->string('address')->nullable(false);
            $table->enum('lead_type', ['domestic', 'international'])->nullable(false); 
            $table->enum('documentation', ['yes', 'no'])->nullable(); 
            $table->json('products')->nullable();
            $table->string('phone_no')->nullable();
            $table->string('email')->nullable(); 
            $table->date('reminder')->nullable(); 
            $table->string('quotation')->nullable();
            $table->enum('status', ['pending', 'confirmed', 'rejected'])->default('pending');
            $table->string('lead_source')->nullable(); 
            $table->foreignId('employee_id')->nullable()->constrained('employees')->onDelete('set null');   
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
