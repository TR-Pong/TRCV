'use client';

interface ApiRequestOptions extends RequestInit {
  fallbackError: string;
}

function redirectToLogin() {
  window.location.assign('/admin/login');
}

export async function adminApiRequest<T>(
  input: RequestInfo | URL,
  { fallbackError, ...init }: ApiRequestOptions
): Promise<T> {
  const response = await fetch(input, init);

  if (response.status === 401) {
    redirectToLogin();
    throw new Error('Unauthorized');
  }

  const data = await response.json().catch(() => null) as
    | ({ error?: string } & T)
    | null;

  if (!response.ok) {
    throw new Error(data?.error || fallbackError);
  }

  return data as T;
}
