import { CourseSynopsis, CourseInput } from './courseBuilderTypes';

// Generate text content for each PDF document
export function generateSyllabusContent(synopsis: CourseSynopsis, input: CourseInput): string {
  return `
COURSE SYLLABUS
${synopsis.title}

COURSE OVERVIEW
${synopsis.overview}

DURATION: ${synopsis.duration}
TARGET AUDIENCE: ${synopsis.audience}

LEARNING OUTCOMES
${synopsis.learningOutcomes.join('\n')}

COURSE MODULES
${input.modules.map((module, idx) => `Module ${idx + 1}: ${module}`).join('\n')}

ASSESSMENT & COMPLETION
Participants will complete worksheets and reflective exercises throughout the course.
Successful completion requires engagement with all modules and submission of final reflection.

INSTRUCTOR NOTES
This course is designed to be supportive and trauma-informed.
Create a safe, judgment-free environment for all participants.
Allow flexibility in pacing based on participant needs.
`;
}

export function generateTimelineContent(synopsis: CourseSynopsis, input: CourseInput): string {
  const moduleCount = input.modules.length;
  const sessionsPerModule = Math.max(1, Math.floor(10 / moduleCount));
  
  let timeline = `
COURSE TIMELINE
${synopsis.title}

TOTAL DURATION: ${synopsis.duration}
NUMBER OF MODULES: ${moduleCount}

`;

  input.modules.forEach((module, idx) => {
    timeline += `
MODULE ${idx + 1}: ${module}
Sessions: ${sessionsPerModule}
Focus: Introduction, practice, and integration of ${module.toLowerCase()}

`;
  });

  timeline += `
FINAL SESSION: Integration & Reflection
Review key learnings and create personal action plan
`;

  return timeline;
}

export function generateTeacherScriptContent(synopsis: CourseSynopsis, input: CourseInput): string {
  let script = `
TEACHER SCRIPT & FACILITATION GUIDE
${synopsis.title}

INTRODUCTION SCRIPT
"Welcome to ${synopsis.title}. This course is designed for ${synopsis.audience}.
Over the next ${synopsis.duration}, we'll explore ${synopsis.purpose}.
This is a safe, supportive space. There's no pressure to share more than you're comfortable with."

`;

  input.modules.forEach((module, idx) => {
    script += `
MODULE ${idx + 1}: ${module}

OPENING (5 minutes)
"Today we're focusing on ${module}. This is an important topic because..."
[Pause for participant reflection]

MAIN CONTENT (20-30 minutes)
1. Introduce key concepts related to ${module}
2. Share examples and real-world applications
3. Guide participants through worksheet exercises
4. Allow time for questions and discussion

CLOSING (5 minutes)
"Let's take a moment to reflect on what we've learned today about ${module}."
"For next time, consider how you might apply this in your daily life."

`;
  });

  return script;
}

export function generateWorksheetContent(synopsis: CourseSynopsis, input: CourseInput): string {
  let worksheets = `
COURSE WORKSHEETS
${synopsis.title}

`;

  input.modules.forEach((module, idx) => {
    worksheets += `
WORKSHEET ${idx + 1}: ${module}

REFLECTION QUESTIONS
1. What does ${module} mean to you?
2. How does this topic relate to your current experiences?
3. What challenges do you face in this area?

PRACTICE EXERCISES
- Exercise 1: Identify three ways you can apply ${module} this week
- Exercise 2: Write about a time when ${module} was important
- Exercise 3: Create a personal action plan for ${module}

NOTES & INSIGHTS
[Space for participant notes]

`;
  });

  return worksheets;
}

export function generateStudentWorkbookContent(synopsis: CourseSynopsis, input: CourseInput): string {
  let workbook = `
STUDENT WORKBOOK
${synopsis.title}

WELCOME
Welcome to your personal workbook for ${synopsis.title}.
This workbook is your private space for reflection, learning, and growth.

COURSE GOALS
${synopsis.purpose}

YOUR LEARNING JOURNEY

`;

  input.modules.forEach((module, idx) => {
    workbook += `
MODULE ${idx + 1}: ${module}

JOURNALING PROMPTS
- What are your initial thoughts about ${module}?
- How does ${module} show up in your life?
- What would you like to learn or change about ${module}?

PERSONAL REFLECTIONS
[Space for writing]

KEY TAKEAWAYS
[Space for notes]

ACTION STEPS
What will you do differently after learning about ${module}?
1. _______________________________________
2. _______________________________________
3. _______________________________________

`;
  });

  workbook += `
FINAL REFLECTION
Looking back on this course, what are your biggest insights?
How have you grown?
What will you continue to practice?

[Space for final reflection]
`;

  return workbook;
}
