export interface ChatResponse {
  reply: string;
  provider?: string;
  status: 'success' | 'fallback' | 'error';
}

export const DEFAULT_FALLBACK_MESSAGE =
  'I am having trouble connecting to the support server. For urgent financial fraud, please dial 1930 immediately.';

export const N8N_WEBHOOK_URL =
  import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL ||
  'https://achal2.app.n8n.cloud/webhook/cyber-assistant';

/**
 * Sends a chat message to the n8n webhook backend.
 * Uses hardcoded production fallback URL and flexible JSON/text response parsing.
 */
export async function sendChatMessage(
  message: string,
  sessionId = 'citizen-session',
  language?: string
): Promise<ChatResponse> {
  const endpoint = (N8N_WEBHOOK_URL || '').trim();

  if (!endpoint) {
    return {
      reply: DEFAULT_FALLBACK_MESSAGE,
      status: 'fallback',
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatInput: message,
        message: message,
        sessionId: sessionId || 'citizen-session',
        language: language || 'en',
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Webhook responded with HTTP status ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    let replyText = '';
    let provider: string | undefined = undefined;

    if (contentType.includes('application/json')) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const first = data[0];
        replyText =
          first.output ||
          first.response ||
          first.text ||
          first.message ||
          first.reply ||
          (typeof first === 'string' ? first : JSON.stringify(first));
        provider = first.provider;
      } else if (typeof data === 'object' && data !== null) {
        replyText =
          data.output ||
          data.response ||
          data.text ||
          data.message ||
          data.reply ||
          JSON.stringify(data);
        provider = data.provider;
      } else if (typeof data === 'string') {
        replyText = data;
      }
    } else {
      replyText = await response.text();
    }

    const cleanedReply = replyText?.trim();

    return {
      reply: cleanedReply || DEFAULT_FALLBACK_MESSAGE,
      provider,
      status: 'success',
    };
  } catch (error) {
    console.warn('[Rakshika AI] Webhook request error:', error);
    return {
      reply: DEFAULT_FALLBACK_MESSAGE,
      status: 'error',
    };
  }
}

export default {
  sendChatMessage,
  DEFAULT_FALLBACK_MESSAGE,
  N8N_WEBHOOK_URL,
};
