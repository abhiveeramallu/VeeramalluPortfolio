'use client';

/** Last-resort boundary (root layout failed). Inline styles only — globals.css may not be loaded. */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: 'system-ui, sans-serif',
          background: '#fff3e6',
          color: '#16121f',
          display: 'grid',
          placeItems: 'center',
          minHeight: '100vh',
          margin: 0,
        }}
      >
        <div style={{ textAlign: 'center', padding: 24 }}>
          <h1 style={{ fontSize: 32 }}>Something went wrong.</h1>
          <p style={{ color: '#3b3346' }}>Please reload the page.</p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 16,
              padding: '12px 24px',
              borderRadius: 999,
              border: 0,
              background: '#c2410c',
              color: '#fff3e6',
              fontWeight: 600,
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
