import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'sonner';

export default function Signup() {

    const schema = z.object({
        name: z.string().min(1, 'Name is required').max(40, "Name cannot exceed 40 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters long").max(20, "Password cannot exceed 20 characters").regex(/[0-9]/,"password must contain one number").regex(/[A-Z]/,"password must contain atleast one uppercase ").regex(/[^a-zA-Z0-9\s]/,"password should contain atleast on special character"),
        phone: z.string().min(10, "Phone number must be at least 10 characters long").max(15, "Phone number cannot exceed 15 characters") // Add phone number validation
    });

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange' // Ensures validation happens on input change
    });
    
    const onSubmit = async (data) => {
        try{
            const res = await axios.post("http://localhost:3000/api/register",data)
            toast.success("User regsiterd sucessfully")
        }
        catch (errors){
            
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Signup</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">Name</label>
                        <input
                            id="name"
                            type="text"
                            {...register('name')}
                            className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''}`}
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-gray-700 font-semibold mb-1">Phone Number</label>
                        <input
                            id="phone"
                            type="text"
                            {...register('phone')}
                            className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : ''}`}
                            placeholder="Enter your phone number"
                        />
                        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            {...register('email')}
                            className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
                        <input
                            id="password"
                            type="password"
                            {...register('password')}
                            className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`}
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-black text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-300"
                    >
                        Signup
                    </button>
                </form>
            </div>
        </div>
    )
}
