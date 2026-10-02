import React, { useState } from 'react';
import { Activity, Zap, Check, AlertCircle, ArrowRight } from 'lucide-react';

export default function ErlangCalculator() {
  const [channelsC, setChannelsC] = useState(20);
  const [callRateLambda, setCallRateLambda] = useState(300); // calls per hour
  const [holdingTimeH, setHoldingTimeH] = useState(120); // seconds

  // Holding time in hours
  const hHours = holdingTimeH / 3600;
  // Total offered traffic A = lambda * H (in Erlangs)
  const A = callRateLambda * hHours;

  // Stable Erlang B recurrence:
  // B(0, A) = 1
  // B(k, A) = [A * B(k-1, A)] / [k + A * B(k-1, A)]
  function calculateErlangB(c, a) {
    let b = 1.0;
    for (let k = 1; k <= c; k++) {
      b = (a * b) / (k + a * b);
    }
    return b;
  }

  const blockingProb = calculateErlangB(channelsC, A);
  const blockingPercent = blockingProb * 100;
  const carriedTraffic = A * (1 - blockingProb);
  const trunkingEfficiency = carriedTraffic / channelsC;

  let gosStatus = { label: "Excellent (GoS < 1%)", color: "success" };
  if (blockingPercent > 5) {
    gosStatus = { label: "Severe Congestion (> 5%)", color: "danger" };
  } else if (blockingPercent > 2) {
    gosStatus = { label: "Marginal / Busy (2 - 5%)", color: "warning" };
  } else if (blockingPercent > 1) {
    gosStatus = { label: "Standard Commercial (1 - 2%)", color: "normal" };
  }

  return (
    <div className="interactive-widget-box">
      <div className="widget-header">
        <div className="widget-title-group">
          <Activity className="widget-icon" />
          <div>
            <h4 className="widget-heading">Trunking & Erlang B Grade of Service (GoS) Calculator</h4>
            <p className="widget-subheading">Compute call blocking probability $P_b$ and trunking efficiency for Blocked Calls Cleared (BCC)</p>
          </div>
        </div>
      </div>

      <div className="sim-controls-grid">
        <div className="control-group">
          <label>Trunked Channels (<strong>C</strong>): <span className="val-badge">{channelsC} channels</span></label>
          <input
            type="range"
            min="1"
            max="60"
            step="1"
            value={channelsC}
            onChange={(e) => setChannelsC(parseInt(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>Call Arrival Rate (<strong>λ</strong>): <span className="val-badge">{callRateLambda} calls/hr</span></label>
          <input
            type="range"
            min="50"
            max="1200"
            step="25"
            value={callRateLambda}
            onChange={(e) => setCallRateLambda(parseInt(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>Average Call Duration (<strong>H</strong>): <span className="val-badge">{holdingTimeH} sec ({hHours.toFixed(2)} hr)</span></label>
          <input
            type="range"
            min="30"
            max="300"
            step="15"
            value={holdingTimeH}
            onChange={(e) => setHoldingTimeH(parseInt(e.target.value))}
          />
        </div>
      </div>

      {/* Real-time Math Output Cards */}
      <div className="metrics-row">
        <div className="metric-card primary">
          <div className="metric-label">Offered Traffic (A = λH)</div>
          <div className="metric-val">{A.toFixed(2)} Erlangs</div>
          <div className="metric-desc">{callRateLambda} × ({holdingTimeH}/3600)</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Carried Traffic (Ac)</div>
          <div className="metric-val">{carriedTraffic.toFixed(2)} Erlangs</div>
          <div className="metric-desc">A × (1 - Pb)</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Trunking Efficiency</div>
          <div className="metric-val">{(trunkingEfficiency * 100).toFixed(1)}%</div>
          <div className="metric-desc">{(carriedTraffic / channelsC).toFixed(2)} Erlangs/channel</div>
        </div>

        <div className={`metric-card ${gosStatus.color}`}>
          <div className="metric-label">Blocking Probability (GoS)</div>
          <div className="metric-val">{blockingPercent.toFixed(2)}%</div>
          <div className="metric-desc">{gosStatus.label}</div>
        </div>
      </div>

      {/* Erlang Capacity Bar & Formula Note */}
      <div className="erlang-gauge-wrapper">
        <div className="gauge-label-bar">
          <span>Channel Utilization (Carried vs Blocked)</span>
          <span>{carriedTraffic.toFixed(1)} / {channelsC} channels busy</span>
        </div>
        <div className="gauge-track">
          <div 
            className="gauge-fill carried" 
            style={{ width: `${Math.min(100, (carriedTraffic / channelsC) * 100)}%` }} 
          />
          <div 
            className="gauge-fill blocked" 
            style={{ width: `${Math.min(100, (blockingProb) * 100)}%` }} 
          />
        </div>
        <div className="gauge-legend">
          <span className="legend-item"><span className="legend-dot green"></span> Successfully Carried Traffic</span>
          <span className="legend-item"><span className="legend-dot red"></span> Blocked Calls (Grade of Service)</span>
        </div>
      </div>
    </div>
  );
}
