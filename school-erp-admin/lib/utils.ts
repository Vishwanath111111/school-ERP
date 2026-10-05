/**
 * Merges CSS class names cleanly
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formats YYYY-MM-DD date strings into human readable format
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates 10-digit phone numbers
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[0-9]{7,15}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}
