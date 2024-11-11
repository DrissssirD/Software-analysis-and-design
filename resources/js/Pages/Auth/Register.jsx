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
    });

    const [selectedButton, setSelectedButton] = useState('jobSeeker');

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen flex w-full p-2">
            <div className="hidden sm:block sm:min-h-screen">
                <img src={picture} className="sm:h-full sm:bg-cover sm:w-[500px] xl:w-[640px]" alt="Background" />
            </div>
            
            <div className="flex flex-col flex-1 items-center sm:mt-[58px] justify-center">
                <div className="flex flex-row">
                    {['jobSeeker', 'company'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedButton(type)}
                            className={`w-[115px] h-[40px] font-medium ${
                                selectedButton === type ? 'bg-[#CCCCF5] text-[#4640DE]' : 'bg-white'
                            }`}
                        >
                            {type === 'jobSeeker' ? 'Job Seeker' : 'Company'}
                        </button>
                    ))}
                </div>

                <h1 className="text-[#202430] text-4xl mt-6 font-semibold">Create Account</h1>
                
                <button className="w-full text-base text-[#4640DE] sm:w-[408px] h-[50px] border-2 border-[#A8ADB7] font-bold flex gap-3 justify-center items-center hover:bg-[#CCCCF5] hover:text-white mt-6">
                    <img src={googleIcon} alt="Google Icon" />
                    Sign up with Google
                </button>

                <div className="flex items-center gap-4 mt-6">
                    <hr className="flex-1 w-[109px] border" />
                    <h4>Or sign up with email</h4>
                    <hr className="flex-1 w-[109px] border" />
                </div>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6 w-full">
                    <div>
                        <CustomInput
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            error={errors.name}
                            required
                        />
                    </div>

                    <div>
                        <CustomInput
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            error={errors.email}
                            required
                        />
                    </div>

                    <div>
                        <CustomInput
                            name="password"
                            type="password"
                            placeholder="Create password"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            error={errors.password}
                            required
                        />
                    </div>

                    <div>
                        <CustomInput
                            name="password_confirmation"
                            type="password"
                            placeholder="Confirm password"
                            value={data.password_confirmation}
                            onChange={e => setData('password_confirmation', e.target.value)}
                            error={errors.password_confirmation}
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={processing}
                        className="sm:w-[408px] h-[50px] bg-[#4640DE] mt-6 text-white w-full"
                    >
                        Create Account
                    </button>
                </form>

                <div className="flex gap-2 mt-6">
                    <h4 className="text-[#202430]">Already have an account?</h4>
                    <Link href={route('login')} className="text-[#4640DE] font-semibold">
                        Login
                    </Link>
                </div>

                <div className="sm:w-[408px] h-[44px] mt-6">
                    <h4 className="text-[#A8ADB7]">
                        By clicking 'Create Account', you acknowledge that you have read and accept the{" "}
                        <Link href="#" className="text-[#4640DE]">Terms of Service</Link> and{" "}
                        <Link href="#" className="text-[#4640DE]">Privacy Policy</Link>.
                    </h4>
                </div>
            </div>
        </div>
    );
}