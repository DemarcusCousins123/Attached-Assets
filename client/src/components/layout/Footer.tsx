import { Link } from "wouter";
import { Car, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-16 border-t border-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-2 rounded-xl">
                <Car className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                Apex Auto
              </span>
            </Link>
            <p className="text-sm text-slate-400 mb-6">
              Expert automotive advisory. Know if your car deal is good before you buy, or let us find the perfect vehicle for you.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services" className="hover:text-primary transition-colors">Deal Analyzer</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Vehicle Sourcing</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Premium Advisory</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Client Portal</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@apexautoadvisory.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Apex Auto Advisory. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
