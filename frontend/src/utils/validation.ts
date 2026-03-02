export function validateDateOfBirth(dob: string): { valid: boolean; error?: string } {
  if (!dob || dob.trim() === '') {
    return { valid: true }; // Optional field
  }

  // Check MM/DD/YYYY format
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  
  if (!dateRegex.test(dob)) {
    return {
      valid: false,
      error: 'Date of Birth must be in MM/DD/YYYY format (e.g., 01/15/1990)',
    };
  }

  // Validate the date is real
  const [month, day, year] = dob.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return {
      valid: false,
      error: 'Please enter a valid date',
    };
  }

  // Check if date is not in the future
  if (date > new Date()) {
    return {
      valid: false,
      error: 'Date of Birth cannot be in the future',
    };
  }

  return { valid: true };
}
