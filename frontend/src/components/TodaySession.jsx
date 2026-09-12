import { useState, useEffect } from 'react';

export default function TodaySession({ plan, history, onUpdate }) {
  const [input, setInput] = useState('');
  const [logged, setLogged] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const todayValue = history[today] || 0;

  useEffect(() => {
    setInput(todayValue.toString());
  }, [todayValue]);

  const handleLog = () => {
    const value = parseInt(input, 10);
    if (!isNaN(value) && value >= 0) {
      const newHistory = { ...history, [today]: value };
      onUpdate(newHistory);
      setLogged(true);
      setTimeout(() => setLogged(false), 2000);
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2>Today's Session</h2>
        {logged && <span className="status-badge status-shared">Logged</span>}
      </div>
      <div className="label">Target: {plan.dailyQuestions} questions</div>
      <div className="input-group" style={{ marginTop: '12px' }}>
        <input
          type="number"
          min="0"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="0"
        />
        <button onClick={handleLog}>Log</button>
      </div>
    </div>
  );
}
