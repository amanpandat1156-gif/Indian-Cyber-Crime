/**
 * NCRP Evidence Upload & Simulated OCR Extraction Service
 */

import { Evidence, ExtractedFinancialData } from '../types';
import { delay, ApiResponse, simulatedApiCall } from './mockApi';

class EvidenceService {
  async processFileUpload(
    file: File,
    onStatusChange?: (status: 'uploading' | 'processing' | 'processed') => void
  ): Promise<ApiResponse<Evidence>> {
    onStatusChange?.('uploading');
    await delay(600);

    onStatusChange?.('processing');
    await delay(1200);

    return simulatedApiCall(() => {
      const isImage = file.type.startsWith('image/');
      const isPdf = file.type === 'application/pdf';

      let mockExtracted: ExtractedFinancialData | undefined = undefined;

      // Simulate financial extraction for transaction-related files
      if (isImage || isPdf) {
        mockExtracted = {
          amount: 48500,
          date: '2026-08-24',
          transactionId: `TXN${Math.floor(1000000000 + Math.random() * 9000000000)}`,
          bankName: 'State Bank of India',
          upiId: 'powerbill.desk@okaxis',
          beneficiaryAccount: 'XX4892 (Axis Bank)',
          paymentMode: 'UPI',
        };
      }

      const evidenceItem: Evidence = {
        id: `ev_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        fileName: file.name,
        fileType: file.type || 'application/octet-stream',
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        uploadedAt: new Date().toISOString(),
        status: 'processed',
        extractedData: mockExtracted,
        previewUrl: isImage ? URL.createObjectURL(file) : undefined,
      };

      onStatusChange?.('processed');
      return evidenceItem;
    }, 200, 400);
  }
}

export const evidenceService = new EvidenceService();
