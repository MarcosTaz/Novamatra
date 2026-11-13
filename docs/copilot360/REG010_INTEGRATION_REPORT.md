# COPILOT 360 — REG-2026-11-13-010: reproducible integration specification

**Status:** SOFT­WARE_ONLY / NO REAL ASSISTIVE AUTHORIZATION / P1 BLOCKED.

## Completed in independent sandbox

- Frozen standard-library Python 3.10+ contracts `HeaderEnvelope`, `PerceptionSnapshot`, `NavigationProposal`, `SupervisorDirective`, immutable dataclasses with enums, logical timestamps, confidence and provenance.
- Conservative bus rejects stale/non-monotonic data, unverified clocks, unknown free-space, missing body pose, imminent threats and generative publisher escalation.
- A deterministic replay with seed `6703` exercised 9 cases: **9/9 veto**, **0 real-world authorizations**.
- 26 new local `unittest` tests: **26 PASS**, covering contracts, faults, nonmonotonic streams, missing clearance and watchdog events.
- Minimal legacy shape adapters identified: real `SOFTWARE V06 copilot360/pathplanner.py` `PathResult`; real `TRACEABLE V09 copilot360/integrated.py` replay records, `sensor_hub.py` `SensorPacket`/`ClockMap`.
- No modifications to original ZIPs and no import or execution of legacy engines in the new proof-of-contract. No physical sensor/IMU or audio output; timing is synthetic.

## Reproducibility and custody

The **complete runnable sandbox and hash manifest** are in the private owner-delivered `COPILOT360_REG010_INTEGRACAO_CONTRATOS_BIBLIA_V2_0.zip`; it is **not published here** because it includes internal technical traceability and the owner has not approved public source release. This public repository contains the audit synopsis rather than the runnable harness. GitHub CI here tests RTM integrity only, not the REG-010 harness.

## Phase gates

| Phase | Status | Decision |
|---|---|---|
| A: dependency-free reproducible contract sandbox | PASS (isolated) | review |
| B: legacy adapters with actual sensor model conversion | PARTIAL | not approved |
| C: fault replay with all 8 REQ-SF validated | PARTIAL | not approved |
| D: P0 bench / hardware purchasing | BLOCKED | do not purchase |

Thresholds 80/100ms and 0.65 confidence are **unvalidated engineering proposals**, not measured field guarantees. Logical event strings do not guarantee audible alert. Generative isolation is a Python API restriction, not OS/IPC security isolation. Synthetic timestamps never authorize live guidance.

## Required next experiments

1. Read-only validated adaptation of **real replay outputs**, including clock provenance and calibration chain.
2. Rigorously defined HEAD↔BODY transform (SE(3)), covariance and uncertainty.
3. Sensor-origin authentication, frame identity, bounded buffers and real end-to-end timing on a dedicated bench.
4. Confirm physical audio and unplugged power/watchdog behavior before P1.
