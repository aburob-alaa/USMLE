const ADVICE = [
  {
    title: "Question-Bank Day",
    text: "Turn misses into signals. For each wrong answer, identify the clue you missed and the rule that would change your answer next time. Write one takeaway per miss.",
  },
  {
    title: "Consistency Wins",
    text: "One day off the plan is not a failure. Adjust the next day and keep moving. The overall trend is what matters.",
  },
  {
    title: "Pattern Recognition",
    text: "After 500 questions, look for themes in your errors. Which concepts repeat? Which question types trip you up? Focus there.",
  },
  {
    title: "Active Recall",
    text: "Don't just read explanations. Cover the answer, predict, then check. The retrieval itself is the learning.",
  },
  {
    title: "Pace Yourself",
    text: "Fatigue kills. If you're making careless errors on questions you should know, stop. Rest is part of the study plan.",
  },
  {
    title: "Review Smarter",
    text: "On your second pass, don't redo every question. Focus on the 40% you got wrong. That's where your improvement lives.",
  },
  {
    title: "Final Sprint",
    text: "The last week is taper, not cramming. Review concepts, not new material. Trust that you know what you know.",
  },
];

export default function DailyAdvice({ plan, history }) {
  const today = new Date().toISOString().split('T')[0];
  const dayIndex = Math.floor(Math.random() * ADVICE.length);
  const advice = ADVICE[dayIndex];

  return (
    <div className="advice-card">
      <div className="advice-title">{advice.title}</div>
      <div className="advice-text">{advice.text}</div>
    </div>
  );
}
