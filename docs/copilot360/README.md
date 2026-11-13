# COPILOT 360 — RTM-SF V1.0

**NOVAMATRA | REG-2026-11-13-008 | 2026-11-13**

This is a traceability control matrix, NOT certified safety evidence. No physical EVID-ID was received; all eight requirements remain pending or hypothetical. Proposed module names in the source mandate are not confirmed as actual source paths, so implementation_paths is empty.

The numerical thresholds in the matrix are **unvalidated proposed targets**, not proven acceptance limits. In particular, frame-age targets (16.6ms vs 33.3ms at 30fps), human reaction times, 0% false negatives in finite samples, skin temperature, performance, sensor confidence and USB alert times require further review.

The dynamic margin equation must not count depth uncertainty twice. TTC requires trajectory-based handling for non-collinear motion. A STOP audio alert does not physically stop a person. MDR applicability is open; an IVDR purpose has not been identified, pending intended-purpose assessment.

## Two distinct checks

```bash
python tools/copilot360/validate_rtm.py docs/copilot360/rtm_sf_v1.json docs/copilot360/evidence_manifest.json
python -m unittest discover -s tests/copilot360 -p 'test_*.py' -v
python tools/copilot360/validate_rtm.py docs/copilot360/rtm_sf_v1.json docs/copilot360/evidence_manifest.json --release
```

The normal check validates data integrity; it is **not** approval of P1. The release check must **fail** while critical requirements have no demonstrated PASS physical-bench evidence.

Never annotate imaginary source paths or modify legacy COPILOT 360 motors for compliance. Add `@safety_req REQ-SF-XX` only after locating and reviewing real code. A workflow is not mandatory for merge until GitHub branch protection is explicitly configured. Preserve original evidence separately, with SHA-256 hashes.

## Evidence records

Each evidence record requires: evidence_id, source, protocol, type (PHYSICAL_BENCH / SOFTWARE_TEST / REAL_DATASET / REVIEW), artifact_path, measured_at, sha256 and result (PASS / FAIL / INCONCLUSIVE). Never invent an EVID-ID.
