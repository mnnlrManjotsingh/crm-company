<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('leads', function (Blueprint $table) {
            $table->boolean('is_converted')->default(false)->after('employee_id');
            $table->timestamp('converted_at')->nullable()->after('is_converted');
            $table->foreignId('customer_id')->nullable()->constrained('customers')->after('converted_at');
        });
    }

    public function down()
    {
        Schema::table('leads', function (Blueprint $table) {
            $table->dropColumn(['is_converted', 'converted_at']);
            $table->dropForeign(['customer_id']);
            $table->dropColumn('customer_id');
        });
    }
};