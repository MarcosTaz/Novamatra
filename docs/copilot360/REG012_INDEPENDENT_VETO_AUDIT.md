# COPILOT 360 — REG-2026-11-13-012

NOVAMATRA | 2026-11-13 | SOFTWARE ONLY | P1 BLOCKED

## Evidence and scope

- Original REG-010 sandbox regression: **26/26 Python tests PASS**.
- REG-012 independent sandbox: **15/15 Python tests PASS**, including read-only real V06/V09 module calls.
- 15 independent causal fixtures: **14 explicit vetoes**, **1 baseline P3 advisory**, zero real-world authorizations.
- VERIFIED_HARDWARE was **MOCKED IN TESTS** to isolate downstream conditions, NOT physically clock-verified.
- Real legacy SOFTWARE V06 SafePathPlanner.plan(): SIMULATED_PATH_ONLY with 31 waypoints on a synthetic observed map; real_world_authorized=false.
- Real legacy TRACEABLE V09 SensorHub.pair_stereo(): UNKNOWN/MISSING_OR_INVALID_SIDE because clock verification is absent.
- Real V09 run_integrated() ran on four **synthetic stereo-frame inputs**, seed 42, with camera loss, occlusion and artificial compute delay; **4/4 ABSTAIN**, zero guidance authorizations, zero reported invariant violations. No real camera, IMU, speaker or hardware clock was used.

## Independently observed veto reasons

LATENCY_BUDGET_EXCEEDED, LOW_CONFIDENCE_BLINDNESS, UNVERIFIED_CLOCK, UNVERIFIED_BODY_POSE, UNKNOWN_SPACE, COLLISION_IMMINENT, GENERATIVE_NOT_AUTHORIZED, INVALID_CONTRACT.

This addresses REG-011's veto masking by UNVERIFIED_CLOCK, but DOES NOT prove physical safety. Separate fixtures are not separate physical hazard validations.

## Provenance

Legacy ZIPs were not edited. Complete experimental source, original SHA-256 hashes, logs and cumulative Bible V2.2 are in a private package supplied to the owner, **not uploaded to this public repository**. This PR publishes documentation only. GitHub CI in this repository does NOT execute private REG-012 tests.

REQ-SF-01 through REQ-SF-08 remain without physical evidence IDs. P1 release and P0 purchases blocked. Audio output is simulated event strings.

## Next work

1. Bind actual V09 per-frame records to V06 planning with legitimate clock, calibration, head/body transforms and uncertainty.
2. Audit missing identity/freshness checks for navigation proposals.
3. Replay annotated real videos before proposing bench hardware experiments.
