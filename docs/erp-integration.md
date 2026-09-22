# Future ERP integration — documentation only

```text
Dr. Health Laravel -> Authorized JSON snapshot -> Composition Data v1
        -> Validated preset and asset IDs -> Remotion worker -> Reviewed media
```

This implementation makes no API calls and adds no endpoints, credentials, queue connections, Laravel changes or Flutter changes.

A future Laravel application service should obtain an authorized marketing view through the existing domain service/repository boundaries, map it into a versioned DTO and serialize the composition contract. Controllers remain thin. Clinical policy, consent, booking eligibility and availability authority remain in the ERP.

| Demo field                          | Future authoritative mapping                                 |
| ----------------------------------- | ------------------------------------------------------------ |
| `schemaVersion`                     | Explicit supported DTO version                               |
| `practice.name`                     | Approved public practice profile                             |
| `doctor.name`, `speciality`         | Approved public practitioner profile                         |
| `doctor.imageAssetId`               | Reviewed asset identity, without private storage credentials |
| `service`                           | Approved public service/marketing description                |
| `availability`, `availabilityLabel` | Authorized dated/time-zone-aware snapshot                    |
| `cta`, `copy`                       | Reviewed campaign copy and verified destination label        |
| `design`                            | Creative-system preset, separate from clinical data          |

Version 1 only holds display times, not scheduling identifiers or dates. Before advertising real availability, define a contract revision for clinic timezone, appointment date, source freshness and expiry. Never present demo times as live availability. A concept confirmation cannot serve as evidence of a real booking; that requires a separate authorized contract/template.

For the single-clinic on-premise system, a later queue job can create an immutable render request with snapshot, preset version, asset versions and idempotency key. A dedicated worker validates data, resolves approved local assets, bounds concurrency/retries, renders and returns media metadata. Integrate job state with existing telemetry. Do not expose tokens in browser props or logs.

POPIA-conscious scope: marketing videos need approved public information. Patient identifiers, clinical notes, histories and actual confirmations are unnecessary. Keep consent evidence out of public exports; define retention, access, publication approval and audit controls before connecting the ERP. This document proposes boundaries, not deployed controls.

Next integration work must inspect the actual ERP contract and governing architecture. Do not invent an endpoint from this document.
