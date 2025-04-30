/**
 * This file provides a workaround for the BatchedMesh import error in three-mesh-bvh
 * It's used to patch the Three.js library before any 3D components are loaded
 */

import * as THREE from 'three';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';

// Extend the Mesh class with BVH functionality
THREE.Mesh.prototype.computeBoundsTree = computeBoundsTree;
THREE.Mesh.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.acceleratedRaycast = acceleratedRaycast;

// Export the patched THREE
export { THREE }; 