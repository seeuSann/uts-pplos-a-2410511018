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
        Schema::create('rooms', function (Blueprint $table) {

            $table->id();

            $table->foreignId('property_id')
                ->constrained('properties')
                ->onDelete('cascade');

            $table->string('room_number');

            $table->integer('price');

            $table->enum('status', [
                'available',
                'booked',
                'occupied'
            ])->default('available');

            $table->integer('capacity')->default(1);

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};