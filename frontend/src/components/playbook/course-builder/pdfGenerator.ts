import { CourseSynopsis, CourseInput, CourseFileOutput } from './courseBuilderTypes';
import {
  generateSyllabusContent,
  generateTimelineContent,
  generateTeacherScriptContent,
  generateWorksheetContent,
  generateStudentWorkbookContent,
} from './pdfTemplates';

// Generate all course PDF files as text content
// Note: For actual PDF generation, we'll convert text to PDF bytes client-side
export function generateCourseFiles(synopsis: CourseSynopsis, input: CourseInput): CourseFileOutput[] {
  return [
    {
      fileName: 'syllabus.txt',
      content: generateSyllabusContent(synopsis, input),
    },
    {
      fileName: 'timeline.txt',
      content: generateTimelineContent(synopsis, input),
    },
    {
      fileName: 'teacher-script.txt',
      content: generateTeacherScriptContent(synopsis, input),
    },
    {
      fileName: 'worksheets.txt',
      content: generateWorksheetContent(synopsis, input),
    },
    {
      fileName: 'student-workbook.txt',
      content: generateStudentWorkbookContent(synopsis, input),
    },
  ];
}

// Convert text content to bytes with proper ArrayBuffer type
export function textToPdfBytes(text: string): Uint8Array {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(text);
  // Create a new Uint8Array from the encoded data to ensure proper ArrayBuffer type
  const result = new Uint8Array(encoded.length);
  result.set(encoded);
  return result;
}
