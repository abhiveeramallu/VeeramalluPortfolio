'use client';

import { useMemo, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { randomBoard, solveAssignment } from '@/lib/hungarian';
import { cn } from '@/lib/utils';

const SIZE = 4;

export default function HungarianGame() {
  const [seed, setSeed] = useState(2024);
  const board = useMemo(() => randomBoard(SIZE, seed), [seed]);
  const optimum = useMemo(() => solveAssignment(board), [board]);
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState(false);

  const complete = Object.keys(picks).length === SIZE;
  const total = complete ? Object.entries(picks).reduce((s, [r, c]) => s + board[Number(r)][c], 0) : null;
  const usedCols = new Set(Object.values(picks));

  const pick = (r: number, c: number) => {
    setRevealed(false);
    setPicks((prev) => {
      const next = { ...prev };
      for (const [row, col] of Object.entries(next))
        if (col === c && Number(row) !== r) delete next[Number(row)];
      if (next[r] === c) delete next[r];
      else next[r] = c;
      return next;
    });
  };

  const newBoard = () => {
    setSeed(Math.floor(Math.random() * 1e9));
    setPicks({});
    setRevealed(false);
  };

  return (
    <div className="mx-auto max-w-xl">
      <p className="mb-5 text-sm text-muted">
        Assign each driver to one order (one per row and column). Lower total minutes wins. Can you match the
        algorithm?
      </p>
      <table className="w-full border-separate border-spacing-2 font-mono text-sm">
        <caption className="sr-only">Cost matrix: minutes for each driver to reach each order</caption>
        <thead>
          <tr>
            <th scope="col" className="text-left text-xs text-muted">
              Driver
            </th>
            {board[0].map((_, c) => (
              <th key={c} scope="col" className="text-xs text-muted">
                Order {String.fromCharCode(65 + c)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {board.map((row, r) => (
            <tr key={r}>
              <th scope="row" className="text-left text-xs font-semibold text-ink">
                D{r + 1}
              </th>
              {row.map((cell, c) => {
                const mine = picks[r] === c;
                const best = revealed && optimum.assignment[r] === c;
                return (
                  <td key={c}>
                    <button
                      type="button"
                      onClick={() => pick(r, c)}
                      aria-pressed={mine}
                      aria-label={`Driver ${r + 1} to order ${String.fromCharCode(65 + c)}, ${cell} minutes`}
                      className={cn(
                        'h-12 w-full rounded-xl border text-base font-bold transition-all',
                        mine
                          ? 'border-orange-500 bg-orange-500 text-[#111] shadow-bloom'
                          : usedCols.has(c)
                            ? 'border-line bg-bg text-muted'
                            : 'border-line bg-surface text-ink hover:border-ink',
                        best && 'ring-2 ring-indigo-500 ring-offset-2',
                      )}
                    >
                      {cell}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-sm text-ink" role="status" aria-live="polite">
          {total === null
            ? `${Object.keys(picks).length}/${SIZE} assigned`
            : total === optimum.total
              ? `${total} min — optimal. You matched Kuhn–Munkres.`
              : `${total} min — the optimum is ${optimum.total} (${total - optimum.total} min worse).`}
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={() => setRevealed(true)} className="btn-secondary px-4 py-2 text-xs">
            Show optimum
          </button>
          <button type="button" onClick={newBoard} className="btn-primary px-4 py-2 text-xs">
            <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" /> New board
          </button>
        </div>
      </div>
    </div>
  );
}
