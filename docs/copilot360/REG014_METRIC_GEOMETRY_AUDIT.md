# COPILOT 360 - REG-2026-11-13-014

Status: SYNTHETIC SOFTWARE LAB ONLY; P1 BLOCKED; HARDWARE PURCHASE NOT AUTHORIZED.

## Experiment
Independent pinhole stereo depth, first-order depth uncertainty and quaternion head-to-body transform tested in Python. 18/18 local unit tests PASS. Invalid disparity, missing extrinsics, unverified calibration and unobserved space abstain. A far obstacle is not proof of free space.

Fixtures that mark parameters as verified are synthetic; no physical calibration was conducted. V09-to-V06 still lacks a physically calibrated metric free-space grid and verified body pose. TRACEABLE V07/V08 contain real Middlebury Motorcycle stereo images, not validated annotations of glass or negative obstacles. No measured real-world FN/FP, audio, sensors or human-safety performance. All eight REQ-SF remain physically unverified. Original legacy code untouched.

Full source, local test log, integrity manifest and cumulative Bible V2.4 are in the owner's private ZIP, not this public website repository. This GitHub change is documentation only, not a remote test of the private sandbox.
