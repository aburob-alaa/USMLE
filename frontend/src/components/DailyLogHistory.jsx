import { useState } from 'react';

export default function DailyLogHistory({ history, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);

  const sortedDates = Object.keys(history).sort((a, b) => new Date(b) - new Date(a));

  const handleDelete = (date) => {
    const newHistory = { ...history };
    delete newHistory[date];
    onUpdate(newHistory);
  };

  const handleEdit = (date, value) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0) {
      const newHistory = { ...history, [date]: numValue };
      onUpdate(newHistory);
    }
  };

  return (
    <div className="card">
      <button
        className={`collapsible ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        Daily Log History
        <span className="collapsible-icon">▼</span>
      </button>

      <div className={`collapsible-content ${isOpen ? 'active' : ''}`}>
        {sortedDates.length === 0 ? (
          <p style={{ color: '#999', fontSize: '14px', marginTop: '12px' }}>No daily logs yet</p>
        ) : (
          <div style={{ marginTop: '12px' }}>
            {sortedDates.map((date) => (
              <div key={date} className="history-item">
                <div className="history-date">{date}</div>
                <input
                  type="number"
                  min="0"
                  className="history-input"
                  value={history[date]}
                  onChange={(e) => handleEdit(date, e.target.value)}
                />
                <button
                  className="history-delete"
                  onClick={() => handleDelete(date)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
