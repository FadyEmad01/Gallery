export function getToken(): string | null {
    const matches = document.cookie.match(/auth_token=([^;]+)/);
    return matches ? decodeURIComponent(matches[1]) : null;
  }