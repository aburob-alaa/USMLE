import { useState } from 'react';

export default function PlanSettings({ plan, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setSaved(false);
    const numValue = key === 'examDate' ? value : parseInt(value, 10);
    const newPlan = { ...plan, [key]: numValue };

    const newErrors = [];
    if (newPlan.initialCompleted > newPlan.totalQuestions) {
      newErrors.push('Completed questions cannot exceed total.');
    }
    if (newPlan.dailyQuestions < 1) {
      newErrors.push('Daily goal must be at least 1.');
    }
    if (!newPlan.examDate) {
      newErrors.push('Exam date is required.');
    }

    setErrors(newErrors);
    if (newErrors.length === 0) {
      onUpdate(newPlan);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="card">
      <button
        className={`collapsible ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        Plan Assumptions
        <span className="collapsible-icon">▼</span>
      </button>

      <div className={`collapsible-content ${isOpen ? 'active' : ''}`}>
        <div style={{ marginTop: '12px' }}>
          <div className="form-group">
            <label className="label">Exam Date</label>
            <input
              type="date"
              value={plan.examDate}
              onChange={(e) => handleChange('examDate', e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <label className="label">Total Question Bank Size</label>
            <input
              type="number"
              min="1"
              value={plan.totalQuestions}
              onChange={(e) => handleChange('totalQuestions', e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <label className="label">Questions Completed Before Using App</label>
            <input
              type="number"
              min="0"
              value={plan.initialCompleted}
              onChange={(e) => handleChange('initialCompleted', e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <label className="label">Daily Question Goal</label>
            <input
              type="number"
              min="1"
              value={plan.dailyQuestions}
              onChange={(e) => handleChange('dailyQuestions', e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <label className="label">Estimated Incorrect Rate (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={plan.wrongRate}
              onChange={(e) => handleChange('wrongRate', e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <label className="label">Review Buffer Days</label>
            <input
              type="number"
              min="0"
              value={plan.reviewBuffer}
              onChange={(e) => handleChange('reviewBuffer', e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <label className="label">Final Review Days</label>
            <input
              type="number"
              min="1"
              value={plan.finalReview}
              onChange={(e) => handleChange('finalReview', e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          {errors.map((error, i) => (
            <div key={i} className="error-message">
              • {error}
            </div>
          ))}

          {saved && (
            <div className="success-message" style={{ marginTop: '12px' }}>
              ✓ Assumptions updated successfully
            </div>
          )}

          <div style={{ marginTop: '16px', textAlign: 'right' }}>
            <span className={`status-badge ${saved ? 'status-shared' : 'status-saved'}`}>
              {saved ? 'Saved ✓' : 'Auto-saving'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
