# Specification

## Summary
**Goal:** Expand My Account to capture and persist richer profile details, support explicit plan options with expiration/grace handling, add newsletter opt-in, and update disclosure text accordingly.

**Planned changes:**
- Update backend user account model and APIs to store/retrieve/update: full name, DOB (MM/DD/YYYY text), city, state, email, optional phone, newsletter opt-in, selected plan option (term/pricing variant), plan start timestamp (when payment is recorded received), and plan expiration timestamp; include migration for existing users.
- Add My Account UI editable “Account Information” form for those fields, including DOB format validation and Save behavior that persists and rehydrates on refresh.
- Add plan dropdown options exactly as specified (Free, Basic monthly/6-month/year, Premier monthly/6-month/year) and persist selection per user.
- Implement plan lifecycle behavior: compute/store expiration after payment recorded for paid plans; show expiration date; on expiration downgrade effective access to Free; after expiration + 7 days delete the account and associated user-owned data.
- Add My Account newsletter question control (“Would you like to join our Weekly Newsletter?” Yes/No) and persist the selection.
- Update authenticated navigation to show Dashboard, My Account, and Tools as top-level destinations.
- Update Legal & Policies/disclosure content to include non-auto-renew language for 6-month/year plans and the expiration/downgrade/grace-period/auto-deletion policy.

**User-visible outcome:** Users can edit and save expanded account details, choose from the full set of plan options, see plan expiration information after payment is recorded, opt in/out of the weekly newsletter, navigate via Dashboard/My Account/Tools, and read updated disclosure rules; expired accounts automatically downgrade to Free and are deleted after a 1-week grace period.
