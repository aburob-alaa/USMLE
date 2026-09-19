import { useState } from 'react';

export default function CurrentRecommendation({ plan, history }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!plan || !history) return null;

  const totalCompleted = (plan.initialCompleted || 0) + Object.values(history).reduce((a, b) => a + (b || 0), 0);
  const newQuestionsRemaining = Math.max(0, (plan.totalQuestions || 0) - totalCompleted);

  const examDate = new Date(plan.examDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate days to finish studying new questions
  const daysToFinishNew = newQuestionsRemaining > 0 ? Math.ceil(newQuestionsRemaining / (plan.dailyQuestions || 1)) : 0;

  // Calculate accumulated wrong questions (including cascading reviews)
  const wrongRatePercent = (plan.wrongRate || 40);
  const firstBatch = ((plan.totalQuestions || 0) * wrongRatePercent) / 100;
  const wr = wrongRatePercent / 100;
  const totalWrong = wr > 0 && wr < 1
    ? Math.ceil(firstBatch / (1 - wr))
    : Math.ceil(firstBatch);
  const reviewDailyRate = (plan.dailyQuestions || 80) * 0.8;
  const daysToFinishReview = totalWrong > 0 ? Math.ceil(totalWrong / reviewDailyRate) : 0;
  const finalReviewDays = plan.finalReview || 7;

  // Total days needed
  const totalDaysNeeded = daysToFinishNew + daysToFinishReview + finalReviewDays;
  const projectedFinishDate = new Date(today);
  projectedFinishDate.setDate(projectedFinishDate.getDate() + totalDaysNeeded);

  const daysUntilExam = Math.max(0, Math.floor((examDate - today) / (1000 * 60 * 60 * 24)));
  const onTrack = totalDaysNeeded <= daysUntilExam;

  const percentComplete = Math.round((totalCompleted / (plan.totalQuestions || 1)) * 100);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="card">
      <button
        className={`collapsible ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        Current Recommendation
        <span className="collapsible-icon">▼</span>
      </button>

      <div className={`collapsible-content ${isOpen ? 'active' : ''}`}>
        <div style={{ marginTop: '12px' }}>
          <div className="form-group">
            <label className="label">Progress</label>
            <div style={{ fontSize: '14px', marginBottom: '8px' }}>
              <strong>{Math.round(totalCompleted).toLocaleString()}</strong> of{' '}
              <strong>{Math.round(plan.totalQuestions || 0).toLocaleString()}</strong> questions
              ({percentComplete}%)
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${percentComplete}%` }}
              ></div>
            </div>
          </div>

          <div className="form-group">
            <label className="label">Study Breakdown</label>
            <div style={{ fontSize: '13px', lineHeight: '1.8', color: '#2c2416' }}>
              <div>
                📚 <strong>Study phase:</strong> {newQuestionsRemaining.toLocaleString()} questions @ {plan.dailyQuestions} q/day
                <br />
                <span style={{ fontSize: '11px', color: '#888' }}>≈ {daysToFinishNew} days</span>
              </div>
              <div style={{ marginTop: '8px' }}>
                🔄 <strong>Review phase:</strong> {totalWrong.toLocaleString()} questions @ {Math.round(reviewDailyRate)} q/day
                <br />
                <span style={{ fontSize: '11px', color: '#888' }}>≈ {daysToFinishReview} days</span>
              </div>
              <div style={{ marginTop: '8px' }}>
                ⭐ <strong>Final review:</strong> {finalReviewDays} days
              </div>
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e8e4df' }}>
                {onTrack ? (
                  <div style={{ color: '#2e7d32', fontWeight: '600' }}>
                    ✓ You're on track!
                  </div>
                ) : (
                  <div style={{ color: '#c62828', fontWeight: '600' }}>
                    ⚠ Exam is {Math.abs(daysUntilExam - totalDaysNeeded)} days earlier than needed
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="label">Timeline</label>
            <div style={{ fontSize: '13px', lineHeight: '1.8', color: '#2c2416' }}>
              <div>
                📅 <strong>Exam date:</strong> {formatDate(examDate)}
                <br />
                <span style={{ fontSize: '11px', color: '#666' }}>({daysUntilExam} days away)</span>
              </div>
              <div style={{ marginTop: '8px' }}>
                🎯 <strong>Projected finish:</strong> {formatDate(projectedFinishDate)}
                <br />
                <span style={{ fontSize: '11px', color: '#666' }}>({totalDaysNeeded} days total)</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="label">Recommendation</label>
            <div
              style={{
                padding: '12px',
                borderRadius: '6px',
                backgroundColor: onTrack ? '#e8f5e9' : '#fff3e0',
                borderLeft: `4px solid ${onTrack ? '#6ba043' : '#d67c3b'}`,
                fontSize: '13px',
                lineHeight: '1.6',
              }}
            >
              {onTrack ? (
                <>
                  <strong>You can make it! 🎉</strong>
                  <br />
                  You'll finish all {plan.totalQuestions.toLocaleString()} questions (including review) by {formatDate(projectedFinishDate)}.
                  That's <strong>{daysUntilExam - totalDaysNeeded} days</strong> before your exam!
                </>
              ) : (
                <>
                  <strong>Need more time ⏰</strong>
                  <br />
                  You need {totalDaysNeeded} days total, but have only {daysUntilExam} days until your exam.
                  Consider moving the exam to {formatDate(projectedFinishDate)} or increasing daily study rate.
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
