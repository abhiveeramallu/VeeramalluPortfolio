/**
 * The hero composition: glossy objects that assemble into the letter "A" (for Abhiram).
 * Shared by the WebGL scene and the static SVG fallback so both show the same picture.
 */
export type ShapeKind = 'box' | 'sphere' | 'knot' | 'asterisk' | 'pill' | 'torus';

export interface ShapeSpec {
  kind: ShapeKind;
  color: string;
  home: [number, number, number];
  scale: number;
  /** Initial rotation (radians). */
  rot: [number, number, number];
  glass?: boolean;
}

export const PALETTE = {
  orange: '#FF5A1F',
  indigo: '#5B5BFF',
  lime: '#C6F432',
  pink: '#FFB8D6',
  blue: '#AFCBFF',
  cream: '#FFF1DC',
  lavender: '#C9C2FF',
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const apex: [number, number] = [0, 1.75];
const leftFoot: [number, number] = [-1.8, -1.7];
const rightFoot: [number, number] = [1.8, -1.7];

const along = (from: [number, number], to: [number, number], t: number, z = 0): [number, number, number] => [
  lerp(from[0], to[0], t),
  lerp(from[1], to[1], t),
  z,
];

export const SHAPES: ShapeSpec[] = [
  // Apex
  { kind: 'knot', color: PALETTE.orange, home: along(leftFoot, apex, 1, 0.1), scale: 1, rot: [0.4, 0.2, 0] },
  // Left stroke (bottom → top)
  { kind: 'box', color: PALETTE.indigo, home: along(leftFoot, apex, 0, 0), scale: 1, rot: [0.3, 0.5, 0.2] },
  {
    kind: 'sphere',
    color: PALETTE.pink,
    home: along(leftFoot, apex, 0.24, 0.15),
    scale: 0.95,
    rot: [0, 0, 0],
  },
  { kind: 'pill', color: PALETTE.lime, home: along(leftFoot, apex, 0.5, -0.05), scale: 1, rot: [0, 0, 0.55] },
  {
    kind: 'box',
    color: PALETTE.cream,
    home: along(leftFoot, apex, 0.75, 0.05),
    scale: 0.85,
    rot: [0.6, 0.2, 0.4],
  },
  // Right stroke (bottom → top)
  {
    kind: 'asterisk',
    color: PALETTE.orange,
    home: along(rightFoot, apex, 0, 0.1),
    scale: 1,
    rot: [0, 0, 0.3],
  },
  {
    kind: 'torus',
    color: PALETTE.blue,
    home: along(rightFoot, apex, 0.25, 0),
    scale: 0.95,
    rot: [0.5, 0.3, 0],
  },
  {
    kind: 'sphere',
    color: PALETTE.lavender,
    home: along(rightFoot, apex, 0.5, 0.2),
    scale: 1.05,
    rot: [0, 0, 0],
    glass: true,
  },
  {
    kind: 'pill',
    color: PALETTE.indigo,
    home: along(rightFoot, apex, 0.76, 0),
    scale: 0.9,
    rot: [0, 0, -0.55],
  },
  // Crossbar
  { kind: 'box', color: PALETTE.lime, home: [-0.55, -0.35, 0.25], scale: 0.7, rot: [0.2, 0.8, 0.1] },
  { kind: 'sphere', color: PALETTE.orange, home: [0.5, -0.35, 0.1], scale: 0.7, rot: [0, 0, 0] },
  // Satellites
  { kind: 'asterisk', color: PALETTE.indigo, home: [-2.4, 1.5, -0.6], scale: 0.55, rot: [0, 0, 0.1] },
  { kind: 'torus', color: PALETTE.pink, home: [2.4, 1.2, -0.5], scale: 0.55, rot: [0.9, 0.2, 0] },
];
