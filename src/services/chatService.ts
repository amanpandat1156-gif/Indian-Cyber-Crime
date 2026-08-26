export interface ChatResponse {
  reply: string;
  provider?: string;
  status: 'success' | 'fallback' | 'error';
}

export const DEFAULT_FALLBACK_MESSAGE =
  'I am having trouble connecting to the support server. For urgent financial fraud, please dial 1930 immediately.';

/**
 * Sends a chat message to the n8n webhook backend.
 * Falls back gracefully to standard support instructions if the webhook is unset or errors.
 */
export async function sendChatMessage(
  message: string,
  sessionId: string,
  language?: string
): Promise<ChatResponse> {
  const webhookUrl = import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL;

  if (!webhookUrl || !webhookUrl.trim()) {
    return {
      reply: DEFAULT_FALLBACK_MESSAGE,
      status: 'fallback',
    };
  }

  try {
    const response = await fetch(webhookUrl.trim(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        sessionId,
        language: language || 'en',
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.warn(`[CyberDost AI] n8n Webhook returned HTTP ${response.status}`);
      return {
        reply: DEFAULT_FALLBACK_MESSAGE,
        status: 'error',
      };
    }

    const contentType = response.headers.get('content-type') || '';
    let replyText = '';
    let provider: string | undefined = undefined;

    if (contentType.includes('application/json')) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const first = data[0];
        replyText =
          first.reply || first.output || first.text || first.message || (typeof first === 'string' ? first : '');
        provider = first.provider;
      } else if (typeof data === 'object' && data !== null) {
        replyText = data.reply || data.output || data.text || data.message || '';
        provider = data.provider;
      } else if (typeof data === 'string') {
        replyText = data;
      }
    } else {
      replyText = await response.text();
    }

    return {
      reply: replyText.trim() || DEFAULT_FALLBACK_MESSAGE,
      provider,
      status: 'success',
    };
  } catch (error) {
    console.error('[CyberDost AI] Webhook request error:', error);
    return {
      reply: DEFAULT_FALLBACK_MESSAGE,
      status: 'error',
    };
  }
}
