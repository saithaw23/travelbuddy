'use client';

import Link from 'next/link';
import { Shield, FileText, Database, Lock, Users, CheckCircle } from 'lucide-react';
import { ModeToggle } from './mode/mode-toggle';

export default function DataProcessingPage() {
  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white dark:bg-gray-900 shadow-md z-50 flex items-center justify-between px-10">
        <Link href="/" className="text-2xl font-bold text-purple-600">TravelBuddy</Link>
        <nav className="flex gap-10 items-center">
          <Link href="/about" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">About</Link>
          <Link href="/how-it-works" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">How It Works</Link>
          <Link href="/trust-safety" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">Trust & Safety</Link>
          <Link href="/blog" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">Blog</Link>
          <Link href="/contact" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">Contact</Link>
        </nav>

        <div className="flex gap-6 items-center">
          <ModeToggle />
          <Link href="/profile" className="flex items-center gap-4 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-semibold text-sm">JD</div>
            <div className="flex flex-col leading-tight">
              <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm">John Doe</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Signed in</div>
            </div>
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section 
        className="mt-20 flex items-center justify-center text-center relative overflow-hidden pt-24 pb-20"
        style={{
          background: 'linear-gradient(135deg, #9333ea 0%, #a855f7 50%, #c084fc 100%)',
        }}
      >
        <div className="relative z-10 max-w-4xl px-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-full mb-6">
            <Database className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold text-white">Legal Agreement</span>
          </div>
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Data Processing Agreement
          </h1>
          <p className="text-xl text-white text-opacity-95 drop-shadow">
            Last Updated: February 8, 2026
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="bg-gray-50 pb-16">
        <div className="max-w-4xl mx-auto px-10 -mt-10 relative z-20">
          
          {/* INTRODUCTION */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                This Data Processing Agreement ("DPA") forms part of the Terms of Service between you ("Data Controller") and TravelBuddy, Inc. ("Data Processor") and governs the processing of personal data in accordance with applicable data protection laws, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
              </p>
              <p>
                This DPA applies when TravelBuddy processes personal data on your behalf as part of providing our AI-powered travel planning services.
              </p>
              <div className="bg-purple-50 border-l-4 border-purple-600 p-4 mt-6">
                <p className="font-semibold text-purple-900">
                  By using TravelBuddy's services, you acknowledge and agree to the terms of this Data Processing Agreement.
                </p>
              </div>
            </div>
          </div>

          {/* DEFINITIONS */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">1. Definitions</h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    term: 'Personal Data',
                    definition: 'Any information relating to an identified or identifiable natural person, including names, email addresses, travel preferences, and booking information.'
                  },
                  {
                    term: 'Processing',
                    definition: 'Any operation performed on personal data, including collection, storage, use, disclosure, deletion, or any other handling of data.'
                  },
                  {
                    term: 'Data Subject',
                    definition: 'The individual to whom personal data relates (e.g., TravelBuddy users and their travel companions).'
                  },
                  {
                    term: 'Data Controller',
                    definition: 'The entity that determines the purposes and means of processing personal data (you, the user).'
                  },
                  {
                    term: 'Data Processor',
                    definition: 'The entity that processes personal data on behalf of the Data Controller (TravelBuddy, Inc.).'
                  },
                  {
                    term: 'Sub-Processor',
                    definition: 'Third-party service providers engaged by TravelBuddy to assist in processing personal data.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-bold text-gray-900 mb-2">{item.term}</h4>
                    <p className="text-sm text-gray-700">{item.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SCOPE OF PROCESSING */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">2. Scope of Processing</h2>
            </div>
            
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-purple-600 text-white">
                      <th className="p-3 text-left font-semibold">Aspect</th>
                      <th className="p-3 text-left font-semibold">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 font-semibold text-gray-900">Subject Matter</td>
                      <td className="p-3 text-gray-700">Provision of AI-powered travel planning and booking services</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="p-3 font-semibold text-gray-900">Duration</td>
                      <td className="p-3 text-gray-700">For the duration of the service agreement and 30 days post-termination</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 font-semibold text-gray-900">Nature of Processing</td>
                      <td className="p-3 text-gray-700">Collection, storage, analysis, transmission, deletion</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="p-3 font-semibold text-gray-900">Purpose</td>
                      <td className="p-3 text-gray-700">Trip planning, AI recommendations, booking management, customer support</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 font-semibold text-gray-900">Data Categories</td>
                      <td className="p-3 text-gray-700">Identity data, contact data, travel preferences, booking details, payment information</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-3 font-semibold text-gray-900">Data Subjects</td>
                      <td className="p-3 text-gray-700">TravelBuddy users, travel companions, group collaborators</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* PROCESSOR OBLIGATIONS */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">3. Data Processor Obligations</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p className="font-semibold text-purple-600">TravelBuddy agrees to:</p>
              
              <div className="space-y-3">
                {[
                  {
                    title: 'Process Only on Instructions',
                    description: 'Process personal data only in accordance with your documented instructions, unless required by law.'
                  },
                  {
                    title: 'Confidentiality',
                    description: 'Ensure that all personnel authorized to process personal data are bound by confidentiality obligations.'
                  },
                  {
                    title: 'Security Measures',
                    description: 'Implement appropriate technical and organizational measures to ensure data security (see Section 4).'
                  },
                  {
                    title: 'Sub-Processor Management',
                    description: 'Only engage sub-processors with your prior authorization and ensure they comply with equivalent obligations.'
                  },
                  {
                    title: 'Assist with Data Subject Rights',
                    description: 'Provide reasonable assistance to help you respond to data subject requests (access, deletion, correction, etc.).'
                  },
                  {
                    title: 'Data Breach Notification',
                    description: 'Notify you without undue delay (within 72 hours) upon becoming aware of a personal data breach.'
                  },
                  {
                    title: 'Deletion or Return',
                    description: 'Delete or return all personal data upon termination of services, unless retention is required by law.'
                  },
                  {
                    title: 'Audit Cooperation',
                    description: 'Make available all information necessary to demonstrate compliance and allow for audits.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="border-l-4 border-purple-600 pl-4 bg-purple-50 p-3 rounded-r-lg">
                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-700">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECURITY MEASURES */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">4. Security Measures</h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-gray-700">
                TravelBuddy implements the following technical and organizational measures to protect personal data:
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Technical Measures</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
                    <li>256-bit SSL/TLS encryption in transit</li>
                    <li>AES-256 encryption at rest</li>
                    <li>Multi-factor authentication</li>
                    <li>Automated threat detection</li>
                    <li>Regular security patching</li>
                    <li>Intrusion detection systems</li>
                    <li>Secure API authentication</li>
                    <li>Database encryption</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Organizational Measures</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
                    <li>Role-based access controls</li>
                    <li>Employee confidentiality agreements</li>
                    <li>Security awareness training</li>
                    <li>Incident response procedures</li>
                    <li>Regular security audits</li>
                    <li>Vendor security assessments</li>
                    <li>Data minimization practices</li>
                    <li>Backup and recovery procedures</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-4 mt-6">
                <p className="text-sm text-gray-800">
                  <strong>Certifications:</strong> TravelBuddy maintains SOC 2 Type II, ISO 27001, and GDPR compliance certifications. Annual audit reports available upon request.
                </p>
              </div>
            </div>
          </div>

          {/* SUB-PROCESSORS */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">5. Sub-Processors</h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-gray-700">
                TravelBuddy engages the following sub-processors to assist in providing our services. All sub-processors are bound by data protection agreements equivalent to this DPA.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-purple-600 text-white">
                      <th className="p-3 text-left font-semibold">Sub-Processor</th>
                      <th className="p-3 text-left font-semibold">Service</th>
                      <th className="p-3 text-left font-semibold">Location</th>
                      <th className="p-3 text-left font-semibold">Safeguards</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 font-semibold text-gray-900">Amazon Web Services (AWS)</td>
                      <td className="p-3 text-gray-700">Cloud hosting & storage</td>
                      <td className="p-3 text-gray-700">USA</td>
                      <td className="p-3 text-gray-700">SCCs, ISO 27001</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="p-3 font-semibold text-gray-900">Stripe, Inc.</td>
                      <td className="p-3 text-gray-700">Payment processing</td>
                      <td className="p-3 text-gray-700">USA</td>
                      <td className="p-3 text-gray-700">PCI DSS, SCCs</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 font-semibold text-gray-900">OpenAI, Inc.</td>
                      <td className="p-3 text-gray-700">AI chat & recommendations</td>
                      <td className="p-3 text-gray-700">USA</td>
                      <td className="p-3 text-gray-700">DPA, SCCs</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="p-3 font-semibold text-gray-900">Anthropic, Inc.</td>
                      <td className="p-3 text-gray-700">AI processing</td>
                      <td className="p-3 text-gray-700">USA</td>
                      <td className="p-3 text-gray-700">DPA, SCCs</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 font-semibold text-gray-900">SendGrid (Twilio)</td>
                      <td className="p-3 text-gray-700">Email delivery</td>
                      <td className="p-3 text-gray-700">USA</td>
                      <td className="p-3 text-gray-700">DPA, ISO 27001</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-3 font-semibold text-gray-900">Google Analytics</td>
                      <td className="p-3 text-gray-700">Usage analytics</td>
                      <td className="p-3 text-gray-700">USA</td>
                      <td className="p-3 text-gray-700">DPA, SCCs</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                <p className="text-sm text-gray-800">
                  <strong>Sub-Processor Changes:</strong> We will notify you at least 30 days before adding or replacing sub-processors. You may object to changes within 14 days.
                </p>
              </div>
            </div>
          </div>

          {/* DATA SUBJECT RIGHTS */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Data Subject Rights Assistance</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                TravelBuddy will assist you in responding to data subject requests within the required timeframes. We provide tools and support for:
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    right: 'Right of Access',
                    support: 'Export user data in machine-readable format (JSON/CSV)'
                  },
                  {
                    right: 'Right to Rectification',
                    support: 'Update or correct inaccurate personal data via account settings'
                  },
                  {
                    right: 'Right to Erasure',
                    support: 'Permanent deletion within 30 days of request'
                  },
                  {
                    right: 'Right to Restriction',
                    support: 'Temporarily suspend processing while disputes are resolved'
                  },
                  {
                    right: 'Right to Portability',
                    support: 'Provide data in structured, commonly used format'
                  },
                  {
                    right: 'Right to Object',
                    support: 'Stop processing for direct marketing or legitimate interests'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-bold text-gray-900 mb-2">{item.right}</h4>
                    <p className="text-sm text-gray-700">{item.support}</p>
                  </div>
                ))}
              </div>

              <div className="bg-purple-100 border-l-4 border-purple-600 p-4 mt-6">
                <p className="text-sm text-gray-800">
                  <strong>Response Time:</strong> We will respond to data subject requests within 30 days (or as required by applicable law). Complex requests may require an additional 30 days with notification.
                </p>
              </div>
            </div>
          </div>

          {/* DATA BREACH */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Data Breach Notification</h2>
            
            <div className="space-y-6">
              <div className="bg-red-50 border-2 border-red-600 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-red-900 mb-3">Breach Response Commitment</h3>
                <p className="text-gray-800">
                  In the event of a personal data breach, TravelBuddy will notify you without undue delay and no later than 72 hours after becoming aware of the breach.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Breach Notification Will Include:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Nature of the breach (categories and approximate number of data subjects affected)</li>
                  <li>Name and contact details of our Data Protection Officer</li>
                  <li>Likely consequences of the breach</li>
                  <li>Measures taken or proposed to address the breach and mitigate harm</li>
                  <li>Timeline of events and discovery</li>
                  <li>Recommendations for affected data subjects</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Incident Response Process:</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">1</div>
                    <h4 className="font-semibold text-gray-900 mb-1">Detection</h4>
                    <p className="text-xs text-gray-600">Automated monitoring & alerts</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">2</div>
                    <h4 className="font-semibold text-gray-900 mb-1">Containment</h4>
                    <p className="text-xs text-gray-600">Isolate affected systems</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
                    <h4 className="font-semibold text-gray-900 mb-1">Notification</h4>
                    <p className="text-xs text-gray-600">Inform within 72 hours</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">4</div>
                    <h4 className="font-semibold text-gray-900 mb-1">Remediation</h4>
                    <p className="text-xs text-gray-600">Fix & prevent recurrence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* INTERNATIONAL TRANSFERS */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">8. International Data Transfers</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                Personal data may be transferred to and processed in countries outside the European Economic Area (EEA) and the United Kingdom. TravelBuddy ensures appropriate safeguards are in place:
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-purple-600 pl-4 bg-purple-50 p-4 rounded-r-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Standard Contractual Clauses (SCCs)</h4>
                  <p className="text-sm">We use the European Commission's approved Standard Contractual Clauses for transfers to countries without adequacy decisions.</p>
                </div>

                <div className="border-l-4 border-purple-600 pl-4 bg-purple-50 p-4 rounded-r-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Adequacy Decisions</h4>
                  <p className="text-sm">Where available, we rely on adequacy decisions by the European Commission recognizing equivalent data protection standards.</p>
                </div>

                <div className="border-l-4 border-purple-600 pl-4 bg-purple-50 p-4 rounded-r-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Supplementary Measures</h4>
                  <p className="text-sm">Additional technical measures (encryption, pseudonymization) and organizational safeguards to protect transferred data.</p>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mt-6">
                <p className="text-sm text-gray-800">
                  <strong>Transfer Impact Assessment:</strong> We conduct regular assessments to ensure the effectiveness of transfer mechanisms and safeguards.
                </p>
              </div>
            </div>
          </div>

          {/* AUDIT RIGHTS */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">9. Audit Rights</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                You have the right to audit TravelBuddy's compliance with this DPA. We provide the following audit options:
              </p>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">Annual Reports</h4>
                  <p className="text-sm">SOC 2 Type II and ISO 27001 audit reports available upon request</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">Questionnaires</h4>
                  <p className="text-sm">Complete security questionnaires and compliance assessments</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">On-Site Audits</h4>
                  <p className="text-sm">Schedule on-site audits with 30 days notice (reasonable frequency)</p>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mt-6">
                <p className="text-sm text-gray-800">
                  <strong>Audit Costs:</strong> TravelBuddy provides one free audit per year. Additional audits may incur reasonable costs. On-site audits must not disrupt normal business operations.
                </p>
              </div>
            </div>
          </div>

          {/* TERM AND TERMINATION */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">10. Term & Termination</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">10.1 Term</h3>
                <p className="text-gray-700">
                  This DPA takes effect when you begin using TravelBuddy's services and remains in effect for as long as we process personal data on your behalf.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">10.2 Termination</h3>
                <p className="text-gray-700 mb-3">This DPA terminates automatically when:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>You delete your TravelBuddy account</li>
                  <li>Your subscription or service agreement ends</li>
                  <li>Either party terminates the Terms of Service</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">10.3 Data Deletion Upon Termination</h3>
                <div className="bg-red-50 border-l-4 border-red-600 p-4">
                  <p className="text-gray-800 mb-3">
                    <strong>Within 30 days of termination, TravelBuddy will:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-800 ml-4">
                    <li>Delete or anonymize all personal data in our systems</li>
                    <li>Instruct sub-processors to delete personal data</li>
                    <li>Provide written certification of deletion upon request</li>
                    <li>Return any data you request before deletion</li>
                  </ul>
                </div>
                <p className="text-gray-700 mt-4">
                  <strong>Exception:</strong> Data may be retained if required by law (e.g., tax records, legal holds). Retained data remains subject to confidentiality obligations.
                </p>
              </div>
            </div>
          </div>

          {/* LIABILITY */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">11. Liability & Indemnification</h2>
            
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">11.1 Liability</h3>
                <p>
                  Each party's liability under this DPA is subject to the limitation of liability provisions in the Terms of Service, except where prohibited by applicable data protection law.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">11.2 Indemnification</h3>
                <p className="mb-3">TravelBuddy will indemnify you against claims arising from:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>TravelBuddy's breach of this DPA</li>
                  <li>TravelBuddy's violation of data protection laws</li>
                  <li>Unauthorized processing by TravelBuddy or its sub-processors</li>
                </ul>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-600 p-4 mt-6">
                <p className="text-sm text-gray-800">
                  <strong>Insurance:</strong> TravelBuddy maintains cyber liability insurance with coverage of $5,000,000 per occurrence.
                </p>
              </div>
            </div>
          </div>

          {/* CONTACT */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-6">12. Contact Information</h2>
            <div className="space-y-4">
              <p>For questions about this Data Processing Agreement or data protection matters:</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2">Data Protection Officer</h4>
                  <p className="text-purple-100">
                    Email: <a href="mailto:dpo@travelbuddy.com" className="text-white hover:underline">dpo@travelbuddy.com</a><br />
                    Phone: +1 (415) 555-0199
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Legal Department</h4>
                  <p className="text-purple-100">
                    Email: <a href="mailto:legal@travelbuddy.com" className="text-white hover:underline">legal@travelbuddy.com</a><br />
                    Phone: +1 (415) 555-0100
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-purple-400">
                <h4 className="font-bold mb-2">Mailing Address</h4>
                <p className="text-purple-100">
                  TravelBuddy, Inc.<br />
                  Attn: Data Protection Officer<br />
                  123 Innovation Drive<br />
                  San Francisco, CA 94105<br />
                  United States
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-purple-400">
                <h4 className="font-bold mb-2">EU Representative</h4>
                <p className="text-purple-100">
                  TravelBuddy EU Representative<br />
                  Email: <a href="mailto:eu-rep@travelbuddy.com" className="text-white hover:underline">eu-rep@travelbuddy.com</a><br />
                  Address: [EU Representative Address]
                </p>
              </div>
            </div>
          </div>

          {/* OTHER LEGAL DOCS */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Legal Documents</h3>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/privacy-policy" className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="px-6 py-3 bg-white text-purple-600 border-2 border-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="px-6 py-3 bg-white text-purple-600 border-2 border-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all">
                Cookie Policy
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white text-center py-10 text-sm">
        <p>&copy; 2026 TravelBuddy. All rights reserved. | 
          <Link href="/privacy-policy" className="text-purple-400 hover:text-purple-300 transition"> Privacy Policy</Link> | 
          <Link href="/terms-of-service" className="text-purple-400 hover:text-purple-300 transition"> Terms of Service</Link> | 
          <Link href="/contact" className="text-purple-400 hover:text-purple-300 transition"> Contact Us</Link>
        </p>
      </footer>
    </>
  );
}
