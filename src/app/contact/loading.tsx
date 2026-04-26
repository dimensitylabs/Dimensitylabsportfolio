export default function Loading() {
  return (
    <div className="loading-skeleton" aria-label="Loading contact" role="status">
      <div style={{ paddingTop: 'calc(var(--nav-h) + var(--sp-2xl))', paddingBottom: 'var(--sp-3xl)' }}>
        <div className="container">
          <div className="skeleton-block" style={{ width: '120px', height: '14px', marginBottom: 'var(--sp-lg)' }} />
          <div className="skeleton-block" style={{ width: '50%', height: '48px', marginBottom: '16px' }} />
          <div className="skeleton-block" style={{ width: '35%', height: '48px', marginBottom: 'var(--sp-xl)' }} />
        </div>
      </div>
      <div style={{ paddingBlock: 'var(--sp-2xl)' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <div style={{ display: 'grid', gap: 'var(--sp-lg)' }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="skeleton-block" style={{ width: '120px', height: '14px', marginBottom: '8px' }} />
                <div className="skeleton-block" style={{ width: '100%', height: '44px', borderRadius: 'var(--radius-sm)' }} />
              </div>
            ))}
            <div className="skeleton-block" style={{ width: '160px', height: '48px', borderRadius: 'var(--radius-sm)', marginTop: 'var(--sp-md)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
