import Link from 'next/link'
import { ArrowRight, Users, Utensils, Heart } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-green-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">Save&Serve</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900">
                How It Works
              </Link>
              <Link 
                href="/login" 
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Fighting Hunger,
            <span className="text-green-600"> One Meal at a Time</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect surplus food from restaurants and events with organizations that serve those in need. 
            Together, we can reduce food waste and feed our communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register?type=donor" 
              className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center"
            >
              I Want to Donate Food
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/register?type=organization" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
            >
              I'm an Organization
              <Users className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">150K+</div>
            <div className="text-gray-600">Meals Rescued</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">75 Tons</div>
            <div className="text-gray-600">Food Saved from Waste</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
            <div className="text-gray-600">Partner Organizations</div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How Save&Serve Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Utensils className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">List Your Food</h3>
              <p className="text-gray-600">
                Restaurants and venues post surplus food with photos, quantities, and pickup times.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Organizations Claim</h3>
              <p className="text-gray-600">
                Local shelters and food banks receive instant notifications and claim donations.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Feed Communities</h3>
              <p className="text-gray-600">
                Food reaches those who need it most while reducing environmental waste.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Join the Movement Against Food Waste
          </h2>
          <p className="text-xl mb-6">
            Every donation makes a difference. Start saving food and feeding communities today.
          </p>
          <Link 
            href="/register" 
            className="bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-green-600 mr-2" />
                <span className="text-xl font-bold">Save&Serve</span>
              </div>
              <p className="text-gray-400">
                Supporting UN SDG 2: Zero Hunger through food rescue and community connection.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">For Donors</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/register?type=donor" className="hover:text-white">Sign Up</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white">How to Donate</Link></li>
                <li><Link href="/impact" className="hover:text-white">Track Impact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">For Organizations</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/register?type=organization" className="hover:text-white">Join Network</Link></li>
                <li><Link href="/verification" className="hover:text-white">Verification Process</Link></li>
                <li><Link href="/resources" className="hover:text-white">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Save&Serve. Together for Zero Hunger.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}