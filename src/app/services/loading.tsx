export default function Loading() {
  return (
    <div className="loading-skeleton" aria-label="Loading services" role="status">
      <div style={{ paddingTop: 'calc(var(--nav-h) + var(--sp-2xl))', paddingBottom: 'var(--sp-3xl)' }}>
        <div className="container">
          <div className="skeleton-block" style={{ width: '140px', height: '14px', marginBottom: 'var(--sp-lg)' }} />
          <div className="skeleton-block" style={{ width: '55%', height: '48px', marginBottom: '16px' }} />
          <div className="skeleton-block" style={{ width: '40%', height: '48px', marginBottom: 'var(--sp-xl)' }} />
          <div className="skeleton-block" style={{ width: '80%', maxWidth: '500px', height: '18px' }} />
        </div>
      </div>
      <div style={{ paddingBlock: 'var(--sp-2xl)', borderTop: '1px solid var(--clr-border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gap: 'var(--sp-xl)' }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} style={{ display: 'flex', gap: 'var(--sp-lg)', alignItems: 'flex-start' }}>
                <div className="skeleton-block" style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div className="skeleton-block" style={{ width: '40%', height: '20px', marginBottom: '8px' }} />
                  <div className="skeleton-block" style={{ width: '90%', height: '14px', marginBottom: '6px' }} />
                  <div className="skeleton-block" style={{ width: '60%', height: '14px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
