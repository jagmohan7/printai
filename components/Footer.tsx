import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0d2137] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="PrintAI" width={44} height={44} className="rounded-lg" />
              <span className="text-white font-bold text-xl">PrintAI</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Leading AI Automation Solutions for the Printing Industry.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-gray-400">
              <Mail className="w-4 h-4 text-blue-400" />
              <a href="mailto:sales@printai.cloud" className="hover:text-white transition-colors">
                sales@printai.cloud
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/#about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services/chatbots" className="hover:text-white transition-colors">Custom Chatbots</Link></li>
              <li><Link href="/services/automation" className="hover:text-white transition-colors">Process Automation</Link></li>
              <li><Link href="/services/erpnext" className="hover:text-white transition-colors">ERPNext Integration</Link></li>
              <li><Link href="/#services" className="hover:text-white transition-colors">Web-to-Print</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Get In Touch</h3>
            <p className="text-sm text-gray-400 mb-4">
              Ready to transform your printing business with AI?
            </p>
            <Link
              href="/#contact"
              className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} PrintAI. All rights reserved.</p>
          <p className="text-sm text-gray-500">AI-Powered Solutions for Printing Businesses</p>
        </div>
      </div>
    </footer>
  );
}
