import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Eye, ArrowLeft, Languages, MonitorCheck, Users, Mail, PhoneCall } from 'lucide-react';

export const AccessibilityPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F8F7F3] min-h-screen py-8 sm:py-12">
      <Container size="full" className="max-w-[1000px] px-4 sm:px-6">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#12304A] hover:text-[#1D60A1] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Header Hero */}
        <div className="bg-white rounded-[12px] border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-[8px] bg-[#EBF1F6] text-[#12304A] flex items-center justify-center">
              <Eye className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#5E6B73]">
                INCLUSION & DIGITAL ACCESSIBILITY
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#12304A] tracking-tight">
                Accessibility Statement
              </h1>
            </div>
          </div>
          <p className="text-sm text-[#5E6B73] leading-relaxed max-w-3xl mt-2">
            The National Cyber Crime Reporting Portal is committed to ensuring digital accessibility for people of all abilities, adhering strictly to the Guidelines for Indian Government Websites (GIGW 2.0) and international WCAG 2.1 Level AA standards.
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span><strong>Conformance Target:</strong> WCAG 2.1 Level AA & GIGW 2.0 Standards</span>
            <span>&bull;</span>
            <span><strong>Platform Version:</strong> NCRP 2.0 Institutional Redesign</span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 text-sm text-[#2C3840] leading-relaxed">
          {/* Section 1 */}
          <div className="bg-white rounded-[12px] border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-[#12304A] font-bold text-base border-b border-slate-100 pb-3">
              <MonitorCheck className="w-5 h-5 text-[#1D60A1]" />
              <h2>1. Compliance Standards & GIGW Framework</h2>
            </div>
            <p>
              This portal has been developed to ensure that essential cybercrime reporting and verification services are equally accessible to all citizens, including individuals with visual, auditory, motor, or cognitive disabilities:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>
                <strong>Semantic HTML5 Architecture:</strong> Structured heading hierarchies (<code>H1</code>, <code>H2</code>, <code>H3</code>), landmark regions (<code>header</code>, <code>nav</code>, <code>main</code>, <code>aside</code>, <code>footer</code>), and descriptive ARIA attributes for seamless assistive technology interpretation.
              </li>
              <li>
                <strong>Color Contrast Assurance:</strong> All text and core interactive elements meet or exceed the minimum 4.5:1 contrast ratio against light surface backgrounds.
              </li>
              <li>
                <strong>Skip to Content Navigation:</strong> Direct keyboard shortcut mechanism allowing screen reader and switch device users to bypass repetitive header elements.
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-[12px] border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-[#12304A] font-bold text-base border-b border-slate-100 pb-3">
              <Users className="w-5 h-5 text-[#237A57]" />
              <h2>2. Built-in Accessibility Features & Assistive Controls</h2>
            </div>
            <p>
              Users can customize their viewing experience directly through the top utility bar controls without requiring third-party plugins:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-[8px] bg-slate-50 border border-slate-200">
                <div className="font-bold text-[#12304A] text-xs mb-1">Dynamic Font Resizing</div>
                <p className="text-xs text-slate-600">
                  Switch between <strong>Standard (A-)</strong>, <strong>Large (A)</strong>, and <strong>Extra Large (A+)</strong> font scaling across all portal forms and dashboards with zero horizontal layout distortion.
                </p>
              </div>
              <div className="p-4 rounded-[8px] bg-slate-50 border border-slate-200">
                <div className="font-bold text-[#12304A] text-xs mb-1">Keyboard Accessibility</div>
                <p className="text-xs text-slate-600">
                  Complete portal functionality is navigable via standard keyboard inputs (Tab, Shift+Tab, Enter, Spacebar, Escape) with high-visibility 2px focus ring indicators.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-[12px] border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-[#12304A] font-bold text-base border-b border-slate-100 pb-3">
              <Languages className="w-5 h-5 text-[#D8891C]" />
              <h2>3. Linguistic Inclusivity via Bhashini</h2>
            </div>
            <p>
              To ensure digital equity across all Indian states and union territories, the portal integrates real-time multilingual capabilities:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>
                <strong>11 Official Scheduled Languages:</strong> English, Hindi, Bengali, Telugu, Marathi, Tamil, Gujarati, Kannada, Malayalam, Odia, and Punjabi.
              </li>
              <li>
                <strong>AI-Assisted Speech-to-Text:</strong> Complainants can dictate crime descriptions in their native regional language through the reporting wizard.
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-[12px] border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-[#12304A] font-bold text-base border-b border-slate-100 pb-3">
              <Mail className="w-5 h-5 text-[#8B2626]" />
              <h2>4. Accessibility Feedback & Grievance Redressal</h2>
            </div>
            <p>
              If you experience any difficulty accessing content or utilizing features on this portal, please contact the designated Accessibility & Technical Grievance Officer:
            </p>
            <div className="p-4 rounded-[8px] bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
              <div><strong>Nodal Accessibility Desk:</strong> Indian Cybercrime Coordination Centre (I4C)</div>
              <div><strong>Address:</strong> Ministry of Home Affairs, NDCC-II Building, Jai Singh Road, New Delhi - 110001</div>
              <div className="flex items-center gap-2 pt-1">
                <Mail className="w-3.5 h-3.5 text-[#12304A]" />
                <span>Email: <strong>accessibility-support@cybercrime.gov.in</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#12304A]" />
                <span>Helpline: <strong>1930</strong> (24x7 Citizen Helpline)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-200">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[8px] bg-[#12304A] text-white text-sm font-semibold hover:bg-[#0B2235] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            to="/terms"
            className="text-xs font-semibold text-[#1D60A1] hover:underline"
          >
            Read Terms of Use &rarr;
          </Link>
        </div>
      </Container>
    </div>
  );
};
