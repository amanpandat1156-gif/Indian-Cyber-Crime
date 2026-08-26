/**
 * NCRP / I4C Live AI NLP Incident Form Extractor Service
 * Powered by Google Gemini REST API (gemini-2.5-flash / gemini-1.5-flash)
 */

export interface ExtractedIncidentDetails {
  summaryTitle?: string;
  accountType?: string;
  suspectIdentifier?: string;
  amountLost?: string;
  bankOrPlatform?: string;
  incidentSummary?: string;
  scammerDemands?: string;
}

export interface ExtractionResponse {
  success: boolean;
  data?: ExtractedIncidentDetails;
  error?: string;
  provider?: 'gemini-2.5-flash' | 'gemini-1.5-flash' | 'local-nlp-fallback';
}

class GeminiService {
  private apiKey: string;

  constructor() {
    const env = (import.meta as any).env || {};
    this.apiKey = (env.VITE_GEMINI_API_KEY as string) || '';
  }

  public getApiKey(): string {
    return this.apiKey.trim();
  }

  public hasApiKey(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  /**
   * Extracts structured cybercrime incident fields from freeform text / voice transcript
   */
  async extractIncidentDetails(
    rawText: string,
    categoryContext?: string
  ): Promise<ExtractionResponse> {
    const text = rawText.trim();
    if (!text) {
      return {
        success: false,
        error: 'Please enter or dictate an incident description first.',
      };
    }

    const key = this.getApiKey();

    if (key) {
      // 1. Try Gemini 2.5 Flash
      try {
        const result25 = await this.callGeminiApi(text, 'gemini-2.5-flash', key, categoryContext);
        if (result25) {
          return {
            success: true,
            data: result25,
            provider: 'gemini-2.5-flash',
          };
        }
      } catch (err) {
        console.warn('Gemini 2.5 Flash call failed, trying gemini-1.5-flash:', err);
      }

      // 2. Fallback to Gemini 1.5 Flash
      try {
        const result15 = await this.callGeminiApi(text, 'gemini-1.5-flash', key, categoryContext);
        if (result15) {
          return {
            success: true,
            data: result15,
            provider: 'gemini-1.5-flash',
          };
        }
      } catch (err) {
        console.warn('Gemini 1.5 Flash call failed, falling back to local NLP heuristic:', err);
      }
    }

    // 3. High-Accuracy Local NLP Tokenizer Fallback
    try {
      const fallbackData = this.localNlpFallback(text, categoryContext);
      return {
        success: true,
        data: fallbackData,
        provider: 'local-nlp-fallback',
      };
    } catch {
      return {
        success: false,
        error: 'Could not auto-extract fields. Please fill manually.',
      };
    }
  }

  /**
   * Internal Gemini REST API caller with structured JSON Schema output
   */
  private async callGeminiApi(
    rawText: string,
    modelName: string,
    key: string,
    categoryContext?: string
  ): Promise<ExtractedIncidentDetails | null> {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${key}`;

    const promptText = `Extract structured incident parameters from the citizen's cybercrime report statement.
Category Context: ${categoryContext || 'General Cybercrime Incident'}

Citizen Incident Narrative:
"${rawText}"

Extract and format into the specified JSON schema. If any field is not explicitly or implicitly mentioned in the narrative, set it to an empty string "".`;

    const requestBody = {
      contents: [
        {
          role: 'user',
          parts: [{ text: promptText }],
        },
      ],
      systemInstruction: {
        parts: [
          {
            text: 'You are an expert Cybercrime Incident Intake AI for the National Cyber Crime Reporting Portal of India (NCRP / I4C). Analyze citizen incident descriptions in English, Hindi, or Hinglish, and extract key structured fields accurately into the specified JSON format.',
          },
        ],
      },
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.1,
        responseSchema: {
          type: 'OBJECT',
          properties: {
            summaryTitle: {
              type: 'STRING',
              description: 'Short descriptive incident title (max 10-12 words)',
            },
            accountType: {
              type: 'STRING',
              description: 'e.g. WhatsApp, Instagram, Telegram, Facebook, Bank Account, UPI',
            },
            suspectIdentifier: {
              type: 'STRING',
              description: 'Suspect phone number, UPI ID, handle, or malicious URL mentioned',
            },
            amountLost: {
              type: 'STRING',
              description: 'Numeric monetary loss value without currency symbols (e.g. 48500 or 5000)',
            },
            bankOrPlatform: {
              type: 'STRING',
              description: 'Bank name or social media platform involved',
            },
            incidentSummary: {
              type: 'STRING',
              description: 'Polished, formal 2-3 line incident narrative suitable for official police intake',
            },
            scammerDemands: {
              type: 'STRING',
              description: 'What the scammer or attacker is currently doing or demanding',
            },
          },
          required: ['summaryTitle', 'incidentSummary'],
        },
      },
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        console.warn(`Gemini API HTTP ${response.status} (${modelName}):`, errorText);
        return null;
      }

      const json = await response.json();
      const rawTextOutput = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawTextOutput) return null;

      const parsed = JSON.parse(rawTextOutput) as ExtractedIncidentDetails;
      return {
        summaryTitle: parsed.summaryTitle || '',
        accountType: parsed.accountType || '',
        suspectIdentifier: parsed.suspectIdentifier || '',
        amountLost: parsed.amountLost ? String(parsed.amountLost).replace(/[^\d.]/g, '') : '',
        bankOrPlatform: parsed.bankOrPlatform || '',
        incidentSummary: parsed.incidentSummary || rawText,
        scammerDemands: parsed.scammerDemands || '',
      };
    } catch (error) {
      clearTimeout(timeoutId);
      console.warn(`Gemini API fetch error (${modelName}):`, error);
      return null;
    }
  }

  /**
   * Local High-Accuracy Rule-Based NLP Fallback
   */
  private localNlpFallback(text: string, categoryContext?: string): ExtractedIncidentDetails {
    const lower = text.toLowerCase();

    // 1. Amount Extraction
    let amountLost = '';
    const amountMatch = text.match(
      /(?:(?:rs\.?|inr|₹)\s*([\d,]+(?:\.\d+)?))|(?:\b([\d,]+(?:\.\d+)?)\s*(?:rupees|rs|inr|rupaye|hazar|thousand|lakh|lacs)\b)/i
    );
    if (amountMatch) {
      const numStr = (amountMatch[1] || amountMatch[2]).replace(/,/g, '');
      let parsed = parseFloat(numStr);
      if (lower.includes('lakh') || lower.includes('lac')) parsed *= 100000;
      if (lower.includes('hazar') || lower.includes('thousand')) parsed *= 1000;
      if (!isNaN(parsed) && parsed > 0) {
        amountLost = String(parsed);
      }
    } else if (text.match(/\b\d{4,7}\b/)) {
      const match = text.match(/\b\d{4,7}\b/);
      if (match) amountLost = match[0];
    }

    // 2. Suspect Identifier
    let suspectIdentifier = '';
    const upiMatch = text.match(
      /[a-zA-Z0-9.\-_]+@(okaxis|okhdfcbank|oksbi|paytm|ybl|apl|ibl|axisbank|sbi|kotak|[a-zA-Z]+)/i
    );
    const phoneMatch = text.match(/(?:\+91[\-\s]?)?([6-9]\d{9})/);
    const handleMatch = text.match(/@([a-zA-Z0-9_.]+)/);
    const urlMatch = text.match(
      /(https?:\/\/[^\s]+)|([a-zA-Z0-9\-]+\.(?:in|com|org|net|xyz|top|site|app)[^\s]*)/i
    );

    if (upiMatch) {
      suspectIdentifier = upiMatch[0];
    } else if (phoneMatch) {
      suspectIdentifier = `+91-${phoneMatch[1]}`;
    } else if (handleMatch) {
      suspectIdentifier = handleMatch[0];
    } else if (urlMatch) {
      suspectIdentifier = urlMatch[0];
    }

    // 3. Platform / Bank
    let bankOrPlatform = '';
    let accountType = '';

    if (lower.includes('instagram') && lower.includes('whatsapp')) {
      accountType = 'Instagram & WhatsApp';
      bankOrPlatform = 'Meta (Instagram & WhatsApp)';
    } else if (lower.includes('whatsapp')) {
      accountType = 'WhatsApp';
      bankOrPlatform = 'WhatsApp';
    } else if (lower.includes('instagram')) {
      accountType = 'Instagram';
      bankOrPlatform = 'Instagram';
    } else if (lower.includes('telegram')) {
      accountType = 'Telegram';
      bankOrPlatform = 'Telegram';
    } else if (lower.includes('facebook')) {
      accountType = 'Facebook';
      bankOrPlatform = 'Facebook';
    }

    if (lower.includes('sbi') || lower.includes('state bank')) {
      bankOrPlatform = 'State Bank of India';
      accountType = accountType || 'Bank Account';
    } else if (lower.includes('hdfc')) {
      bankOrPlatform = 'HDFC Bank';
      accountType = accountType || 'Bank Account';
    } else if (lower.includes('icici')) {
      bankOrPlatform = 'ICICI Bank';
      accountType = accountType || 'Bank Account';
    } else if (lower.includes('axis')) {
      bankOrPlatform = 'Axis Bank';
      accountType = accountType || 'Bank Account';
    }

    // 4. Scammer Demands
    let scammerDemands = '';
    if (lower.includes('demand') || lower.includes('contacts') || lower.includes('asking for money') || lower.includes('upi transfer')) {
      scammerDemands = 'Attacker is messaging contacts requesting emergency monetary transfers.';
    }

    // 5. Summary Title
    let summaryTitle = '';
    if (categoryContext?.includes('Hacked') || lower.includes('hacked') || lower.includes('takeover') || lower.includes('otp')) {
      summaryTitle = accountType
        ? `${accountType} account takeover via malicious OTP phishing`
        : 'Account takeover and unauthorized security compromise';
    } else if (categoryContext?.includes('Financial') || amountLost) {
      summaryTitle = amountLost
        ? `Unauthorized financial transaction of ₹${Number(amountLost).toLocaleString('en-IN')}`
        : 'Unauthorized fraudulent financial debit incident';
    } else if (categoryContext?.includes('Harassment') || lower.includes('harass') || lower.includes('threat')) {
      summaryTitle = 'Cyber harassment, impersonation and extortion threats';
    } else {
      summaryTitle = 'Reported Cybercrime Incident Intake';
    }

    return {
      summaryTitle,
      accountType: accountType || 'Social Media / Online Account',
      suspectIdentifier,
      amountLost,
      bankOrPlatform: bankOrPlatform || accountType,
      incidentSummary: text,
      scammerDemands,
    };
  }
}

export const geminiService = new GeminiService();
export default geminiService;
