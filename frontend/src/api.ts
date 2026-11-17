export const API_BASE_URL = "http://192.168.1.100:8080";

export interface Business {
  id: number;
  name: string;
  location: string;
  category: string | null;
  hours: string | null;
  description: string | null;
  products: string | null;
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      signal: controller.signal,
    });

    const text = await response.text();
    let data: any = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      throw new Error("The server returned an unexpected response.");
    }

    if (!response.ok) {
      throw new Error(
        data?.message || `Request failed (${response.status}).`
      );
    }

    return data as T;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(
        "The request timed out. Refresh the list before retrying a submission."
      );
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}