// Central import file for Three.js
// Import specific elements we need from THREE
import * as THREE from 'three';

// Export the entire THREE namespace
export default THREE;

// Export commonly used elements for direct imports
export const {
  // Math and core utilities
  Color,
  Vector2,
  Vector3,
  Quaternion,
  Matrix4,
  Euler,
  
  // Materials
  MeshBasicMaterial,
  MeshStandardMaterial,
  MeshPhongMaterial,
  
  // Constants and special values
  DoubleSide,
  FrontSide,
  BackSide,
  AdditiveBlending,
  NormalBlending,
  MultiplyBlending,
  
  // Geometries and core classes
  BoxGeometry,
  SphereGeometry,
  PlaneGeometry,
  Group,
  Mesh,
  Object3D,
  
  // Lights
  AmbientLight,
  DirectionalLight,
  PointLight,
  SpotLight,
  
  // Cameras
  PerspectiveCamera,
  OrthographicCamera,
  
  // Loaders
  TextureLoader,
  
  // Other
  Clock,
  Raycaster,
  Scene
} = THREE;

// Export type definitions
export type ThreeMesh = THREE.Mesh;
export type ThreeGroup = THREE.Group;
export type ThreeMaterial = THREE.Material;
export type ThreeMeshBasicMaterial = THREE.MeshBasicMaterial;
export type ThreeMeshStandardMaterial = THREE.MeshStandardMaterial;
export type ThreeObject3D = THREE.Object3D;