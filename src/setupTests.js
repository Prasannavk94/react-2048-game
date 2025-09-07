import '@testing-library/jest-dom';

// Mock Math.random for consistent testing
const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5; // Always return 0.5 for consistent testing
global.Math = mockMath;
