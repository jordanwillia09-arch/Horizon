* { box-sizing: border-box; }
:root { color-scheme: dark; }
body {
  margin: 0; min-height: 100vh; color: #e4e8ff;
  background: radial-gradient(ellipse at 50% 15%, #182347 0%, #0b1024 42%, #050711 100%);
  font-family: 'Press Start 2P', monospace;
  overflow-x: hidden;
}
body::before {
  content: ""; position: fixed; inset: 0; pointer-events: none; opacity: .45;
  background-image: radial-gradient(1px 1px at 12% 18%, #fff 99%, transparent),
    radial-gradient(1px 1px at 76% 12%, #fff 99%, transparent),
    radial-gradient(1px 1px at 42% 62%, #a9c9ff 99%, transparent),
    radial-gradient(2px 2px at 88% 76%, #fff 99%, transparent),
    radial-gradient(1px 1px at 22% 84%, #fff 99%, transparent);
  background-size: 230px 230px;
}
.page-shell { width: min(760px, calc(100% - 32px)); margin: 0 auto; min-height: 100vh; padding: 26px 0 22px; display: flex; flex-direction: column; position: relative; }
.topline { display: flex; justify-content: space-between; align-items: center; gap: 12px; color: #8295c7; font-size: 9px; }
.back-link { color: #a9c9ff; text-decoration: none; }
.back-link:hover { color: white; }
.panel { width: 100%; margin: auto; padding: clamp(24px, 6vw, 54px); text-align: center; border: 1px solid #35466f; background: rgba(9, 14, 34, .88); box-shadow: 0 0 50px rgba(58, 104, 190, .12), inset 0 0 28px rgba(58, 104, 190, .05); }
.hidden { display: none !important; }
.eyebrow, .category { color: #7e9edb; font-size: 9px; letter-spacing: 1px; line-height: 1.8; }
h1 { color: #c5d9ff; font-size: clamp(27px, 6vw, 48px); line-height: 1.55; letter-spacing: 3px; margin: 24px 0; text-shadow: 0 0 22px rgba(111, 160, 255, .35); }
.subtitle { color: #a8b7d9; font-size: 10px; line-height: 2.2; }
.rules { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 34px 0; padding: 20px 0; border-top: 1px solid #28395f; border-bottom: 1px solid #28395f; }
.rules div { display: flex; flex-direction: column; gap: 12px; }
.rules span { color: #c5d9ff; font-size: 17px; }
.rules small { color: #7184b0; font-size: 7px; }
.howto { color: #8798bf; font: 11px/2 Arial, sans-serif; max-width: 470px; margin: 0 auto 28px; }
.primary-btn { display: inline-block; border: 1px solid #779bdc; background: #1a2b50; color: #d9e7ff; padding: 17px 20px; font: 9px 'Press Start 2P', monospace; cursor: pointer; text-decoration: none; transition: .18s ease; }
.primary-btn:hover { background: #294574; box-shadow: 0 0 20px rgba(111, 160, 255, .2); transform: translateY(-1px); }
.game-panel { text-align: left; }
.game-stats { display: flex; justify-content: space-between; gap: 10px; color: #788dbb; font-size: 8px; }
.game-stats strong { display: block; color: #c5d9ff; margin-top: 10px; font-size: 11px; }
.progress-track { height: 5px; margin: 20px 0 35px; background: #1d2945; }
#progress-fill { width: 0; height: 100%; background: #86aef4; transition: width .3s ease; }
.question-card { text-align: center; }
.category { margin-bottom: 22px; }
.question-card h2 { color: #d9e5ff; font-size: clamp(14px, 3vw, 19px); line-height: 2; margin: 0 auto 12px; max-width: 570px; }
.unit-hint { color: #8294bd; font: 12px Arial, sans-serif; margin: 0 0 28px; }
.question-card label { display: block; color: #8da5d5; font-size: 8px; margin-bottom: 13px; }
.input-row { display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 22px; }
input { width: min(360px, 75%); padding: 16px; color: #e4e8ff; background: #080d1d; border: 1px solid #435b8d; outline: none; text-align: center; font: 15px 'Press Start 2P', monospace; }
input:focus { border-color: #a9c9ff; box-shadow: 0 0 15px rgba(111,160,255,.15); }
.unit-suffix { color: #9aabd0; font: 12px Arial, sans-serif; }
.error-message { min-height: 18px; color: #ff9d9d; font: 12px Arial, sans-serif; }
.feedback { text-align: center; border-top: 1px solid #28395f; padding-top: 26px; margin-top: 10px; }
.feedback-title { color: #9fc1ff; font-size: 10px; }
.feedback p { color: #a8b7d9; font: 13px/1.7 Arial, sans-serif; }
.points-earned { color: #b8d1ff; font-size: 26px; margin: 18px 0 24px; }
.results-panel h1 { margin-bottom: 12px; }
.final-score { color: #c5d9ff; font-size: clamp(32px, 7vw, 54px); margin: 24px 0 8px; }
.final-score small { display: block; color: #8195c3; font-size: 8px; margin-top: 12px; }
.answer-review { text-align: left; margin: 30px auto; max-width: 560px; }
.review-row { padding: 13px 0; border-top: 1px solid #263657; display: grid; grid-template-columns: 1fr auto; gap: 10px; font: 11px/1.6 Arial, sans-serif; color: #a8b7d9; }
.review-row strong { color: #d4e2ff; text-align: right; }
.return-link { margin-top: 8px; }
footer { text-align: center; color: #53658e; font-size: 7px; line-height: 2; padding-top: 20px; }
@media (max-width: 520px) {
  .topline { font-size: 7px; }
  .rules span { font-size: 13px; }
  .rules small { font-size: 6px; }
  .primary-btn { font-size: 8px; padding: 15px 12px; }
  .game-stats { font-size: 7px; }
  input { font-size: 11px; }
}
