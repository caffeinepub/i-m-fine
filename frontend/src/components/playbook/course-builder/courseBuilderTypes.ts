// Types for course builder
export interface CourseInput {
  courseName: string;
  duration: string; // e.g., "1 hour", "2 weeks", "8 weeks"
  audience: string;
  goals: string;
  modules: string[];
}

export interface CourseSynopsis {
  title: string;
  purpose: string;
  duration: string;
  audience: string;
  learningOutcomes: string[];
  overview: string;
}

export interface CourseFileOutput {
  fileName: string;
  content: string;
}
