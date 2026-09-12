export default function SharingCard({ isShared, syncStatus, onShare }) {
  return (
    <div className="card">
      {!isShared ? (
        <>
          <h2>Share with your study partner</h2>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            Save online and create one private link. No login.
          </p>
          <button onClick={onShare} style={{ width: '100%' }}>
            Save & Share
          </button>
        </>
      ) : (
        <>
          <h2>Shared planner is live</h2>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            Changes save automatically for both people.
          </p>
          <button onClick={onShare} style={{ width: '100%' }}>
            Share Link
          </button>
        </>
      )}
      <div style={{ marginTop: '12px', textAlign: 'right' }}>
        <span className={`status-badge status-${syncStatus}`}>
          {syncStatus === 'saved' && 'Saved on device'}
          {syncStatus === 'loading' && 'Loading'}
          {syncStatus === 'saving' && 'Saving'}
          {syncStatus === 'shared' && 'Shared live'}
          {syncStatus === 'error' && 'Sync problem'}
        </span>
      </div>
    </div>
  );
}
