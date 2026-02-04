# Specification

## Summary
**Goal:** Add a full-page, hopeful transformation-themed background image to the Community Testimonials page while keeping all content readable and interactions unchanged.

**Planned changes:**
- Add a new static background image asset under `frontend/public/assets/generated`.
- Update `frontend/src/pages/TestimonialsPage.tsx` to render the background image covering the full viewport and scroll height (cover, centered, no tiling).
- Add a suitable overlay treatment (e.g., translucent and optionally blurred) so the header, form, testimonial cards, and footer remain readable over the image without affecting scrolling or form submission.

**User-visible outcome:** The Community Testimonials page displays a gentle butterfly-to-sunrise full-page background behind all content, with text and UI remaining clear and fully interactive.
