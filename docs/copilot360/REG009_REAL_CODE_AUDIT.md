# COPILOT 360 — REG-2026-11-13-009

**Scope:** Non-destructive examination of versioned legacy ZIP sources. **Not a production build audit, hardware validation or real-world mobility authorization.**

## Observed implementation matches

| Requirement | Real implementation / package | Observed scope | Critical gap |
|---|---|---|---|
| REQ-SF-01 | `SafePathPlanner.stopping_distance`, `Copilot.assess` (SOFTWARE V06) | Simulation calculation | No measured end-to-end age, audio and human response |
| REQ-SF-02 | `gate`, `sense` (JS V02); `safety_supervisor` (TRACEABLE V09) | Logical abstention in simulation | No measured alert <=150 ms |
| REQ-SF-03 | `World.dropoffs` / `Copilot.assess` (SOFTWARE V06) | Synthetic truth-model drop-offs | No demonstrated real-image negative-obstacle detector |
| REQ-SF-04 | `VirtualSensor.visible` (SOFTWARE V06) | Simulated transparent material confidence | No validated glass/reflection detector |
| REQ-SF-05 | `Copilot.assess` simulated temperature (SOFTWARE V06) | Virtual temperature veto at >39°C | No NTC/MCU hardware shutdown |
| REQ-SF-06 | `run_integrated(heavy_compute)` (TRACEABLE V09) | Synthetic deadline fault | No Android thermal events or sustained fps verification |
| REQ-SF-07 | `Copilot.assess(usb_ok=False)` (SOFTWARE V06) | Virtual USB failure veto | No independent audio alarm during cable loss |
| REQ-SF-08 | `safety_supervisor` (TRACEABLE V09), atomic `Gate` (NATIVE V06) | Software veto and preemption | No cross-system generative-I/O privilege proof |

## Executed local software regressions

- SOFTWARE V06 selected pytest modules: **125 passed**.
- TRACEABLE V09 selected pytest modules: **58 passed**.
- JS V02 `testes_motor.js`: **9,025 assertions PASS**, 4,500 movement/tick scenarios.
- External REG-009 software fault tests: **13 + 9 passed**.
- TRACEABLE V09 offline replay with **synthetic images** and 4 injected fault frames: **4 ABSTAIN, zero guidance authorizations, zero invariant violations**.

Different packages represent different versions. Passing tests does **not** demonstrate one integrated build. No source binaries, images, original ZIP files or private technical Bible have been uploaded to this public repository.

## Gate and provenance

No physical EVID-ID exists for these requirements. The RTM evidence manifest remains empty; **P1 release BLOCKED**. The numeric thresholds in RTM V1.0 are proposals pending independent verification.

This repository can run RTM structure/CI checks. It does not contain these legacy engine sources; therefore CI must **not** claim it ran their integration tests. Full per-file SHA-256, test output and reproducible external scripts are preserved in the private REG-009 technical package for the project owner.
