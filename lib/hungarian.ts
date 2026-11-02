/**
 * Hungarian (Kuhn–Munkres) algorithm, O(n³), for a square cost matrix.
 * Returns the column assigned to each row and the minimum total cost.
 */
export function solveAssignment(cost: number[][]): { assignment: number[]; total: number } {
  const n = cost.length;
  if (n === 0) return { assignment: [], total: 0 };
  if (cost.some((row) => row.length !== n)) throw new Error('Cost matrix must be square');

  const INF = Number.POSITIVE_INFINITY;
  const u = new Array<number>(n + 1).fill(0);
  const v = new Array<number>(n + 1).fill(0);
  const p = new Array<number>(n + 1).fill(0); // p[j] = row matched to column j (1-indexed)
  const way = new Array<number>(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    p[0] = i;
    let j0 = 0;
    const minv = new Array<number>(n + 1).fill(INF);
    const used = new Array<boolean>(n + 1).fill(false);
    do {
      used[j0] = true;
      const i0 = p[j0];
      let delta = INF;
      let j1 = 0;
      for (let j = 1; j <= n; j++) {
        if (used[j]) continue;
        const cur = cost[i0 - 1][j - 1] - u[i0] - v[j];
        if (cur < minv[j]) {
          minv[j] = cur;
          way[j] = j0;
        }
        if (minv[j] < delta) {
          delta = minv[j];
          j1 = j;
        }
      }
      for (let j = 0; j <= n; j++) {
        if (used[j]) {
          u[p[j]] += delta;
          v[j] -= delta;
        } else {
          minv[j] -= delta;
        }
      }
      j0 = j1;
    } while (p[j0] !== 0);
    do {
      const j1 = way[j0];
      p[j0] = p[j1];
      j0 = j1;
    } while (j0 !== 0);
  }

  const assignment = new Array<number>(n).fill(-1);
  for (let j = 1; j <= n; j++) if (p[j] > 0) assignment[p[j] - 1] = j - 1;
  const total = assignment.reduce((sum, col, row) => sum + cost[row][col], 0);
  return { assignment, total };
}

/** Deterministic pseudo-random board (mulberry32) so a shared link reproduces the same puzzle. */
export function randomBoard(size: number, seed: number, max = 9): number[][] {
  let t = seed >>> 0;
  const rand = () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
  return Array.from({ length: size }, () => Array.from({ length: size }, () => 1 + Math.floor(rand() * max)));
}
