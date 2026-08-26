import React, { useState, useEffect } from 'react';
import {
  PhoneCall,
  Building2,
  Landmark,
  Search,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { helpService } from '../services/helpService';
import { CyberPoliceStation, NodalBankOfficer, OfficialContact } from '../types';

export const HelpPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'police' | 'banks' | 'contacts'>('police');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');

  const [policeStations, setPoliceStations] = useState<CyberPoliceStation[]>([]);
  const [bankOfficers, setBankOfficers] = useState<NodalBankOfficer[]>([]);
  const [officialContacts, setOfficialContacts] = useState<OfficialContact[]>([]);

  const statesList = ['All', 'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Gujarat', 'Uttar Pradesh'];

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === 'police') {
        const res = await helpService.getPoliceStations({ state: selectedState, query: searchQuery });
        if (res.success && res.data) setPoliceStations(res.data);
      } else if (activeTab === 'banks') {
        const res = await helpService.getBankOfficers({ query: searchQuery });
        if (res.success && res.data) setBankOfficers(res.data);
      } else {
        const res = await helpService.getOfficialContacts();
        if (res.success && res.data) setOfficialContacts(res.data);
      }
    };
    fetchData();
  }, [activeTab, selectedState, searchQuery]);

  return (
    <div className="w-full bg-[#F8F7F3] min-h-screen py-5 sm:py-12">
      <Container size="lg" className="px-3.5 sm:px-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="text-[10.5px] sm:text-[12px] font-bold tracking-widest text-[#1D60A1] uppercase mb-1 sm:mb-1.5">
            CITIZEN SUPPORT & DIRECTORY
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#12304A] tracking-tight">
            Get Help & Official Contacts
          </h1>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#5E6B73] leading-relaxed max-w-3xl">
            You don't need to know which government agency to approach. Access the unified national helpline (1930), locate your nearest cyber police station, or find nodal bank fraud escalation desks.
          </p>
        </div>

        {/* 1930 Helpline Master Callout Banner */}
        <div className="mb-6 sm:mb-8 bg-white rounded-[10px] border border-[#DDE2E4] p-4.5 sm:p-8 shadow-card flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 sm:gap-6 overflow-hidden relative">
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FDE8E8] text-[#8B2626] flex items-center justify-center shrink-0 mt-0.5">
              <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="text-[11px] sm:text-xs font-bold text-[#8B2626] uppercase tracking-wider mb-0.5">
                NATIONAL FINANCIAL FRAUD HELPLINE
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#12304A]">
                Toll-Free 1930 (24x7)
              </h2>
              <p className="text-xs sm:text-sm text-[#5E6B73] mt-1 max-w-xl">
                Reporting immediately within the golden hour triggers coordinated freeze requests across Indian banks and payment intermediaries.
              </p>
            </div>
          </div>

          <a
            href="tel:1930"
            className="shrink-0 w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-md bg-[#8B2626] text-white font-bold text-sm hover:bg-[#731F1F] transition-colors shadow-sm"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 1930 Now</span>
          </a>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#DDE2E4] mb-6 overflow-x-auto no-scrollbar gap-1 sm:gap-0">
          <button
            type="button"
            onClick={() => {
              setActiveTab('police');
              setSearchQuery('');
            }}
            className={`pb-3 px-3.5 sm:px-4 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap relative min-h-[40px] sm:min-h-0 ${
              activeTab === 'police'
                ? 'text-[#12304A] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#12304A]'
                : 'text-[#5E6B73] hover:text-[#12304A]'
            }`}
          >
            Cyber Police Stations
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('banks');
              setSearchQuery('');
            }}
            className={`pb-3 px-3.5 sm:px-4 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap relative min-h-[40px] sm:min-h-0 ${
              activeTab === 'banks'
                ? 'text-[#12304A] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#12304A]'
                : 'text-[#5E6B73] hover:text-[#12304A]'
            }`}
          >
            Bank Nodal Officers
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('contacts');
              setSearchQuery('');
            }}
            className={`pb-3 px-3.5 sm:px-4 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap relative min-h-[40px] sm:min-h-0 ${
              activeTab === 'contacts'
                ? 'text-[#12304A] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#12304A]'
                : 'text-[#5E6B73] hover:text-[#12304A]'
            }`}
          >
            Official Helplines & Escalation
          </button>
        </div>

        {/* Tab 1: Police Stations Directory */}
        {activeTab === 'police' && (
          <div className="space-y-6">
            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#5E6B73]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by station name, district, or address..."
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#DDE2E4] rounded-md focus:border-[#12304A] focus:outline-none"
                />
              </div>

              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-3 py-2 bg-white border border-[#DDE2E4] rounded-md text-sm font-medium text-[#1C252C] focus:border-[#12304A] focus:outline-none"
              >
                {statesList.map((st) => (
                  <option key={st} value={st}>
                    {st === 'All' ? 'All States' : st}
                  </option>
                ))}
              </select>
            </div>

            {/* Grid of Police Stations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {policeStations.map((station) => (
                <div
                  key={station.id}
                  className="bg-white rounded-[10px] border border-[#DDE2E4] p-5 shadow-card space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold text-[#1D60A1] uppercase tracking-wider block">
                        {station.state} &bull; {station.district}
                      </span>
                      <h3 className="text-base font-bold text-[#12304A] mt-0.5">
                        {station.name}
                      </h3>
                    </div>
                    <Building2 className="w-5 h-5 text-[#5E6B73] shrink-0" />
                  </div>

                  <p className="text-xs text-[#5E6B73] leading-relaxed flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{station.address}</span>
                  </p>

                  <div className="pt-3 border-t border-[#F0F2F3] flex flex-wrap items-center justify-between gap-2 text-xs">
                    <a
                      href={`tel:${station.phone}`}
                      className="inline-flex items-center gap-1.5 text-[#12304A] font-bold hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{station.phone}</span>
                    </a>

                    <a
                      href={`mailto:${station.email}`}
                      className="inline-flex items-center gap-1.5 text-[#5E6B73] hover:text-[#12304A]"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{station.email}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Bank Nodal Officers Directory */}
        {activeTab === 'banks' && (
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#5E6B73]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bank name or nodal desk..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#DDE2E4] rounded-md focus:border-[#12304A] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bankOfficers.map((bank) => (
                <div
                  key={bank.id}
                  className="bg-white rounded-[10px] border border-[#DDE2E4] p-5 shadow-card space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        {bank.category}
                      </span>
                      <h3 className="text-base font-bold text-[#12304A] mt-0.5">
                        {bank.bankName}
                      </h3>
                    </div>
                    <Landmark className="w-5 h-5 text-[#5E6B73] shrink-0" />
                  </div>

                  <div className="text-xs text-[#1C252C] space-y-1">
                    <div><strong>Nodal Contact:</strong> {bank.nodalOfficerName}</div>
                    <div><strong>Escalation:</strong> {bank.escalationLevel}</div>
                  </div>

                  <div className="pt-3 border-t border-[#F0F2F3] flex flex-wrap items-center justify-between gap-2 text-xs">
                    <a
                      href={`tel:${bank.phone}`}
                      className="inline-flex items-center gap-1.5 text-[#12304A] font-bold hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{bank.phone}</span>
                    </a>

                    <a
                      href={`mailto:${bank.email}`}
                      className="inline-flex items-center gap-1.5 text-[#5E6B73] hover:text-[#12304A]"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{bank.email}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Official Helplines */}
        {activeTab === 'contacts' && (
          <div className="space-y-4">
            {officialContacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white rounded-[10px] border border-[#DDE2E4] p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="text-base font-bold text-[#12304A]">{contact.agency}</h3>
                  <p className="text-xs text-[#5E6B73] mt-0.5">{contact.role}</p>
                  <div className="text-xs text-[#1C252C] mt-2 font-medium">
                    Working Hours: {contact.timings}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <a
                    href={`tel:${contact.tollFree}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#12304A] text-white text-xs font-bold hover:bg-[#0B2235]"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{contact.tollFree}</span>
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[#DDE2E4] text-xs font-semibold text-[#5E6B73] hover:bg-[#F8F7F3]"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{contact.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};
