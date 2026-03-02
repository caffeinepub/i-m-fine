export function formatTimestamp(timestamp: bigint | undefined | null): string {
  if (!timestamp) return 'Not set';
  
  try {
    // Convert nanoseconds to milliseconds
    const ms = Number(timestamp) / 1_000_000;
    const date = new Date(ms);
    
    // Validate date
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
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

export function isExpired(expirationTimestamp: bigint | undefined | null): boolean {
  if (!expirationTimestamp) return false;
  
  try {
    const now = BigInt(Date.now()) * BigInt(1_000_000); // Convert to nanoseconds
    return expirationTimestamp < now;
  } catch (error) {
    console.error('Error checking expiration:', error);
    return false;
  }
}
