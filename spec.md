# Specification

## Summary
**Goal:** Add a goal-oriented progress system with therapy milestones, wellness streaks, trophy badges, and session discount rewards to the Serenity Mental Health app.

**Planned changes:**
- Extend the backend to store and manage user goals (milestone and streak types) with fields for title, description, goal type, target value, current progress, completion status, and completion timestamp
- Extend the backend to store and manage trophies/badges per user, each linked to a goal, with optional session discount codes/percentages automatically awarded on goal completion
- Add a Goals & Progress page to main navigation with two sections: "Therapy Milestones" and "Wellness Streaks", each showing goal cards with progress bars, locked/unlocked states, and completion badges
- Add a Trophies tab/section within the Goals & Progress area displaying earned (full-color) and locked (greyscale) badge cards; earned trophies with discounts show the discount percentage and a copyable code
- Integrate goal progress tracking with existing user actions: mood log → mood streak goal, journal entry → journaling streak goal, Serenity session completion → therapy milestone goal, group class attendance → group session milestone goal, wellness tool usage → corresponding tool goal; automatically award trophy when target is met
- Show a dismissible toast/notification when a trophy is earned, displaying the badge image, trophy title, congratulatory message, and discount amount if applicable

**User-visible outcome:** Users can track their therapy milestones and wellness streaks on a dedicated Goals & Progress page, earn visual trophy badges upon completing goals, view copyable session discount codes on earned trophies, and receive an in-app notification whenever a new trophy is unlocked.
