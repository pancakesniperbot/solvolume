/**
 * This file provides a workaround for the BatchedMesh import error in three-mesh-bvh
 * It's used to patch the Three.js library before any 3D components are loaded
 */

import * as THREE from 'three';

// Create a mock BatchedMesh class if it doesn't exist in Three.js
// This prevents the import error from three-mesh-bvh
if (!(THREE as any).BatchedMesh) {
  // Add a minimal mock implementation
  (THREE as any).BatchedMesh = class BatchedMesh extends THREE.Mesh {
    constructor() {
      super();
      console.warn('BatchedMesh is being used as a mock implementation.');
    }
  };
}

export default THREE; 