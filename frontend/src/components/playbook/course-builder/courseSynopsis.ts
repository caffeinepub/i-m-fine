import { CourseInput, CourseSynopsis } from './courseBuilderTypes';

// Generate deterministic synopsis from course inputs
export function generateCourseSynopsis(input: CourseInput): CourseSynopsis {
  const learningOutcomes = input.modules.map((module, idx) => 
    `${idx + 1}. Understand and apply ${module.toLowerCase()}`
  );
  
  const overview = `This ${input.duration} course is designed for ${input.audience}. ` +
    `The course focuses on ${input.goals}. ` +
    `Through ${input.modules.length} structured modules, participants will gain practical knowledge and skills. ` +
    `Each module includes guided instruction, worksheets, and reflective exercises to support learning and application.`;
  
  return {
    title: input.courseName,
    purpose: input.goals,
    duration: input.duration,
    audience: input.audience,
    learningOutcomes,
    overview,
  };
}
