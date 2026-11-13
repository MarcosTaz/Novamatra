import copy
import json
import sys
import unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/"tools/copilot360"))
from validate_rtm import validate

class MatrixTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.rtm=json.loads((ROOT/"docs/copilot360/rtm_sf_v1.json").read_text())
        cls.evidence=json.loads((ROOT/"docs/copilot360/evidence_manifest.json").read_text())
    def test_baseline_structure(self):self.assertEqual(validate(self.rtm,self.evidence),[])
    def test_p1_must_be_blocked(self):self.assertEqual(len(validate(self.rtm,self.evidence,True)),8)
    def test_unverified_cannot_claim_verified(self):
        r=copy.deepcopy(self.rtm);r["requirements"][0]["status"]="VERIFICADO"
        self.assertTrue(validate(r,self.evidence))
    def test_missing_evidence_id(self):
        r=copy.deepcopy(self.rtm);r["requirements"][0]["evidence_ids"]=["EVID-MISSING"]
        self.assertTrue(validate(r,self.evidence))
    def test_invalid_sha(self):
        e={"records":[{"evidence_id":"EVID-1","sha256":"bad","type":"PHYSICAL_BENCH","source":"lab","protocol":"ens","artifact_path":"x","measured_at":"2026-11-13","result":"PASS"}]}
        self.assertTrue(any("SHA-256" in x for x in validate(self.rtm,e)))
    def test_rejected_cannot_ship(self):
        r=copy.deepcopy(self.rtm);r["requirements"][0]["status"]="REPROVADO"
        self.assertTrue(validate(r,self.evidence,True))
if __name__=="__main__":unittest.main()
