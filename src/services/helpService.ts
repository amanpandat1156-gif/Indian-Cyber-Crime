/**
 * NCRP Get Help Directory Service
 */

import { CyberPoliceStation, NodalBankOfficer, OfficialContact } from '../types';
import { POLICE_STATIONS, BANK_OFFICERS, OFFICIAL_CONTACTS } from './mockDb';
import { simulatedApiCall, ApiResponse } from './mockApi';

class HelpService {
  async getPoliceStations(filter?: { state?: string; query?: string }): Promise<ApiResponse<CyberPoliceStation[]>> {
    return simulatedApiCall(() => {
      let list = [...POLICE_STATIONS];
      if (filter?.state && filter.state !== 'All') {
        list = list.filter((ps) => ps.state.toLowerCase() === filter.state?.toLowerCase());
      }
      if (filter?.query) {
        const q = filter.query.toLowerCase().trim();
        list = list.filter(
          (ps) =>
            ps.name.toLowerCase().includes(q) ||
            ps.district.toLowerCase().includes(q) ||
            ps.address.toLowerCase().includes(q) ||
            ps.state.toLowerCase().includes(q)
        );
      }
      return list;
    }, 300, 500);
  }

  async getBankOfficers(filter?: { category?: string; query?: string }): Promise<ApiResponse<NodalBankOfficer[]>> {
    return simulatedApiCall(() => {
      let list = [...BANK_OFFICERS];
      if (filter?.category && filter.category !== 'All') {
        list = list.filter((b) => b.category === filter.category);
      }
      if (filter?.query) {
        const q = filter.query.toLowerCase().trim();
        list = list.filter(
          (b) =>
            b.bankName.toLowerCase().includes(q) ||
            b.nodalOfficerName.toLowerCase().includes(q) ||
            b.email.toLowerCase().includes(q)
        );
      }
      return list;
    }, 300, 500);
  }

  async getOfficialContacts(): Promise<ApiResponse<OfficialContact[]>> {
    return simulatedApiCall(() => {
      return OFFICIAL_CONTACTS;
    }, 200, 300);
  }
}

export const helpService = new HelpService();
