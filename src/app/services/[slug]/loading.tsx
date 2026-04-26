export default function Loading() {
  return (
    <div className="loading-skeleton" aria-label="Loading service details" role="status">
      <div style={{ paddingTop: 'calc(var(--nav-h) + var(--sp-2xl))', paddingBottom: 'var(--sp-2xl)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="skeleton-block" style={{ width: '100px', height: '14px', marginBottom: 'var(--sp-sm)' }} />
          <div className="skeleton-block" style={{ width: '70%', height: '40px', marginBottom: 'var(--sp-md)' }} />
          <div className="skeleton-block" style={{ width: '90%', height: '18px', marginBottom: '10px' }} />
          <div className="skeleton-block" style={{ width: '75%', height: '18px', marginBottom: 'var(--sp-xl)' }} />

          <div className="skeleton-block" style={{ width: '200px', height: '24px', marginBottom: 'var(--sp-md)' }} />
          <div style={{ display: 'grid', gap: '12px', marginBottom: 'var(--sp-xl)' }}>
            {[1, 2, 3, 4].map((i) => (
              <div className="skeleton-block" key={i} style={{ width: `${70 + i * 5}%`, height: '16px' }} />
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div className="skeleton-block" style={{ width: '140px', height: '44px', borderRadius: 'var(--radius-sm)' }} />
            <div className="skeleton-block" style={{ width: '140px', height: '44px', borderRadius: 'var(--radius-sm)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
