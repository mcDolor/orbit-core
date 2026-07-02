export const OFFICER_ROLES = [
  "President",
  "Vice-President",
  "Secretary-General",
  "Secretary",
  "Treasurer",
  "Auditor",
  "Public Information Officer",
  "Board of Director",
  "Faculty Representative",
  "Year Level Representative",
  "Association of Student Organizations Representative",
  "UISB Representative",
] as const;

export type OfficerRole = (typeof OFFICER_ROLES)[number];