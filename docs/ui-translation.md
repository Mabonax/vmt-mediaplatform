# Static React and application translation

`src/renderers/shared/GrammarArtwork.tsx` is renderer-neutral React markup using resolved grammar, assets and brand tokens. The Remotion adapter adds frame-driven slots and render-aware images. The static gallery uses native images, static slots and CSS-loaded copies of the same licensed fonts.

`npm.cmd run gallery` builds the standalone React app with the already-installed Rspack 1.7.11, then serves it on **127.0.0.1:3101**. `npm.cmd run gallery:build` builds without starting the server. The gallery exposes family, layout, ratio, design axes, fine variation, comparison mode and a long-copy/missing-portrait fixture. Its build asserts **zero Remotion modules** in the dependency graph and writes `dist/gallery/dependency-proof.json`.

The minimal-clinical family also maps to a real application layout: navigation, search, service selection, practitioner summary, example time selection, review, request state and an appointments view. It uses family typography, surface radius, spacing, shadow and tokens, while adapting composition hierarchy into usable controls. The UI is responsive down to a compact phone viewport; it is not a scaled poster.

The interaction demo is explicitly experimental. Search filters the fictional service/practitioner; service selection enables times; a time enables the request preview. The resulting state says **Awaiting practice confirmation**. Users can view, change or clear the example request. State lives in React memory and reload clears it. There are no network writes, real dates, personal details, patient records, authentication simulations or invented backend endpoints.

## Messaging evidence

Read-only inspection of the existing clinic repository informed the copy:

| Claim | Local authority inspected |
| --- | --- |
| Clinic service and eligible practitioner selection | `app/Domains/PatientBooking/Services/PracticeServiceResolver.php` |
| Canonical slot availability and request/confirmed distinction | `docs/booking-channel-contract.md` |
| New-patient request, clinic follow-up, existing patient record access | `docs/08-user-training/mobile-app-user-guide.md`, sections 2–5 |
| Appointment viewing and changes where available | Same patient user guide and `docs/03-mobile/mobile-api-contract.md` |

Paths above are relative to `C:\xampp\htdocs\gperp-clinic`. No clinic source was modified. Source/documentation inspection supports wording; it is not authenticated production acceptance.

The canonical demo now says “Choose a service. Find a practitioner. Request a time.” The existing promo and all new examples use it. Requests are not presented as instantly confirmed. Times remain illustrative and the practice/clinician fictional. The public/new-patient and authenticated/existing-patient distinction remains explicit in the application demo. Features such as AI diagnosis, instant approval, live waiting times and guaranteed availability are not claimed.

Future production integration must call existing backend services and contracts and enforce real eligibility, availability and confirmation there. This task deliberately adds no Laravel, Inertia or Flutter production integration.
