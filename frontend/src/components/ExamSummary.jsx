export default function ExamSummary({ plan, history }) {
  const totalCompleted = plan.initialCompleted + Object.values(history).reduce((a, b) => a + b, 0);
  const remaining = Math.max(0, plan.totalQuestions - totalCompleted);
  const progressPercent = (totalCompleted / plan.totalQuestions) * 100;

  const examDate = new Date(plan.examDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysLeft = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));

  return (
    <div className="card card-dark">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <div className="label" style={{ color: '#aaa' }}>Exam Date</div>
          <div style={{ fontSize: '18px', fontWeight: 700 }}>
            {examDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="label" style={{ color: '#aaa' }}>Days Left</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: daysLeft < 30 ? '#ff9800' : '#6ba043' }}>
            {daysLeft}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 600 }}>
            {totalCompleted.toLocaleString()} done
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '14px', fontWeight: 600 }}>
            {remaining.toLocaleString()} left
          </div>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
      </div>

      <div style={{ fontSize: '12px', color: '#aaa', marginTop: '8px' }}>
        {Math.round(progressPercent)}% complete
      </div>
    </div>
  );
}
