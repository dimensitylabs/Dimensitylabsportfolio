// src/app/loading.tsx
export default function Loading() {
  return (
    <div className="loading-skeleton" aria-label="Loading content" role="status">
      {/* Hero skeleton */}
      <div style={{ paddingTop: 'calc(var(--nav-h) + var(--sp-2xl))', paddingBottom: 'var(--sp-3xl)' }}>
        <div className="container">
          <div className="skeleton-block" style={{ width: '180px', height: '14px', marginBottom: 'var(--sp-lg)' }} />
          <div className="skeleton-block" style={{ width: '65%', height: '48px', marginBottom: '16px' }} />
          <div className="skeleton-block" style={{ width: '50%', height: '48px', marginBottom: 'var(--sp-xl)' }} />
          <div className="skeleton-block" style={{ width: '90%', maxWidth: '540px', height: '18px', marginBottom: '10px' }} />
          <div className="skeleton-block" style={{ width: '70%', maxWidth: '420px', height: '18px' }} />
        </div>
      </div>

      {/* Content skeleton */}
      <div style={{ paddingBlock: 'var(--sp-2xl)', borderTop: '1px solid var(--clr-border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--sp-lg)' }}>
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="skeleton-block" style={{ width: '100%', aspectRatio: '4/3', borderRadius: 'var(--radius-md)', marginBottom: 'var(--sp-md)' }} />
                <div className="skeleton-block" style={{ width: '60%', height: '14px', marginBottom: '8px' }} />
                <div className="skeleton-block" style={{ width: '80%', height: '20px' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
