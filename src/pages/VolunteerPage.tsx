import React, { useState } from 'react';
import { ArrowRight, HeartHandshake, Loader2 } from 'lucide-react';
import { Container } from '../components/common/Container';
import { useAuth } from '../context/AuthContext';
import { volunteerService } from '../services/volunteerService';
import { VolunteerApplication } from '../types';

export const VolunteerPage: React.FC = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [state, setState] = useState('Delhi');
  const [city, setCity] = useState('New Delhi');
  const [experience, setExperience] = useState('');
  const [selectedAreas, setSelectedAreas] = useState<string[]>(['Cyber Safety Awareness Generation']);

  const [loading, setLoading] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<VolunteerApplication | null>(null);
  const [error, setError] = useState<string | null>(null);

  const volunteerAreas = [
    'Cyber Safety Awareness Generation',
    'Unlawful Content & Threat Reporting',
    'Technical & Forensic Expertise',
    'Local Language Translation & Content',
    'Senior Citizen Cyber Hygiene Outreach',
  ];

  const toggleArea = (area: string) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await volunteerService.submitApplication({
      userId: user?.id,
      fullName,
      email,
      phone,
      state,
      city,
      areasOfInterest: selectedAreas,
      experience,
    });

    setLoading(false);

    if (res.success && res.data) {
      setSubmittedApp(res.data);
    } else {
      setError(res.error || 'Failed to submit application.');
    }
  };

  return (
    <div className="w-full bg-[#F8F7F3] min-h-screen py-8 sm:py-12">
      <Container size="md">
        <div className="mb-8">
          <div className="text-[11px] sm:text-[12px] font-bold tracking-widest text-[#1D60A1] uppercase mb-1.5">
            CITIZEN COLLABORATION INITIATIVE
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#12304A] tracking-tight">
            Cyber Volunteer Programme
          </h1>
          <p className="mt-2 text-sm text-[#5E6B73] leading-relaxed">
            Join the Indian Cybercrime Coordination Centre (I4C) initiative to spread digital safety awareness, identify malicious cyber activities, and protect vulnerable citizens.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[#FDF2F2] border border-[#F8D7DA] rounded-[8px] text-sm text-[#992E2E]">
            {error}
          </div>
        )}

        {!submittedApp ? (
          <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-6 sm:p-8 shadow-card">
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#1C252C] mb-1">
                    Full Legal Name <span className="text-[#8B2626]">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="As per Government ID"
                    className="w-full px-3 py-2 text-sm bg-[#FBFBFA] border border-[#DDE2E4] rounded-md focus:bg-white focus:border-[#12304A] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1C252C] mb-1">
                    Mobile Number <span className="text-[#8B2626]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile"
                    className="w-full px-3 py-2 text-sm bg-[#FBFBFA] border border-[#DDE2E4] rounded-md focus:bg-white focus:border-[#12304A] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-[#1C252C] mb-1">
                    Email Address <span className="text-[#8B2626]">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#FBFBFA] border border-[#DDE2E4] rounded-md focus:bg-white focus:border-[#12304A] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1C252C] mb-1">State / UT</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#FBFBFA] border border-[#DDE2E4] rounded-md focus:bg-white focus:border-[#12304A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1C252C] mb-1">City / District</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#FBFBFA] border border-[#DDE2E4] rounded-md focus:bg-white focus:border-[#12304A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1C252C] mb-2">
                  Select Areas of Contribution <span className="text-[#8B2626]">*</span>
                </label>
                <div className="space-y-2">
                  {volunteerAreas.map((area) => (
                    <label
                      key={area}
                      className="flex items-center gap-2.5 p-2.5 rounded border border-[#E2E6E8] bg-[#FBFBFA] hover:bg-white cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAreas.includes(area)}
                        onChange={() => toggleArea(area)}
                        className="w-4 h-4 rounded text-[#12304A]"
                      />
                      <span className="font-medium text-[#1C252C]">{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1C252C] mb-1">
                  Brief Technical / Community Background (Optional)
                </label>
                <textarea
                  rows={3}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Share any relevant cybersecurity background, academic interest, or social awareness experience."
                  className="w-full px-3 py-2 text-sm bg-[#FBFBFA] border border-[#DDE2E4] rounded-md focus:bg-white focus:border-[#12304A] focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#DDE2E4] flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-[#12304A] text-white text-sm font-bold hover:bg-[#0B2235] transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Volunteer Application</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-[10px] border border-[#DDE2E4] p-8 shadow-card text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#E6F4EA] text-[#237A57] flex items-center justify-center mb-4">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-badge mb-2">
              APPLICATION RECEIVED
            </div>
            <h2 className="text-2xl font-bold text-[#12304A]">
              Thank you, {submittedApp.fullName}
            </h2>
            <p className="mt-2 text-sm text-[#5E6B73] max-w-md">
              Your application has been registered with the I4C Cyber Volunteer Cell. You will receive an invitation for the upcoming regional orientation workshop on <strong>{submittedApp.email}</strong>.
            </p>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setSubmittedApp(null)}
                className="px-5 py-2 rounded-md border border-[#DDE2E4] text-xs font-semibold text-[#12304A] hover:bg-[#F8F7F3]"
              >
                Submit Another Registration
              </button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
