
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, UserCircle, Building2, Users, Heart, Calendar, Pill } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-medblue-500 to-medblue-700 text-white">
        <div className="med-container py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Complete Patient Management Solution
            </h1>
            <p className="text-xl mb-8 text-medblue-100">
              Connect patients, doctors, hospitals and caretakers with our unified healthcare platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-medblue-700 hover:bg-medblue-100">
                <Link to="/register">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                <Link to="/login">
                  Log In
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="med-container">
          <h2 className="text-3xl font-bold text-center mb-12">All-in-one Patient Management System</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="bg-medblue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <UserCircle className="h-6 w-6 text-medblue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Patient Registration</h3>
              <p className="text-gray-600">
                Easily register patients, manage their medical records and track their health progress over time.
              </p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="bg-medblue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-medblue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hospital Management</h3>
              <p className="text-gray-600">
                Streamline hospital operations, manage doctors, departments and specialties all in one place.
              </p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="bg-medblue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-medblue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Caretaker Support</h3>
              <p className="text-gray-600">
                Involve caretakers in the patient's journey with health alerts, medication reminders and more.
              </p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="bg-medblue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-medblue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Appointment Management</h3>
              <p className="text-gray-600">
                Book, reschedule and track appointments with doctors across different hospitals and specialties.
              </p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="bg-medblue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Pill className="h-6 w-6 text-medblue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Medication Tracking</h3>
              <p className="text-gray-600">
                Manage prescriptions, set reminders and ensure patients take their medications on time.
              </p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="bg-medblue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-medblue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Health Surveys</h3>
              <p className="text-gray-600">
                Collect patient feedback, track symptoms and notify healthcare providers of any concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-50">
        <div className="med-container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform healthcare management?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare providers and patients who are already benefiting from our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/register">Create an Account</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-auto">
        <div className="med-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Medi-Cure</h3>
              <p className="text-gray-300">
                Complete patient management solution for modern healthcare.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Patient Registration</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Hospital Management</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Appointment Booking</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Medication Tracking</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">API Reference</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Support</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Sales</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Partnerships</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300">&copy; 2023 Medi-Cure. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
