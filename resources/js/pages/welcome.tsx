import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="CRM - Powerful Software for Clinics">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            
            {/* Main Container */}
            <div className="min-h-screen bg-white ">
                {/* Header */}
                <header className="w-full px-4 py-6 lg:px-12 lg:py-5 bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                                    <span className="text-lg font-bold text-white">CRM</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900 ">ClinicCRM</span>
                            </div>
                            
                            {/* Navigation */}
                            <nav className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-all hover:bg-blue-700"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="rounded-lg px-6 py-2.5 font-medium bg-blue-700 text-white  transition-all hover:text-blue-600 "
                                        >
                                            Sign In
                                        </Link>
                                        
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

            
                 {/* Modern Hero Section with Abstract Design */}
                <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-100   ">
                    {/* Abstract Background Shapes */}
                    <div className="absolute inset-0">
                        {/* Large Circles */}
                        <div className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl "></div>
                        <div className="absolute -right-20 top-1/2 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl "></div>
                        <div className="absolute left-1/2 -bottom-32 h-64 w-64 rounded-full bg-indigo-200/20 blur-3xl "></div>
                        
                        {/* Grid Pattern */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.8),transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8),transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] "></div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute right-10 top-20 animate-float">
                        <div className="h-20 w-20 rounded-2xl bg-white/80 shadow-2xl backdrop-blur-sm  p-4">
                            <div className="text-2xl">📊</div>
                        </div>
                    </div>
                    <div className="absolute left-10 top-1/2 animate-float" style={{animationDelay: '2s'}}>
                        <div className="h-16 w-16 rounded-2xl bg-white/80 shadow-2xl backdrop-blur-sm  p-3">
                            <div className="text-xl">👥</div>
                        </div>
                    </div>
                    <div className="absolute right-1/3 bottom-20 animate-float" style={{animationDelay: '4s'}}>
                        <div className="h-12 w-12 rounded-2xl bg-white/80 shadow-2xl backdrop-blur-sm  p-2">
                            <div className="text-lg">💊</div>
                        </div>
                    </div>

                    <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
                        <div className="text-center">
                         
                            {/* Main Heading */}
                            <h1 className="mb-8 text-5xl font-bold leading-tight text-gray-900 lg:text-7xl lg:leading-tight ">
                                Welcome to The{' '}
                                <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                                    Future of Healthcare
                                </span>
                            </h1>
                            
                            {/* Subtitle */}
                            <p className="mx-auto mb-12 max-w-3xl text-2xl leading-relaxed text-gray-600 lg:text-3xl  font-light">
                                Transform your clinic with our <span className="font-semibold text-blue-600 ">all-in-one CRM platform</span> designed for modern medical practices
                            </p>
                            
                            {/* CTA Buttons */}
                            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                                <Link
                                    href={"#"}
                                    className="group relative rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-14 py-5 text-xl font-bold text-white shadow-2xl transition-all duration-300 hover:from-blue-700 hover:to-cyan-700 hover:shadow-3xl hover:scale-105"
                                >
                                    <span className="relative z-10">🚀 Start Free Trial Now</span>
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                </Link>
                                
                                <button className="group rounded-2xl border-2 border-gray-300 bg-white/80 px-12 py-5 text-xl font-bold text-gray-700 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-blue-400 hover:bg-white hover:shadow-3xl    ">
                                    <span className="flex items-center gap-3">
                                        <span className="transition-transform group-hover:scale-110">📽️</span>
                                        Watch Demo
                                    </span>
                                </button>
                            </div>

                            {/* Trust Metrics */}
                            <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
                                {[
                                    { number: '500+', label: 'Clinics', color: 'text-blue-600' },
                                    { number: '99.9%', label: 'Uptime', color: 'text-green-600' },
                                    { number: '24/7', label: 'Support', color: 'text-purple-600' },
                                    { number: '5.0★', label: 'Rating', color: 'text-orange-600' }
                                ].map((metric, index) => (
                                    <div key={index} className="text-center">
                                        <div className={`text-4xl font-bold ${metric.color} lg:text-5xl`}>
                                            {metric.number}
                                        </div>
                                        <div className="mt-2 text-sm font-medium text-gray-600  uppercase tracking-wider">
                                            {metric.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Scroll Indicator */}
                            <div className="mt-16 animate-bounce">
                                <div className="mx-auto h-8 w-0.5 bg-gray-400"></div>
                                <div className="mt-2 text-sm text-gray-500">Scroll to explore</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Add this to your global CSS for animations */}
                <style >{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-20px); }
                    }
                    .animate-float {
                        animation: float 6s ease-in-out infinite;
                    }
                    .hover\\:shadow-3xl:hover {
                        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    }
                `}</style>

                {/* Why Choose CRM Section */}
               <section className="py-20 bg-gray-50 ">
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 lg:text-5xl  mb-4">
                            Why Choose <span className="text-blue-600">CRM</span> For Your Business
                        </h2>
                        <p className="text-xl text-gray-600  max-w-3xl mx-auto">
                            Discover how our comprehensive CRM solution transforms clinic management with cutting-edge features designed for modern healthcare practices.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                        {/* Left Column - Clinic Operations */}
                        <div className="space-y-8">
                            {/* Paperless Clinic */}
                            <div className="group rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl  hover:scale-105">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                        <span className="text-xl">📄</span>
                                    </div>
                                    <div>
                                        <h3 className="mb-3 text-2xl font-bold text-gray-900 ">Paperless Clinic</h3>
                                        <p className="text-gray-600  leading-relaxed">
                                            Complete digital transformation with paperless records of case histories, follow-ups, medicine records, and investigations.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Pharmacy Management */}
                            <div className="group rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl  hover:scale-105">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 ">
                                        <span className="text-xl">💊</span>
                                    </div>
                                    <div>
                                        <h3 className="mb-3 text-2xl font-bold text-gray-900 ">Super-Specialized Pharmacy</h3>
                                        <p className="text-gray-600  leading-relaxed">
                                            Advanced dispensing module integrated with extensive Homeopathy Formulary featuring potencies for over 3,000 remedies.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Front Office */}
                            <div className="group rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl  hover:scale-105">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                                        <span className="text-xl">🏢</span>
                                    </div>
                                    <div>
                                        <h3 className="mb-3 text-2xl font-bold text-gray-900 ">Front Office Streamlining</h3>
                                        <p className="text-gray-600  leading-relaxed">
                                            Automate operational workflows and administrative tasks so your team can focus on delivering exceptional patient care.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Security */}
                            <div className="group rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl  hover:scale-105">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600 ">
                                        <span className="text-xl">🔒</span>
                                    </div>
                                    <div>
                                        <h3 className="mb-3 text-2xl font-bold text-gray-900 ">Enterprise-Grade Security</h3>
                                        <p className="text-gray-600  leading-relaxed">
                                            Comprehensive data protection preventing unauthorized access, disclosure, modification, or destruction with advanced security protocols.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Backup & Recovery */}
                            <div className="group rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl  hover:scale-105">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
                                        <span className="text-xl">💾</span>
                                    </div>
                                    <div>
                                        <h3 className="mb-3 text-2xl font-bold text-gray-900 ">Automated Backup & Recovery</h3>
                                        <p className="text-gray-600  leading-relaxed">
                                            Multi-geographical data backups ensure your health records remain safe and accessible, even in case of natural disasters or system failures.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Patient & Doctor Features */}
                        <div className="space-y-8">
                            {/* Patient Care */}
                            <div className="group rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl  hover:scale-105">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 text-pink-600 ">
                                        <span className="text-xl">❤️</span>
                                    </div>
                                    <div>
                                        <h3 className="mb-3 text-2xl font-bold text-gray-900 ">Enhanced Patient Care</h3>
                                        <p className="text-gray-600  leading-relaxed">
                                            Track comparative examination values (BP, Weight, Height, LMP) and investigation results across every patient visit for better healthcare outcomes.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Patient Follow-up */}
                            <div className="group rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl  hover:scale-105">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 ">
                                        <span className="text-xl">📅</span>
                                    </div>
                                    <div>
                                        <h3 className="mb-3 text-2xl font-bold text-gray-900 ">Smart Patient Follow-up</h3>
                                        <p className="text-gray-600  leading-relaxed">
                                            Automated appointment reminders and follow-up scheduling to ensure patients never miss their important healthcare appointments.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Doctor's Dashboard */}
                            <div className="group rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl  hover:scale-105">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 ">
                                        <span className="text-xl">👨‍⚕️</span>
                                    </div>
                                    <div>
                                        <h3 className="mb-3 text-2xl font-bold text-gray-900 ">Doctor's Delight Dashboard</h3>
                                        <p className="text-gray-600  leading-relaxed">
                                            Single-screen visibility of patient history, last prescriptions, chief complaints, and tools to understand prescribed Allopathic medicines.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            

                            {/* Automatic Updates */}
                            <div className="group rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl  hover:scale-105">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600 ">
                                        <span className="text-xl">🔄</span>
                                    </div>
                                    <div>
                                        <h3 className="mb-3 text-2xl font-bold text-gray-900 ">Seamless Automatic Updates</h3>
                                        <p className="text-gray-600  leading-relaxed">
                                            As a cloud-based platform, enjoy free automatic software updates with the latest features, security patches, and performance improvements.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-16 text-center">
                        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white shadow-2xl">
                            <h3 className="mb-4 text-2xl font-bold lg:text-3xl">
                                Ready to Transform Your Clinic?
                            </h3>
                            <p className="mb-6 text-lg text-blue-100">
                                Join 500+ clinics already benefiting from our comprehensive CRM solution
                            </p>
                            <Link
                                href={"#"}
                                className="inline-block rounded-xl bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition-all hover:bg-blue-50 hover:scale-105"
                            >
                                Start Your Free Trial Today
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

                {/* Contact Form Section */}
                <section className="py-20 bg-white ">
                    <div className="mx-auto max-w-4xl px-6 lg:px-12">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 lg:text-5xl ">
                                Get In Touch
                            </h2>
                            <p className="mt-4 text-xl text-gray-600 ">
                                Ready to transform your clinic? Contact us today!
                            </p>
                        </div>

                        <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-green-50 p-8 shadow-2xl  ">
                            <form className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 ">
                                            Full Name
                                        </label>
                                        <input 
                                            type="text" 
                                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200   "
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 ">
                                            Email Address
                                        </label>
                                        <input 
                                            type="email" 
                                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200   "
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 ">
                                        Subject
                                    </label>
                                    <input 
                                        type="text" 
                                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200   "
                                        placeholder="Enter subject"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 ">
                                        Message
                                    </label>
                                    <textarea 
                                        rows={4}
                                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200   "
                                        placeholder="Enter your message"
                                    ></textarea>
                                </div>
                                <button 
                                    type="submit"
                                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-green-600 py-4 text-lg font-semibold text-white transition-all hover:from-blue-700 hover:to-green-700"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Comprehensive Footer */}
                <footer className="bg-gray-900 text-white py-16">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {/* Features Column */}
                            <div>
                                <h3 className="mb-6 text-lg font-semibold">FEATURES</h3>
                                <ul className="space-y-3 text-gray-300">
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-400">•</span>
                                        Paperless Clinic
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-400">•</span>
                                        Patient Care
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-400">•</span>
                                        Security
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-400">•</span>
                                        Patient follow up - Appointments
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-400">•</span>
                                        Automatic Software Update - Cloud Based
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-400">•</span>
                                        Front Office - Streamline
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-400">•</span>
                                        Doctors - Delight
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-400">•</span>
                                        Backup
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-400">•</span>
                                        Linked to Extensive Homeopathy Formulary
                                    </li>
                                </ul>
                            </div>

                            {/* Support Column */}
                            <div>
                                <h3 className="mb-6 text-lg font-semibold">SUPPORT</h3>
                                <div className="space-y-4 text-gray-300">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">🛟</span>
                                        <div>
                                            <div className="font-medium">24/7 Support</div>
                                            <div className="text-sm">Always here to help</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">📧</span>
                                        <div>
                                            <div className="font-medium">support@crm.in</div>
                                            <div className="text-sm">Email support</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pricing Column */}
                            <div>
                                <h3 className="mb-6 text-lg font-semibold">PRICING</h3>
                                <ul className="space-y-3 text-gray-300">
                                    <li className="flex items-center gap-2">
                                        <span className="text-blue-400">•</span>
                                        Plans
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-blue-400">•</span>
                                        FAQ
                                    </li>
                                </ul>
                            </div>

                            {/* Why CRM Column */}
                            <div>
                                <h3 className="mb-6 text-lg font-semibold">WHY CRM</h3>
                                <ul className="space-y-3 text-gray-300">
                                    <li className="flex items-center gap-2">
                                        <span className="text-purple-400">•</span>
                                        Organize - Appointment Schedule
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-purple-400">•</span>
                                        Digitize Medical Records
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-purple-400">•</span>
                                        Automated Patient Reminder
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-purple-400">•</span>
                                        Treatment Plan
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-purple-400">•</span>
                                        Financial Reporting & Analytics
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-purple-400">•</span>
                                        Clinic Staff Management
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="mt-12 border-t border-gray-700 pt-8 text-center">
                            <p className="text-gray-400">
                                Copyright ©2023, CRM LLC., All Rights Reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}