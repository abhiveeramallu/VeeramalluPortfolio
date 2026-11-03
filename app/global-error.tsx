'use client';

/** Last-resort boundary (root layout failed). Inline styles only — globals.css may not be loaded. */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: 'system-ui, sans-serif',
          background: '#171811',
          color: '#f4f0de',
          display: 'grid',
          placeItems: 'center',
          minHeight: '100vh',
          margin: 0,
        }}
      >
        <div style={{ textAlign: 'center', padding: 24 }}>
          <h1 style={{ fontSize: 32 }}>Something went wrong.</h1>
          <p style={{ color: '#d6d1bc' }}>Please reload the page.</p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 16,
              padding: '12px 24px',
              borderRadius: 999,
              border: 0,
              background: '#e5c542',
              color: '#171811',
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
