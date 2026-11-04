/**
 * @file cookieHelpers.ts
 * Utilitários puros para leitura, escrita e serialização de cookies HTTP/Client
 */

/**
 * Define um cookie no navegador com tempo de expiração e parâmetros seguros
 */
export function setCookie(name: string, value: string, daysValid: number = 365, path: string = '/'): void {
  if (typeof document === 'undefined') return;
  
  const date = new Date();
  date.setTime(date.getTime() + daysValid * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  // encodeURIComponent para caracteres especiais/JSON
  const encodedValue = encodeURIComponent(value);
  document.cookie = `${name}=${encodedValue};${expires};path=${path};SameSite=Lax`;
}

/**
 * Lê o valor de um cookie pelo nome
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const cookieString = document.cookie;
  if (!cookieString) return null;

  const nameEQ = `${name}=`;
  const cookies = cookieString.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      try {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      } catch {
        return c.substring(nameEQ.length, c.length);
      }
    }
  }

  return null;
}

/**
 * Deleta um cookie pelo nome
 */
export function deleteCookie(name: string, path: string = '/'): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path};SameSite=Lax`;
}

/**
 * Serializa de forma segura um objeto para armazenamento em cookie
 */
export function serializeForCookie<T>(data: T): string {
  try {
    return JSON.stringify(data);
  } catch (err) {
    console.error('Erro ao serializar cookie:', err);
    return '';
  }
}

/**
 * Deserializa de forma segura o valor de um cookie
 */
export function deserializeFromCookie<T>(cookieValue: string | null, defaultValue: T): T {
  if (!cookieValue) return defaultValue;
  try {
    const parsed = JSON.parse(cookieValue);
    return { ...defaultValue, ...parsed };
  } catch (err) {
    console.warn('Erro ao deserializar cookie, usando padrão:', err);
    return defaultValue;
  }
}
