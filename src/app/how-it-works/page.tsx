'use client';

import Link from 'next/link';
import { ArrowRight, Users, Package, Heart, Clock, MapPin, Shield, Award, CheckCircle } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: "Post Your Donation",
      description: "Donors upload details about available food items including photos, expiry dates, and pickup location.",
      icon: Package,
      color: "bg-blue-500"
    },
    {
      number: 2,
      title: "Organizations Discover",
      description: "Local organizations browse available donations and find items that match their needs and capacity.",
      icon: Users,
      color: "bg-green-500"
    },
    {
      number: 3,
      title: "Claim & Coordinate",
      description: "Organizations claim donations and coordinate pickup times directly through our messaging system.",
      icon: Clock,
      color: "bg-purple-500"
    },
    {
      number: 4,
      title: "Make Impact",
      description: "Food reaches those in need, reducing waste and fighting hunger in your local community.",
      icon: Heart,
      color: "bg-red-500"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Verified Organizations",
      description: "All organizations are vetted to ensure food reaches legitimate charitable causes."
    },
    {
      icon: MapPin,
      title: "Location-Based Matching",
      description: "Smart matching system connects donors with nearby organizations for efficient pickup."
    },
    {
      icon: Award,
      title: "Impact Tracking",
      description: "Track your contributions and see the real impact you're making in your community."
    }
  ];

  const userTypes = [
    {
      title: "For Food Donors",
      description: "Restaurants, grocery stores, cafes, and individuals with surplus food",
      benefits: [
        "Reduce food waste and disposal costs",
        "Gain tax benefits for charitable donations",
        "Build positive community relationships",
        "Track your environmental impact"
      ],
      cta: "Start Donating",
      link: "/register?type=donor"
    },
    {
      title: "For Organizations",
      description: "Food banks, shelters, community centers, and charitable organizations",
      benefits: [
        "Access fresh, quality food donations",
        "Coordinate efficient pickup schedules",
        "Connect with multiple donor sources",
        "Manage donations through one platform"
      ],
      cta: "Join as Organization",
      link: "/register?type=organization"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Save&Serve</span>
            </Link>
            <div className="flex space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
              <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            How Save&Serve
            <span className="text-blue-600 block">Works</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Our platform connects food donors with local organizations to reduce waste and fight hunger. 
            Here's how we make it simple, safe, and impactful.
          </p>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple 4-Step Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From posting donations to making impact, our streamlined process makes food rescue effortless
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className={`${step.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-gray-500 mb-2">STEP {step.number}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Save&Serve</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built with safety, efficiency, and impact in mind
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Types */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Perfect for Everyone</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you're a donor or organization, Save&Serve has the tools you need
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {userTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{type.title}</h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                
                <div className="space-y-3 mb-8">
                  {type.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  href={type.link}
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <span>{type.cta}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of donors and organizations already making a difference in their communities
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="opacity-90">Meals Rescued</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="opacity-90">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">300+</div>
              <div className="opacity-90">Partner Organizations</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register?type=donor"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Start Donating Food
            </Link>
            <Link 
              href="/register?type=organization"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Join as Organization
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Package className="h-8 w-8 text-blue-500" />
                <span className="text-xl font-bold">Save&Serve</span>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting food donors with local organizations to reduce waste and fight hunger.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-gray-400 hover:text-white">Home</Link>
                <Link href="/how-it-works" className="block text-gray-400 hover:text-white">How It Works</Link>
                <Link href="/login" className="block text-gray-400 hover:text-white">Login</Link>
                <Link href="/register" className="block text-gray-400 hover:text-white">Register</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-white">Help Center</Link>
                <Link href="#" className="block text-gray-400 hover:text-white">Contact Us</Link>
                <Link href="#" className="block text-gray-400 hover:text-white">Privacy Policy</Link>
                <Link href="#" className="block text-gray-400 hover:text-white">Terms of Service</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Save&Serve. All rights reserved. Fighting hunger, reducing waste.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}