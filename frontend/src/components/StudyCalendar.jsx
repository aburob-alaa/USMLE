import { useState } from 'react';

export default function StudyCalendar({ plan, history }) {
  const [isOpen, setIsOpen] = useState(false);
  const totalCompleted = plan.initialCompleted + Object.values(history).reduce((a, b) => a + b, 0);
  const remaining = Math.max(0, plan.totalQuestions - totalCompleted);

  const examDate = new Date(plan.examDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate recommended exam date with proper study + review phases
  const newQuestionsRemaining = remaining;
  const daysToFinishNew = newQuestionsRemaining > 0 ? Math.ceil(newQuestionsRemaining / plan.dailyQuestions) : 0;

  const totalWrong = Math.ceil((plan.totalQuestions * plan.wrongRate) / 100);
  const reviewDailyRate = plan.dailyQuestions * 0.8;
  const daysToFinishReview = totalWrong > 0 ? Math.ceil(totalWrong / reviewDailyRate) : 0;
  const finalReviewDays = plan.finalReview;

  const totalDaysNeeded = daysToFinishNew + daysToFinishReview + finalReviewDays;
  const recommendedFinishDate = new Date(today);
  recommendedFinishDate.setDate(recommendedFinishDate.getDate() + totalDaysNeeded);
  const recommendedExamDate = new Date(recommendedFinishDate);

  const travelStart = new Date('2026-10-23');
  const travelEnd = new Date('2026-10-29');

  const wrongQuestions = Math.ceil((plan.totalQuestions * plan.wrongRate) / 100);
  const reviewDailyTarget = plan.dailyQuestions * 0.8;
  const reviewDays = Math.ceil(wrongQuestions / reviewDailyTarget);

  // Calculate study phase end date (counting non-travel days)
  let studyPhaseEndDate = new Date(today);
  let studyDaysCount = 0;
  while (studyDaysCount < daysToFinishNew) {
    if (!isTravelWeek(studyPhaseEndDate)) {
      studyDaysCount++;
    }
    if (studyDaysCount < daysToFinishNew) {
      studyPhaseEndDate.setDate(studyPhaseEndDate.getDate() + 1);
    }
  }

  // Review starts after study phase ends
  const reviewStart = new Date(studyPhaseEndDate);
  reviewStart.setDate(reviewStart.getDate() + 1);

  // Final review starts after review phase ends
  const finalReviewStart = new Date(reviewStart);
  finalReviewStart.setDate(finalReviewStart.getDate() + reviewDays);

  const isTravelWeek = (date) => date >= travelStart && date <= travelEnd;
  const isFinalReview = (date) => date >= finalReviewStart && date < examDate;
  const isReviewPhase = (date) => date >= reviewStart && date < finalReviewStart;

  // Calculate remaining questions for each day with proper study + review phases
  const getQuestionsRemaining = (date) => {
    const newQuestionsRemaining = remaining;
    const totalWrong = Math.ceil((plan.totalQuestions * plan.wrongRate) / 100);

    // Calculate when study phase ends
    const daysToStudyAll = Math.ceil(newQuestionsRemaining / plan.dailyQuestions);
    const studyPhaseEndDate = new Date(today);
    studyPhaseEndDate.setDate(studyPhaseEndDate.getDate() + daysToStudyAll);

    // Calculate when review phase ends (before final review)
    const reviewDailyRate = plan.dailyQuestions * 0.8;
    const daysToReviewAll = Math.ceil(totalWrong / reviewDailyRate);
    const reviewPhaseEndDate = new Date(studyPhaseEndDate);
    reviewPhaseEndDate.setDate(reviewPhaseEndDate.getDate() + daysToReviewAll);

    // Count non-travel days from today to target date
    let progressDays = 0;
    let currentDay = new Date(today);
    while (currentDay < date && progressDays < 999) {
      if (!isTravelWeek(currentDay)) {
        progressDays++;
      }
      currentDay.setDate(currentDay.getDate() + 1);
    }

    if (date < today) return totalCompleted;

    // Study phase: decrease by daily goal each day
    if (date < studyPhaseEndDate) {
      return Math.max(0, newQuestionsRemaining - (progressDays * plan.dailyQuestions));
    }

    // Review phase: study phase done, now add wrong questions and decrease
    const reviewProgressDays = progressDays - daysToStudyAll;
    const wrongQuestionsRemaining = totalWrong - (reviewProgressDays * plan.dailyQuestions);
    return Math.max(0, wrongQuestionsRemaining);
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
              const isRecommendedDay = date.getTime() === recommendedExamDate.getTime();

              return (
                <div
                  key={dayIdx}
                  className={`calendar-day calendar-${status}`}
                  style={isRecommendedDay ? { borderWidth: '3px', borderStyle: 'dashed' } : {}}
                  title={isRecommendedDay ? 'Recommended exam date' : ''}
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

        <div style={{ marginBottom: '16px', fontSize: '12px', color: '#666' }}>
          <div style={{ marginBottom: '8px' }}>
            📅 <strong>Scheduled exam:</strong> {formatDate(examDate)}
          </div>
          <div>
            🎯 <strong>Recommended exam:</strong> {formatDate(recommendedExamDate)}
            {Math.abs(examDate - recommendedExamDate) > 86400000 && (
              <span style={{ color: examDate < recommendedExamDate ? '#c62828' : '#2e7d32', fontWeight: '600' }}>
                {' '}({examDate < recommendedExamDate ? 'Earlier than recommended' : 'Later than recommended'})
              </span>
            )}
          </div>
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
          <div className="legend-item">
            <div style={{ width: '16px', height: '16px', border: '3px dashed #d67c3b', borderRadius: '3px' }}></div>
            <span>Recommended Exam</span>
          </div>
        </div>
      </div>
    </div>
  );
}
