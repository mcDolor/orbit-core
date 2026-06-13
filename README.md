# Orbit
A system that aims to centralize organization profiles, membership management, event scheduling, and documentation in a secure and user-friendly platform.

| Internal Release Code | Date Released |
| :--- | :--- |
| OB.010.000 | 2026-02-28 |
| OB.010.001 | 2026-04-18 |
| OB.010.002 | 2026-06-14 |

## OB.010.000 Release Notes
* chore: Initialize Next.js and Supabase template
* docs: Set up repository README with tracking table and documentation links

## OB.010.001 Release Notes
* feat: implement login page with Supabase auth and role-based redirection
* chore: configure turbopack root in next.config
* chore: updated dependencies to latest versions
* chore: removed unnecessary components from setup template
* feat: redesign login page and migrate authentication to API routes
* feat: refine login page layout and update image assets
* chore(deps): bump next from 16.2.1 to 16.2.3

## OB.010.002 Release Notes
* feat(auth): implement multi-step sign-up flow and fix auth routing
* feat(auth): add sign-up success screen with application submitted state
* feat(auth): make BrandPanel headline/subtext configurable per auth page
* feat(auth): rebuild update-password page with AuthLayout
* fix(auth): missing "use client" directive on login page
* fix(auth): auth redirects from /auth/* to correct route group paths
* fix(auth): whitelist public auth routes in supabase proxy middleware
* fix(auth): center step labels in sign-up form steps

**Important Links:**
* Design Specs: https://github.com/mcDolor/orbit-docportal.git