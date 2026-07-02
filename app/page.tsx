import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, Users, FileText, ShieldCheck, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OrbitLandingPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-orbit-green selection:text-white">
      
      {/* 🟢 NAVIGATION */}
      <nav className="absolute top-0 w-full z-50 px-6 py-6 lg:px-12 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {/* Logo */}
          <Image 
            src="/orbit-logo.png" 
            alt="Orbit Logo" 
            width={60}          
            height={62}      
            className="h-15 w-auto"     
            priority             
          />
        </div>

        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-200">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#about" className="hover:text-white transition-colors">For VSU</Link>
          <Link href="#support" className="hover:text-white transition-colors">Support</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white hidden sm:flex">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-orbit-green hover:bg-orbit-hover text-white border-none">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* 🟢 HERO SECTION (Matches the Auth Page Background Vibe) */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 overflow-hidden bg-orbit-darkbg">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orbit-green/30 via-green-950/90 to-black" />
        <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400 mb-8 backdrop-blur-sm">
            <Zap className="w-4 h-4 mr-2" /> VSU Org Registration is now open
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Clear the Chaos. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-orbit-green">Connect the Campus.</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            The all-in-one platform built specifically for Visayas State University. Turn your organization&apos;s semester-long headache into a streamlined, transparent experience.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-orbit-green hover:bg-orbit-hover text-white px-8 py-6 text-base font-semibold">
                Start Managing Your Org
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#demo">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-800 hover:text-gray-900 bg-white/90 hover:bg-white px-8 py-6 text-base font-semibold backdrop-blur-sm">
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 🟢 FEATURES SECTION (The "White Card" Vibe) */}
      <section id="features" className="py-24 px-6 lg:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Everything your officers need</h2>
            <p className="mt-4 text-lg text-gray-600">
              Stop using messy spreadsheets and scattered group chats. Orbit centralizes your workflow so you can focus on making an impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-orbit-green" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Member Roster</h3>
              <p className="text-gray-600 leading-relaxed">
                Keep track of active members, alumni, and fee payments in one unified directory synced with VSU webmails.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-orbit-green" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Event Operations</h3>
              <p className="text-gray-600 leading-relaxed">
                From proposing activity designs to tracking attendance via QR codes, manage your events seamlessly.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-orbit-green" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Document Hub</h3>
              <p className="text-gray-600 leading-relaxed">
                Store resolutions, minutes, and financial reports securely. Say goodbye to lost flash drives during turnover.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 TRUST/VSU SECTION */}
      <section className="py-24 px-6 lg:px-12 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center text-sm font-bold tracking-widest text-orbit-green uppercase">
              <ShieldCheck className="w-5 h-5 mr-2" /> Tailored for VSU
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Designed for the specific needs of Viscan organizations.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Orbit isn&apos;t generic software. It understands the VSU ecosystem—from working with USSC guidelines to handling institutional emails. It bridges the gap between organization officers and the student body.
            </p>
            <ul className="space-y-4 pt-4">
              {['Strictly requires @vsu.edu.ph verification', 'Automated semesterly turnover workflows', 'Export reports formatted to VSU standards'].map((item, i) => (
                <li key={i} className="flex items-center text-gray-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-orbit-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Visual Placeholder (Could be an app screenshot) */}
          <div className="flex-1 w-full relative">
            <div className="aspect-square md:aspect-auto md:h-[500px] w-full bg-slate-100 rounded-3xl border-8 border-white shadow-2xl overflow-hidden relative flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-tr from-orbit-green/10 to-transparent"></div>
               <span className="text-gray-400 font-medium">App Dashboard Screenshot Here</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 BOTTOM CTA */}
      <section className="py-24 px-6 lg:px-12 bg-orbit-darkbg text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orbit-green/20 to-transparent opacity-50" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white">Ready to elevate your org?</h2>
          <p className="text-gray-300 text-lg">Join the beta and be among the first VSU organizations to experience the future of campus management.</p>
          <Link href="/signup" className="inline-block">
            <Button size="lg" className="bg-white text-orbit-darkbg hover:bg-gray-100 px-10 py-6 text-base font-bold shadow-xl">
              Create Organization Account
            </Button>
          </Link>
        </div>
      </section>
      
      {/* 🟢 FOOTER */}
      <footer className="bg-black py-12 px-6 lg:px-12 text-gray-400 text-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <span className="text-white font-bold tracking-[0.2em]">ORBIT</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact Developers</Link>
          </div>
        </div>
      </footer>

    </main>
  )
}