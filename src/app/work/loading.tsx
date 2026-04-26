export default function Loading() {
  return (
    <div className="loading-skeleton" aria-label="Loading work" role="status">
      <div style={{ paddingTop: 'calc(var(--nav-h) + var(--sp-2xl))', paddingBottom: 'var(--sp-3xl)' }}>
        <div className="container">
          <div className="skeleton-block" style={{ width: '120px', height: '14px', marginBottom: 'var(--sp-lg)' }} />
          <div className="skeleton-block" style={{ width: '50%', height: '48px', marginBottom: 'var(--sp-xl)' }} />
        </div>
      </div>
      <div style={{ paddingBlock: 'var(--sp-2xl)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--sp-lg)' }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i}>
                <div className="skeleton-block" style={{ width: '100%', aspectRatio: '4/3', borderRadius: 'var(--radius-md)', marginBottom: 'var(--sp-md)' }} />
                <div className="skeleton-block" style={{ width: '40%', height: '12px', marginBottom: '8px' }} />
                <div className="skeleton-block" style={{ width: '70%', height: '18px' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
