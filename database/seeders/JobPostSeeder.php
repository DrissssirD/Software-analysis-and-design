<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JobPost;
use App\Models\CompanyProfile;

class JobPostSeeder extends Seeder
{
    public function run()
    {
        // Get or create a company profile
        $companyProfile = CompanyProfile::first();
        
        if (!$companyProfile) {
            return;
        }

        JobPost::create([
            'company_profile_id' => $companyProfile->id,
            'title' => 'Senior Software Engineer',
            'description' => 'We are looking for an experienced software engineer...',
            'requirements' => 'At least 5 years of experience in web development...',
            'location' => 'New York, NY',
            'salary_range' => '$100,000 - $150,000',
            'employment_type' => 'full-time',
            'experience_level' => 'senior',
            'skills_required' => ['PHP', 'Laravel', 'React', 'MySQL'],
            'deadline' => now()->addDays(30),
            'status' => 'open',
        ]);

        JobPost::create([
            'company_profile_id' => $companyProfile->id,
            'title' => 'Frontend Developer',
            'description' => 'Looking for a skilled frontend developer...',
            'requirements' => 'Strong experience with modern JavaScript frameworks...',
            'location' => 'Remote',
            'salary_range' => '$80,000 - $120,000',
            'employment_type' => 'full-time',
            'experience_level' => 'mid',
            'skills_required' => ['JavaScript', 'React', 'CSS', 'HTML'],
            'deadline' => now()->addDays(30),
            'status' => 'open',
        ]);
    }
}