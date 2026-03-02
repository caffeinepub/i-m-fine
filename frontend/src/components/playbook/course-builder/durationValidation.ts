// Duration validation helpers
export interface DurationValidation {
  isValid: boolean;
  error?: string;
  hours?: number;
}

export function validateCourseDuration(duration: string): DurationValidation {
  const lowerDuration = duration.toLowerCase().trim();
  
  // Parse duration
  const hourMatch = lowerDuration.match(/(\d+)\s*hour/);
  const dayMatch = lowerDuration.match(/(\d+)\s*day/);
  const weekMatch = lowerDuration.match(/(\d+)\s*week/);
  
  let totalHours = 0;
  
  if (hourMatch) {
    totalHours = parseInt(hourMatch[1]);
  } else if (dayMatch) {
    totalHours = parseInt(dayMatch[1]) * 24;
  } else if (weekMatch) {
    totalHours = parseInt(weekMatch[1]) * 7 * 24;
  } else {
    return {
      isValid: false,
      error: 'Invalid duration format. Please use format like "1 hour", "3 days", or "2 weeks".',
    };
  }
  
  // Validate range: 1 hour to 8 weeks (1344 hours)
  const minHours = 1;
  const maxHours = 8 * 7 * 24; // 8 weeks
  
  if (totalHours < minHours) {
    return {
      isValid: false,
      error: 'Course duration must be at least 1 hour.',
    };
  }
  
  if (totalHours > maxHours) {
    return {
      isValid: false,
      error: 'Course duration cannot exceed 8 weeks.',
    };
  }
  
  return {
    isValid: true,
    hours: totalHours,
  };
}
