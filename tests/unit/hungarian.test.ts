import { describe, expect, it } from 'vitest';
import { randomBoard, solveAssignment } from '@/lib/hungarian';

function bruteForce(cost: number[][]): number {
  const n = cost.length;
  let best = Infinity;
  const permute = (row: number, used: boolean[], total: number) => {
    if (total >= best) return;
    if (row === n) {
      best = total;
      return;
    }
    for (let c = 0; c < n; c++) {
      if (used[c]) continue;
      used[c] = true;
      permute(row + 1, used, total + cost[row][c]);
      used[c] = false;
    }
  };
  permute(0, new Array(n).fill(false), 0);
  return best;
}

describe('solveAssignment', () => {
  it('solves the classic 3×3 example', () => {
    const { assignment, total } = solveAssignment([
      [9, 2, 7],
      [6, 4, 3],
      [5, 8, 1],
    ]);
    expect(total).toBe(9);
    expect(new Set(assignment).size).toBe(3);
  });

  it('matches brute force on 200 random boards', () => {
    for (let seed = 1; seed <= 200; seed++) {
      const size = 2 + (seed % 5);
      const board = randomBoard(size, seed);
      const { assignment, total } = solveAssignment(board);
      expect(new Set(assignment).size).toBe(size);
      expect(total).toBe(bruteForce(board));
    }
  });

  it('handles empty and rejects non-square input', () => {
    expect(solveAssignment([])).toEqual({ assignment: [], total: 0 });
    expect(() => solveAssignment([[1, 2]])).toThrow();
  });

  it('generates deterministic boards from a seed', () => {
    expect(randomBoard(4, 42)).toEqual(randomBoard(4, 42));
    expect(randomBoard(4, 42)).not.toEqual(randomBoard(4, 43));
  });
});
