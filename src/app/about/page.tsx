'use client';

import Link from 'next/link';
import { Package, Heart, Users, Target, Award, Globe, ArrowRight, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { number: "50,000+", label: "Meals Rescued", icon: Package },
    { number: "1,200+", label: "Active Users", icon: Users },
    { number: "300+", label: "Partner Organizations", icon: Heart },
    { number: "95%", label: "Food Waste Reduction", icon: Target }
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassion First",
      description: "Every action we take is driven by our commitment to fighting hunger and supporting communities in need."
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "We believe in creating a circular food economy that reduces waste and maximizes resource utilization."
    },
    {
      icon: Users,
      title: "Community Connection",
      description: "Building bridges between donors and organizations to strengthen local food security networks."
    },
    {
      icon: Award,
      title: "Trust & Transparency",
      description: "Maintaining the highest standards of verification, safety, and accountability in all our operations."
    }
  ];

  const timeline = [
    {
      year: "2023",
      title: "The Beginning",
      description: "Founded with a mission to tackle food waste and hunger simultaneously through technology."
    },
    {
      year: "2024",
      title: "Platform Launch",
      description: "Launched our web platform connecting local donors with verified charitable organizations."
    },
    {
      year: "2024",
      title: "Rapid Growth",
      description: "Reached 1,000+ users and rescued over 25,000 meals in our first year of operation."
    },
    {
      year: "2025",
      title: "Expansion & Impact",
      description: "Expanded to multiple cities and achieved 50,000+ meals rescued milestone."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Co-Founder & CEO",
      bio: "Former food industry executive passionate about sustainable food systems and social impact.",
      image: "/api/placeholder/120/120"
    },
    {
      name: "Marcus Rodriguez",
      role: "Co-Founder & CTO",
      bio: "Tech entrepreneur with expertise in building scalable platforms for social good.",
      image: "/api/placeholder/120/120"
    },
    {
      name: "Elena Kowalski",
      role: "Head of Operations",
      bio: "Nonprofit sector veteran specializing in food rescue operations and community partnerships.",
      image: "/api/placeholder/120/120"
    },
    {
      name: "David Kim",
      role: "Head of Product",
      bio: "UX designer and product strategist focused on creating intuitive experiences for social impact.",
      image: "/api/placeholder/120/120"
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
              <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                How It Works
              </Link>
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
            About
            <span className="text-blue-600 block">Save&Serve</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We're on a mission to create a world where no food goes to waste while no person goes hungry. 
            Through technology and community partnerships, we're building the bridge between surplus and need.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Save&Serve exists to eliminate food waste while fighting hunger in our communities. We believe that technology 
              can solve one of society's most pressing paradoxes: the coexistence of food waste and food insecurity. By connecting 
              those who have surplus with those who serve the hungry, we create a more sustainable and equitable food system for everyone.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision we make and every feature we build
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From idea to impact - the milestones that shaped Save&Serve
            </p>
          </div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="bg-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center font-bold">
                    {item.year}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate individuals working to create a more sustainable food future
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">UN Sustainable Development Goals</h2>
          <p className="text-xl mb-8 opacity-90">
            Save&Serve directly contributes to achieving the UN's Sustainable Development Goals, 
            particularly SDG 2: Zero Hunger and SDG 12: Responsible Consumption and Production.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <Target className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">SDG 2: Zero Hunger</h3>
              <p className="opacity-90">
                By connecting surplus food with those in need, we directly support efforts to end hunger 
                and achieve food security for all.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <Globe className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">SDG 12: Responsible Consumption</h3>
              <p className="opacity-90">
                Our platform promotes sustainable consumption patterns by reducing food waste 
                and maximizing resource utilization.
              </p>
            </div>
          </div>

          <Link 
            href="/register"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            <span>Join Our Mission</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-600 mb-8">
            Have questions? Want to partner with us? We'd love to hear from you.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">General Inquiries</h3>
              <p className="text-gray-600">hello@saveandserve.org</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Partnership Opportunities</h3>
              <p className="text-gray-600">partnerships@saveandserve.org</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Technical Support</h3>
              <p className="text-gray-600">support@saveandserve.org</p>
            </div>
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
                <Link href="/about" className="block text-gray-400 hover:text-white">About</Link>
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