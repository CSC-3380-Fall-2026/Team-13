const API_BASE_URL = "https://major-ways-taste.loca.lt";

export interface AuthUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

async function handleResponse(
  response: Response
): Promise<AuthUser> {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed.");
  }

  return response.json();
}

async function sendAuthRequest(
  endpoint: string,
  body: object
): Promise<AuthUser> {
  const response = await fetch(
    `${API_BASE_URL}/api/auth/${endpoint}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  return handleResponse(response);
}

export function loginUser(
  email: string,
  password: string
): Promise<AuthUser> {
  return sendAuthRequest("login", {
    email,
    password,
  });
}

export function signUpUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<AuthUser> {
  return sendAuthRequest("signup", {
    firstName,
    lastName,
    email,
    password,
  });
}

export async function updateProfile(
  userId: number,
  firstName: string,
  lastName: string,
  email: string
): Promise<AuthUser> {
  const response = await fetch(
    `${API_BASE_URL}/api/auth/profile/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
      }),
    }
  );

  return handleResponse(response);
}