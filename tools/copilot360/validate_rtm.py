#!/usr/bin/env python3
"""COPILOT 360 RTM-SF: structural check + explicit P1 release veto."""
import argparse
import json
import re
import sys

def validate(rtm, evidence, release=False):
    errors=[]
    reqs=rtm.get("requirements",[])
    records=evidence.get("records",[])
    if not isinstance(reqs,list) or len(reqs)!=8:
        errors.append("Exactly 8 requirements required")
        reqs=reqs if isinstance(reqs,list) else []
    if not isinstance(records,list):
        errors.append("Evidence records must be a list")
        records=[]
    by_id={}
    for e in records:
        eid=e.get("evidence_id","")
        if not eid or eid in by_id:
            errors.append("Missing or duplicate EVID-ID")
        by_id[eid]=e
        if not re.fullmatch(r"[0-9a-fA-F]{64}",e.get("sha256","")):
            errors.append(eid+": invalid SHA-256")
        if e.get("type") not in {"PHYSICAL_BENCH","SOFTWARE_TEST","REAL_DATASET","REVIEW"}:
            errors.append(eid+": invalid evidence type")
        if e.get("result") not in {"PASS","FAIL","INCONCLUSIVE"}:
            errors.append(eid+": invalid result")
        for k in ["source","protocol","artifact_path","measured_at"]:
            if not e.get(k): errors.append(eid+": missing "+k)
    seen=set()
    for r in reqs:
        rid=r.get("id","")
        if rid in seen or not re.fullmatch(r"REQ-SF-0[1-8]",rid):
            errors.append(rid+": duplicate or invalid requirement ID")
        seen.add(rid)
        if r.get("status") not in {"PENDENTE","HIPOTESE","REPROVADO","VERIFICADO"}:
            errors.append(rid+": invalid status")
        severity=r.get("severity",0)
        if type(severity) is not int or not 1<=severity<=10:
            errors.append(rid+": invalid severity")
        ids=r.get("evidence_ids",[])
        if not isinstance(ids,list):errors.append(rid+": invalid evidence list");ids=[]
        if len(ids)!=len(set(ids)):errors.append(rid+": duplicate evidence reference")
        for eid in ids:
            if eid not in by_id:errors.append(rid+": missing EVID-ID "+eid)
        valid=[by_id[eid] for eid in ids if eid in by_id and by_id[eid].get("result")=="PASS"]
        if r.get("status")=="VERIFICADO" and not valid:
            errors.append(rid+": verified without passing evidence")
        if release and severity>=9:
            if r.get("status")!="VERIFICADO":
                errors.append(rid+": P1 BLOCKED: requirement not verified")
            elif not any(e.get("type")=="PHYSICAL_BENCH" for e in valid):
                errors.append(rid+": P1 BLOCKED: physical bench evidence absent")
    if seen!={"REQ-SF-%02d"%i for i in range(1,9)}:
        errors.append("Requirement set mismatch")
    return errors

if __name__=="__main__":
    p=argparse.ArgumentParser()
    p.add_argument("rtm");p.add_argument("evidence");p.add_argument("--release",action="store_true")
    a=p.parse_args()
    try:
        with open(a.rtm,encoding="utf8") as f:rtm=json.load(f)
        with open(a.evidence,encoding="utf8") as f:evidence=json.load(f)
        problems=validate(rtm,evidence,a.release)
    except (OSError,ValueError) as exc:
        print("ERROR:",exc);sys.exit(2)
    for issue in problems:print("FAIL:",issue)
    if problems:sys.exit(1)
    print("PASS: structural integrity only. Not physical safety approval.")
