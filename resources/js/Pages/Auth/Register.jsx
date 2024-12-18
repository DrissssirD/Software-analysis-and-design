import { useEffect, useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import CustomInput from '@/Components/CustomInput';
import googleIcon from "@/Assets/googleIcon.svg";
import picture from "@/Assets/Element.svg";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        user_type: 'jobSeeker'
    });

    const [selectedButton, setSelectedButton] = useState('jobSeeker');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formFocus, setFormFocus] = useState('');
    
    const handleButtonSelect = (type) => {
        setSelectedButton(type);
        setData('user_type', type);
        // Store the selected user type in session for Google OAuth
        fetch('/set-user-type', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
            },
            body: JSON.stringify({ user_type: type })
        });
    };

    const handleGoogleSignUp = () => {
        // Store the selected user type before redirecting
        fetch('/set-user-type', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
            },
            body: JSON.stringify({ user_type: selectedButton })
        }).then(() => {
            window.location.href = route('google.redirect');
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    // Icons
    const userIcon = (
        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );

    const emailIcon = (
        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    );

    const passwordIcon = (
        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
    );

    const togglePasswordIcon = (showState, setShowState) => (
        <button
            type="button"
            onClick={() => setShowState(!showState)}
            className="text-gray-400 hover:text-gray-600"
        >
            {showState ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
            ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            )}
        </button>
    );
    
    return (
        <div className="min-h-screen flex w-full bg-gray-50">
            {/* Left Side - Image */}
            <div className="hidden sm:block sm:min-h-screen w-1/2 bg-[#25324B]">
                <img 
                    src={picture} 
                    className="h-full w-full object-cover opacity-90 transition-opacity duration-300 hover:opacity-100" 
                    alt="Background"
                />
            </div>
            
            {/* Right Side - Registration Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-lg p-8">
                    {/* User Type Selection */}
                    <div className="flex rounded-lg bg-gray-100 p-1 mb-8">
                        {['jobSeeker', 'company'].map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => handleButtonSelect(type)}
                                className={`flex-1 py-3 px-6 rounded-md font-medium transition-all duration-300 ${
                                    selectedButton === type 
                                        ? 'bg-white text-[#4640DE] shadow-sm transform scale-[1.02]' 
                                        : 'text-gray-600 hover:text-[#4640DE]'
                                }`}
                            >
                                {type === 'jobSeeker' ? 'Job Seeker' : 'Company'}
                            </button>
                        ))}
                    </div>

                    <h1 className="text-[#202430] text-3xl font-bold text-center mb-2">
                        Create Account
                    </h1>
                    <p className="text-gray-500 text-center mb-8">
                        Sign up to get started
                    </p>
                    
                    {/* Google Sign Up Button */}
                    <button 
                        onClick={handleGoogleSignUp}
                        type="button"
                        className="w-full h-[50px] border-2 border-gray-200 rounded-lg font-medium 
                            flex gap-3 justify-center items-center
                            transition-all duration-300
                            hover:border-[#4640DE] hover:text-[#4640DE] hover:bg-blue-50
                            active:transform active:scale-[0.98] mb-8"
                    >
                        <img src={googleIcon} alt="Google Icon" className="w-5 h-5" />
                        Sign up with Google
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-8">
                        <hr className="flex-1 border-gray-200" />
                        <span className="text-gray-400 text-sm">Or sign up with email</span>
                        <hr className="flex-1 border-gray-200" />
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <CustomInput
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            onFocus={() => setFormFocus('name')}
                            onBlur={() => setFormFocus('')}
                            error={errors.name}
                            required
                            icon={userIcon}
                            className={`transition-all duration-300
                                ${formFocus === 'name' ? 'border-[#4640DE] bg-blue-50' : ''}`}
                        />

                        <CustomInput
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            onFocus={() => setFormFocus('email')}
                            onBlur={() => setFormFocus('')}
                            error={errors.email}
                            required
                            icon={emailIcon}
                            className={`transition-all duration-300
                                ${formFocus === 'email' ? 'border-[#4640DE] bg-blue-50' : ''}`}
                        />

                        <CustomInput
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create password"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            onFocus={() => setFormFocus('password')}
                            onBlur={() => setFormFocus('')}
                            error={errors.password}
                            required
                            icon={passwordIcon}
                            rightIcon={togglePasswordIcon(showPassword, setShowPassword)}
                            className={`transition-all duration-300
                                ${formFocus === 'password' ? 'border-[#4640DE] bg-blue-50' : ''}`}
                        />

                        <CustomInput
                            name="password_confirmation"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm password"
                            value={data.password_confirmation}
                            onChange={e => setData('password_confirmation', e.target.value)}
                            onFocus={() => setFormFocus('password_confirmation')}
                            onBlur={() => setFormFocus('')}
                            error={errors.password_confirmation}
                            required
                            icon={passwordIcon}
                            rightIcon={togglePasswordIcon(showConfirmPassword, setShowConfirmPassword)}
                            className={`transition-all duration-300
                                ${formFocus === 'password_confirmation' ? 'border-[#4640DE] bg-blue-50' : ''}`}
                        />

                        <button 
                            type="submit"
                            disabled={processing}
                            className={`w-full h-[50px] bg-[#4640DE] text-white rounded-lg font-medium
                                transition-all duration-300
                                hover:bg-[#3530A8]
                                active:transform active:scale-[0.98]
                                disabled:opacity-70 disabled:cursor-not-allowed
                                flex items-center justify-center gap-2 mt-6`}
                        >
                            {processing ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" />
                                        <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Creating Account...
                                </>
                            ) : 'Create Account'}
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <div className="flex justify-center gap-2 mt-8">
                        <span className="text-gray-500">Already have an account?</span>
                        <Link 
                            href={route('login')} 
                            className="text-[#4640DE] font-semibold hover:underline"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Terms and Privacy */}
                    <p className="text-sm text-gray-500 text-center mt-6">
                        By clicking 'Create Account', you acknowledge that you have read and accept the{" "}
                        <Link href="#" className="text-[#4640DE] hover:underline">Terms of Service</Link> and{" "}
                        <Link href="#" className="text-[#4640DE] hover:underline">Privacy Policy</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
}