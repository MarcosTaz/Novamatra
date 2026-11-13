import math
import unittest
from c4.model import Parameters, allocate, road_shape, simulation

class SuspensionTests(unittest.TestCase):
    def test_road_zero_outside(self):
        self.assertEqual(road_shape(0,0),(0.0,0.0))
        self.assertEqual(road_shape(99,1),(0.0,0.0))
    def test_force_allocation(self):
        p=Parameters();u=allocate([150.0,20.0,-13.0],p.geometry())
        self.assertAlmostEqual(sum(u),150.0)
        self.assertAlmostEqual(sum(y*f for (x,y),f in zip(p.geometry(),u)),20.0)
        self.assertAlmostEqual(sum(x*f for (x,y),f in zip(p.geometry(),u)),-13.0)
    def test_passive_no_actuation(self):
        out=simulation('passive',duration=0.25)
        self.assertEqual(out['metrics']['peak_actuator_force_N'],0)
        self.assertEqual(out['metrics']['actuator_mechanical_work_abs_J'],0)
    def test_active_bounded_and_finite(self):
        result=simulation('c4',duration=1.0)
        for v in result['metrics'].values(): self.assertTrue(math.isfinite(v))
        self.assertLessEqual(result['metrics']['peak_actuator_force_N'],Parameters().max_actuator_force+1e-8)
    def test_bad_mode(self):
        with self.assertRaises(ValueError): simulation('unknown')

if __name__=='__main__':unittest.main()
