export default function Timeline({ plan, history }) {
  const totalCompleted = plan.initialCompleted + Object.values(history).reduce((a, b) => a + b, 0);
  const wrongQuestions = Math.ceil((plan.totalQuestions * plan.wrongRate) / 100);
  const reviewDailyTarget = plan.dailyQuestions * 0.8;
  const reviewDays = Math.ceil(wrongQuestions / reviewDailyTarget);

  const examDate = new Date(plan.examDate);
  const finalReviewStart = new Date(examDate);
  finalReviewStart.setDate(finalReviewStart.getDate() - plan.finalReview);

  const reviewBufferStart = new Date(finalReviewStart);
  reviewBufferStart.setDate(reviewBufferStart.getDate() - plan.reviewBuffer);

  const incorrectReviewStart = new Date(reviewBufferStart);
  incorrectReviewStart.setDate(incorrectReviewStart.getDate() - reviewDays);

  const travelStart = new Date('2026-10-23');
  const travelEnd = new Date('2026-10-29');

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="card">
      <h2>Study Timeline</h2>

      <div className="timeline-item">
        <div className="timeline-date">{formatDate(travelStart)} – {formatDate(travelEnd)}</div>
        <div className="timeline-label">Protected Travel Week</div>
        <div className="timeline-description">No study block required.</div>
      </div>

      <div className="timeline-item">
        <div className="timeline-date">{formatDate(incorrectReviewStart)} – {formatDate(new Date(reviewBufferStart.getTime() - 1000))}</div>
        <div className="timeline-label">Incorrect-Question Review</div>
        <div className="timeline-description">
          {wrongQuestions.toLocaleString()} questions × {reviewDays} days at ~{Math.round(reviewDailyTarget)}/day
        </div>
      </div>

      {plan.reviewBuffer > 0 && (
        <div className="timeline-item">
          <div className="timeline-date">{formatDate(reviewBufferStart)} – {formatDate(new Date(finalReviewStart.getTime() - 1000))}</div>
          <div className="timeline-label">Review Buffer</div>
          <div className="timeline-description">{plan.reviewBuffer} day(s) of flexible review time.</div>
        </div>
      )}

      <div className="timeline-item">
        <div className="timeline-date">{formatDate(finalReviewStart)} – {formatDate(new Date(examDate.getTime() - 1000))}</div>
        <div className="timeline-label">Final Review</div>
        <div className="timeline-description">{plan.finalReview} protected day(s) before the exam.</div>
      </div>

      <div className="timeline-item">
        <div className="timeline-date">{formatDate(examDate)}</div>
        <div className="timeline-label">Exam Day</div>
        <div className="timeline-description">Trust the work.</div>
      </div>
    </div>
  );
}
