/**
 * Simulated Async API Network Layer with configurable artificial latency
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function simulatedApiCall<T>(
  action: () => T | Promise<T>,
  minDelayMs = 300,
  maxDelayMs = 600
): Promise<ApiResponse<T>> {
  const waitTime = Math.floor(Math.random() * (maxDelayMs - minDelayMs + 1)) + minDelayMs;
  await delay(waitTime);

  try {
    const result = await action();
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'An unexpected error occurred. Please try again.',
      timestamp: new Date().toISOString(),
    };
  }
}
