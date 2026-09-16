import { useState, useEffect } from 'react';
import SharingCard from './components/SharingCard';
import ExamSummary from './components/ExamSummary';
import TodaySession from './components/TodaySession';
import DailyLogHistory from './components/DailyLogHistory';
import PlanSettings from './components/PlanSettings';
import Timeline from './components/Timeline';
import DailyAdvice from './components/DailyAdvice';
import MotivationalHospital from './components/MotivationalHospital';
import StudyCalendar from './components/StudyCalendar';
import CurrentRecommendation from './components/CurrentRecommendation';

const DEFAULT_PLAN = {
  examDate: '2026-11-08',
  totalQuestions: 1500,
  initialCompleted: 0,
  dailyQuestions: 80,
  wrongRate: 40,
  reviewBuffer: 0,
  finalReview: 7,
};

const DEFAULT_HISTORY = {};

export default function App() {
  const apiUrl = import.meta.env.VITE_API_URL || '';
  const [plan, setPlan] = useState(DEFAULT_PLAN);
  const [history, setHistory] = useState(DEFAULT_HISTORY);
  const [isShared, setIsShared] = useState(false);
  const [shareToken, setShareToken] = useState(null);
  const [syncStatus, setSyncStatus] = useState('saved');
  const [lastSync, setLastSync] = useState(Date.now());

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('share');
    if (token) {
      loadSharedPlanner(token);
    } else {
      loadLocalPlanner();
    }
  }, []);

  useEffect(() => {
    if (isShared && shareToken) {
      const timer = setInterval(() => {
        syncFromServer();
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isShared, shareToken]);

  const loadLocalPlanner = () => {
    const stored = localStorage.getItem('planner');
    if (stored) {
      const data = JSON.parse(stored);
      setPlan(data.plan || DEFAULT_PLAN);
      setHistory(data.history || DEFAULT_HISTORY);
    }
  };

  const loadSharedPlanner = async (token) => {
    setSyncStatus('loading');
    try {
      const res = await fetch(`${apiUrl}/api/planners/${token}`);
      if (!res.ok) throw new Error('Failed to load shared planner');
      const { data } = await res.json();
      setPlan(data.plan);
      setHistory(data.history);
      setIsShared(true);
      setShareToken(token);
      setSyncStatus('shared');
      setLastSync(Date.now());
    } catch (err) {
      console.error('Load error:', err);
      setSyncStatus('error');
    }
  };

  const saveLocal = (newPlan, newHistory) => {
    localStorage.setItem('planner', JSON.stringify({
      plan: newPlan,
      history: newHistory,
    }));
  };

  const syncToServer = async (newPlan, newHistory) => {
    if (!isShared || !shareToken) return;

    setSyncStatus('saving');
    try {
      const res = await fetch(`${apiUrl}/api/planners/${shareToken}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: { plan: newPlan, history: newHistory },
        }),
      });
      if (!res.ok) throw new Error('Sync failed');
      setSyncStatus('shared');
      setLastSync(Date.now());
    } catch (err) {
      console.error('Sync error:', err);
      setSyncStatus('error');
    }
  };

  const syncFromServer = async () => {
    if (!isShared || !shareToken) return;
    try {
      const res = await fetch(`${apiUrl}/api/planners/${shareToken}`);
      if (!res.ok) return;
      const { data, updatedAt } = await res.json();
      if (new Date(updatedAt).getTime() > lastSync) {
        setPlan(data.plan);
        setHistory(data.history);
        setLastSync(new Date(updatedAt).getTime());
      }
    } catch (err) {
      console.error('Pull error:', err);
    }
  };

  const updatePlan = (updates) => {
    const newPlan = { ...plan, ...updates };
    setPlan(newPlan);
    saveLocal(newPlan, history);
    if (isShared) {
      syncToServer(newPlan, history);
    }
  };

  const updateHistory = (newHistory) => {
    setHistory(newHistory);
    saveLocal(plan, newHistory);
    if (isShared) {
      syncToServer(plan, newHistory);
    }
  };

  const handleShare = async () => {
    setSyncStatus('saving');
    try {
      const res = await fetch(`${apiUrl}/api/planners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { plan, history } }),
      });
      if (!res.ok) throw new Error('Share failed');
      const { token } = await res.json();
      setShareToken(token);
      setIsShared(true);
      setSyncStatus('shared');
      setLastSync(Date.now());

      const shareUrl = `${window.location.origin}${window.location.pathname}?share=${token}`;
      if (navigator.share) {
        navigator.share({ title: 'USMLE Study Planner', url: shareUrl });
      } else {
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Share error:', err);
      setSyncStatus('error');
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="app-header">
          <h1>AbuRob USMLE Study Planner</h1>
        </div>

        <DailyAdvice plan={plan} history={history} />
        <MotivationalHospital />
        <ExamSummary plan={plan} history={history} />
        <CurrentRecommendation plan={plan} history={history} />
        <StudyCalendar plan={plan} history={history} />
        <TodaySession plan={plan} history={history} onUpdate={updateHistory} />
        <DailyLogHistory history={history} onUpdate={updateHistory} />

        <SharingCard
          isShared={isShared}
          syncStatus={syncStatus}
          onShare={handleShare}
        />

        <PlanSettings plan={plan} onUpdate={updatePlan} />
      </div>
    </div>
  );
}
