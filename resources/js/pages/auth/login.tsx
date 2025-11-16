import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import leftimg from '../../../../public/img/auth2.jpg';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <div className="min-h-screen flex">
            <Head title="Log in" />
            
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:flex-1 relative" style={{ backgroundColor: 'var(--sitecolordark)' }}>
                <img
                    src={leftimg}
                    alt="crm"
                    className="w-full h-full "
                />
                <div className="absolute inset-0 flex items-center justify-center p-8" >
                    <div className="text-center text-white">
                        {/* <h2 className="text-4xl font-bold mb-4">Welcome</h2> */}
                        {/* <p className="text-xl">Your trusted healthcare partner</p> */}
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold" >
                            Log in to your account
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Enter your email and password below to log in
                        </p>
                    </div>

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="space-y-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-medium" >
                                            Email address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder="email@example.com"
                                            className="w-full"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password" className="text-sm font-medium" >
                                                Password
                                            </Label>
                                            {canResetPassword && (
                                                <TextLink
                                                    href={request()}
                                                    className="text-sm hover:underline font-medium"
                                                    style={{ color: 'var(--sitecolor)' }}
                                                    tabIndex={5}
                                                >
                                                    Forgot password?
                                                </TextLink>
                                            )}
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder="Enter your password"
                                            className="w-full"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                        />
                                        <Label htmlFor="remember" className="text-sm" >
                                            Remember me
                                        </Label>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full text-white font-medium"
                                        style={{ 
                                            backgroundColor: 'var(--sitecolor)',
                                            borderColor: 'var(--sitecolor)'
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.backgroundColor = 'var(--sitecolordark)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.backgroundColor = 'var(--sitecolor)';
                                        }}
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="login-button"
                                    >
                                        {processing && <Spinner className="mr-2" />}
                                        Log in
                                    </Button>
                                </div>

                                {/* {canRegister && (
                                    <div className="text-center text-sm" >
                                        Don't have an account?{' '}
                                        <TextLink 
                                            href={register()} 
                                            tabIndex={5}
                                            className="hover:underline font-medium"
                                            style={{ color: 'var(--sitecolor)' }}
                                        >
                                            Sign up
                                        </TextLink>
                                    </div>
                                )} */}
                            </>
                        )}
                    </Form>

                    {status && (
                        <div className="rounded-md p-4" style={{ backgroundColor: 'var(--sitecolorlight)', color: 'var(--sitecolordark)' }}>
                            <div className="text-sm text-center">
                                {status}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}