import { Time } from '../backend';

export function formatTimestamp(timestamp: Time | undefined | null): string {
  if (!timestamp) return 'Not set';
  
  try {
    // Convert nanoseconds to milliseconds
    const ms = Number(timestamp) / 1_000_000;
    const date = new Date(ms);
    
    // Format as MM/DD/YYYY
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${month}/${day}/${year}`;
  } catch (error) {
    console.error('Error formatting timestamp:', error);
    return 'Invalid date';
  }
}

export function isExpired(expirationTimestamp: Time | undefined | null): boolean {
  if (!expirationTimestamp) return false;
  
  try {
    const now = Date.now() * 1_000_000; // Convert to nanoseconds
    return Number(expirationTimestamp) < now;
  } catch (error) {
    console.error('Error checking expiration:', error);
    return false;
  }
}
