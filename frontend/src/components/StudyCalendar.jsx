import { useState } from 'react';

export default function StudyCalendar({ plan, history }) {
  const [isOpen, setIsOpen] = useState(false);
  const totalCompleted = plan.initialCompleted + Object.values(history).reduce((a, b) => a + b, 0);
  const remaining = Math.max(0, plan.totalQuestions - totalCompleted);

  const examDate = new Date(plan.examDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const travelStart = new Date('2026-10-23');
  const travelEnd = new Date('2026-10-29');

  const wrongQuestions = Math.ceil((plan.totalQuestions * plan.wrongRate) / 100);
  const reviewDailyTarget = plan.dailyQuestions * 0.8;
  const reviewDays = Math.ceil(wrongQuestions / reviewDailyTarget);

  const reviewStart = new Date(examDate);
  reviewStart.setDate(reviewStart.getDate() - plan.finalReview - reviewDays);

  const finalReviewStart = new Date(examDate);
  finalReviewStart.setDate(finalReviewStart.getDate() - plan.finalReview);

  const isTravelWeek = (date) => date >= travelStart && date <= travelEnd;
  const isFinalReview = (date) => date >= finalReviewStart && date < examDate;
  const isReviewPhase = (date) => date >= reviewStart && date < finalReviewStart;

  // Calculate remaining questions for each day
  const getQuestionsRemaining = (date) => {
    if (date < today) {
      const daysPassed = Math.floor((date - today) / (1000 * 60 * 60 * 24));
      return Math.max(0, totalCompleted + (daysPassed * plan.dailyQuestions));
    }

    const daysFromNow = Math.floor((date - today) / (1000 * 60 * 60 * 24));
    const projected = totalCompleted + (daysFromNow * plan.dailyQuestions);
    return Math.max(0, plan.totalQuestions - projected);
  };

  const weeks = [];
  let currentDate = new Date(today);

  // Generate calendar data from today until exam + 1 week
  while (currentDate <= new Date(examDate.getTime() + 7 * 24 * 60 * 60 * 1000)) {
    const dayOfWeek = currentDate.getDay();

    if (dayOfWeek === 0 || weeks.length === 0) {
      weeks.push([]);
    }

    weeks[weeks.length - 1].push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
  };

  const getDayLabel = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  const getCellStatus = (date) => {
    if (isTravelWeek(date)) return 'travel';
    if (isFinalReview(date)) return 'final-review';
    if (isReviewPhase(date)) return 'review';
    if (date < today) return 'past';
    if (date.getTime() === today.getTime()) return 'today';
    return 'future';
  };

  return (
    <div className="card">
      <button
        className={`collapsible ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        Study Calendar to Exam
        <span className="collapsible-icon">▼</span>
      </button>

      <div className={`collapsible-content ${isOpen ? 'active' : ''}`}>
        <p style={{ fontSize: '12px', color: '#888', marginBottom: '16px', marginTop: '12px' }}>
          Projected progress with {plan.dailyQuestions} questions/day
        </p>

        <div className="calendar-grid">
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="calendar-week">
            <div className="week-label">
              Week {weekIdx + 1}
            </div>
            {week.map((date, dayIdx) => {
              const status = getCellStatus(date);
              const qRemaining = getQuestionsRemaining(date);
              const isExamDay = date.getTime() === examDate.getTime();

              return (
                <div
                  key={dayIdx}
                  className={`calendar-day calendar-${status}`}
                >
                  <div className="day-header">
                    {getDayLabel(date)}
                  </div>
                  <div className="day-date">{formatDate(date)}</div>
                  {isExamDay ? (
                    <div className="day-content exam">📝 EXAM</div>
                  ) : status === 'travel' ? (
                    <div className="day-content travel">✈️ Rest</div>
                  ) : status === 'final-review' ? (
                    <div className="day-content review">📖 Practice</div>
                  ) : status === 'review' ? (
                    <div className="day-content review">🔄 Review</div>
                  ) : (
                    <div className="day-content">
                      {qRemaining > 0 ? (
                        <>
                          <div className="remaining">{Math.round(qRemaining)}</div>
                          <div className="remaining-label">left</div>
                        </>
                      ) : (
                        <div className="remaining">✓</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

        <div className="calendar-legend">
          <div className="legend-item">
            <div className="legend-color past"></div>
            <span>Past</span>
          </div>
          <div className="legend-item">
            <div className="legend-color today"></div>
            <span>Today</span>
          </div>
          <div className="legend-item">
            <div className="legend-color future"></div>
            <span>Study Phase</span>
          </div>
          <div className="legend-item">
            <div className="legend-color review"></div>
            <span>Review/Practice</span>
          </div>
          <div className="legend-item">
            <div className="legend-color travel"></div>
            <span>Rest (Travel)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
