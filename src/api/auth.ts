export type AuthUser = {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  balance: number;
};

export type Credentials = {
  email: string;
  password: string;
};

export type RegisterInput = Credentials & {
  username: string;
};

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    credentials: "same-origin",
    ...init,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);

    const message =
      body && typeof body.error === "string"
        ? body.error
        : `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return (await response.json()) as T;
}


export async function fetchCurrentUser(
  signal?: AbortSignal
): Promise<AuthUser | null> {
  const response = await fetch("/api/auth/me", {
    credentials: "same-origin",
    signal,
  });

  if (response.status === 401) return null;

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as AuthUser;
}

export async function login(credentials: Credentials): Promise<AuthUser> {
  return request<AuthUser>("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
}

export async function register(input: RegisterInput): Promise<AuthUser> {
  return request<AuthUser>("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export async function logout(): Promise<void> {
  await request<{ success: boolean }>("/api/auth/logout", {
    method: "POST",
  });
}

export type ProfileUpdate = {
  username?: string;
  email?: string;
  avatar?: string | null;
};

export async function updateProfile(input: ProfileUpdate): Promise<AuthUser> {
  return request<AuthUser>("/api/users/me", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}
