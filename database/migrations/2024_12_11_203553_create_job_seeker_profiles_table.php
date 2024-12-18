// database/migrations/[timestamp]_create_job_seeker_profiles_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_seeker_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title')->nullable();
            $table->integer('experience_years')->default(0);
            $table->string('education_level')->nullable();
            $table->json('skills')->nullable();
            $table->text('bio')->nullable();
            $table->string('resume_path')->nullable();
            $table->string('avatar_path')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_seeker_profiles');
    }
};