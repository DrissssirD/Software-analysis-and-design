<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_profile_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->text('requirements');
            $table->string('location');
            $table->string('salary_range')->nullable();
            $table->string('employment_type');  // full-time, part-time, contract
            $table->string('experience_level'); // entry, mid, senior
            $table->json('skills_required');
            $table->dateTime('deadline');
            $table->string('status')->default('open'); // open, closed, draft
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_posts');
    }
};