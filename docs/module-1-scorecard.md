# Module 1 (Caretaker Task & Checklist App) — build scorecard

Scored against the brief. Three lenses per line:
- UI = built in the demo, clickable.
- DB = modeled in the validated schema.
- E2E = works end to end for real (needs the backend wired and running, which is not done yet).
Score is overall delivery toward production (E2E weighted heaviest). Honest, not generous.

## 1.1 Caretaker-facing app
| Requirement | UI | DB | E2E | Score |
|---|---|---|---|---|
| Mobile-first PWA, no app store | Yes | n/a | Yes | 100 |
| Offline-first: checklist + photo, sync when back | Partial (progress persists locally) | Yes (sync rules) | No (PowerSync not wired; photos placeholder) | 35 |
| Multilingual Telugu and Hindi on all screens | Yes | Yes | Yes | 100 |
| Icon-led, image-led, minimal reading | Partial (big buttons, some icons; still text-led) | n/a | Partial | 55 |
| Login via phone number, no email | No (demo uses a role switcher) | Yes (phone field, roles) | No | 15 |
| **1.1 subtotal** | | | | **61** |

## 1.2 Checklist types
| Requirement | UI | DB | E2E | Score |
|---|---|---|---|---|
| Pre-stay | Yes (full, trilingual) | Yes | Demo only | 70 |
| Post-stay | No | Yes (enum) | No | 20 |
| Daily | No | Yes | No | 20 |
| Weekly | No | Yes | No | 20 |
| Monthly | No | Yes | No | 20 |
| Ad-hoc | No | Yes | No | 20 |
| **1.2 subtotal** (engine supports all; only pre-stay surfaced) | | | | **35** |

## 1.3 Photo capture
| Requirement | UI | DB | E2E | Score |
|---|---|---|---|---|
| Room-by-room photo against checklist items | Partial (Take photo button, no real capture) | Yes | No | 30 |
| Offline capture with auto upload queue | No | Yes | No | 15 |
| Automatic compression for 2G/3G/weak 4G | No | n/a | No | 10 |
| GPS and timestamp on uploads | No | Yes (lat/lng/taken_at) | No | 20 |
| Reference image system (ideal-state per area) | Partial (placeholder block) | Yes (reference_images) | No | 40 |
| **1.3 subtotal** | | | | **23** |

## 1.4 Housekeeping & laundry log
| Requirement | UI | DB | E2E | Score |
|---|---|---|---|---|
| Caretaker updates laundry status after checkout | Yes (count screen with steppers) | Yes | Demo only | 60 |
| Laundry count logged as part of post-stay checklist | No (standalone, not tied to post-stay run) | Yes | No | 35 |
| Status visible to PM immediately | Partial (concept shown, not real-time) | Yes | No | 35 |
| **1.4 subtotal** | | | | **45** |

## 1.5 Issue flagging
| Requirement | UI | DB | E2E | Score |
|---|---|---|---|---|
| Flag from within checklist (damage/missing/etc.) | Yes (category, severity, note, photo) | Yes | Demo only | 65 |
| Flagged issues visible to PM immediately | Partial (static open-issues list) | Yes | No | 40 |
| Status flow Open to In progress to Resolved | No (no status management UI) | Yes (enum) | No | 35 |
| **1.5 subtotal** | | | | **47** |

## Overall Module 1
| Lens | Score |
|---|---|
| Design and UI in the demo | ~70% |
| Data model coverage | ~95% |
| Working end to end | ~25% |
| **Overall (E2E-weighted)** | **about 45%** |

## What moves each gap to done
- Wire Supabase + PowerSync (turns "demo only" into real offline-first across the board).
- Real camera: capture, compress, GPS and timestamp, offline upload queue.
- Phone-number login with PIN or OTP.
- Surface the other five checklist types with content.
- Build the issue status board (Open / In progress / Resolved) and real-time PM visibility.
- Populate the reference image library and tie laundry to the post-stay run.
- Make the UI more icon and image led to cut reading.
