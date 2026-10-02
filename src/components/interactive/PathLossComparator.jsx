import React, { useState, useMemo } from 'react';
import { Radio, Compass, TrendingDown, Info, Sliders, Crosshair } from 'lucide-react';

export default function PathLossComparator() {
  const [ht, setHt] = useState(50); // BS height in meters
  const [hr, setHr] = useState(1.5); // MS height in meters
  const [fc, setFc] = useState(900); // Frequency in MHz
  const [ptWatt, setPtWatt] = useState(20); // 20 W BS transmit power
  const [scrubberX, setScrubberX] = useState(2000); // interactive distance in meters

  const c = 3e8;
  const lambda = c / (fc * 1e6); // wavelength in meters
  const dc = (4 * Math.PI * ht * hr) / lambda; // cross-over distance in meters
  const dcKm = dc / 1000;

  function calcPrFreeSpace(d) {
    const prWatts = (ptWatt * Math.pow(lambda, 2)) / (Math.pow(4 * Math.PI, 2) * Math.pow(d, 2));
    return 10 * Math.log10(prWatts * 1000);
  }

  function calcPrTwoRay(d) {
    if (d < dc) {
      return calcPrFreeSpace(d);
    }
    const prWatts = (ptWatt * Math.pow(ht, 2) * Math.pow(hr, 2)) / Math.pow(d, 4);
    return 10 * Math.log10(prWatts * 1000);
  }

  // Generate 50 points for a smooth SVG chart (log distance from 100m to 10,000m)
  const chartPoints = useMemo(() => {
    const points = [];
    const minD = 100;
    const maxD = 10000;
    const minPower = -120; // dBm
    const maxPower = -20; // dBm

    for (let i = 0; i <= 40; i++) {
      const frac = i / 40;
      // Logarithmic spacing
      const d = minD * Math.pow(maxD / minD, frac);
      const fs = calcPrFreeSpace(d);
      const tr = calcPrTwoRay(d);

      // SVG map: x from 40 to 460, y from 160 (minPower) to 20 (maxPower)
      const x = 40 + frac * 420;
      const yFs = 160 - ((fs - minPower) / (maxPower - minPower)) * 140;
      const yTr = 160 - ((tr - minPower) / (maxPower - minPower)) * 140;

      points.push({ d, x, yFs, yTr, fs, tr });
    }
    return points;
  }, [ht, hr, fc, ptWatt, dc]);

  // Compute SVG x coordinate for cross-over distance dc
  const minD = 100;
  const maxD = 10000;
  const dcFrac = Math.max(0, Math.min(1, Math.log(dc / minD) / Math.log(maxD / minD)));
  const dcSvgX = 40 + dcFrac * 420;

  // Compute scrubber values
  const scrubberFrac = Math.max(0, Math.min(1, Math.log(scrubberX / minD) / Math.log(maxD / minD)));
  const scrubberSvgX = 40 + scrubberFrac * 420;
  const scrubberFs = calcPrFreeSpace(scrubberX);
  const scrubberTr = calcPrTwoRay(scrubberX);

  const pathFs = chartPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.yFs}`).join(' ');
  const pathTr = chartPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.yTr}`).join(' ');

  const distancesSample = [100, 500, 1000, 2000, 3000, 5000, 10000];

  return (
    <div className="interactive-widget-box">
      <div className="widget-header">
        <div className="widget-title-group">
          <Radio className="widget-icon" />
          <div>
            <h4 className="widget-heading">Friis Free Space vs. 2-Ray Ground Model Interactive Curve</h4>
            <p className="widget-subheading">
              Dynamic cross-over transition: Watch the curve slope steepen from 20 dB/decade (LOS) to 40 dB/decade (destructive ground reflection) at cross-over distance dc = (4π·ht·hr)/λ
            </p>
          </div>
        </div>
      </div>

      <div className="sim-controls-grid">
        <div className="control-group">
          <label>Base Station Height (<strong>ht</strong>): <span className="val-badge">{ht} m</span></label>
          <input
            type="range"
            min="20"
            max="100"
            step="5"
            value={ht}
            onChange={(e) => setHt(parseFloat(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>Mobile Height (<strong>hr</strong>): <span className="val-badge">{hr} m</span></label>
          <input
            type="range"
            min="1.0"
            max="3.0"
            step="0.5"
            value={hr}
            onChange={(e) => setHr(parseFloat(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>Carrier Frequency (<strong>fc</strong>): <span className="val-badge">{fc} MHz</span></label>
          <div className="segmented-btns">
            {[450, 900, 1800, 2400].map((f) => (
              <button
                key={f}
                className={fc === f ? 'active' : ''}
                onClick={() => setFc(f)}
              >
                {f} MHz
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <label>Inspect Distance (<strong>d</strong>): <span className="val-badge">{scrubberX >= 1000 ? `${(scrubberX / 1000).toFixed(1)} km` : `${scrubberX} m`}</span></label>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={scrubberX}
            onChange={(e) => setScrubberX(parseFloat(e.target.value))}
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="metrics-row">
        <div className="metric-card primary">
          <div className="metric-label">Carrier Wavelength (λ)</div>
          <div className="metric-val">{(lambda * 100).toFixed(1)} cm</div>
          <div className="metric-desc">c / {fc} MHz</div>
        </div>

        <div className="metric-card warning">
          <div className="metric-label">Cross-Over Distance (dc)</div>
          <div className="metric-val">{dcKm.toFixed(2)} km</div>
          <div className="metric-desc">4π × {ht} × {hr} / {lambda.toFixed(2)}m</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Pr @ {scrubberX >= 1000 ? `${(scrubberX / 1000).toFixed(1)} km` : `${scrubberX}m`} (Free Space)</div>
          <div className="metric-val">{scrubberFs.toFixed(1)} dBm</div>
          <div className="metric-desc">20 dB/decade slope</div>
        </div>

        <div className={`metric-card ${scrubberX > dc ? 'danger' : 'success'}`}>
          <div className="metric-label">Pr @ {scrubberX >= 1000 ? `${(scrubberX / 1000).toFixed(1)} km` : `${scrubberX}m`} (2-Ray)</div>
          <div className="metric-val">{scrubberTr.toFixed(1)} dBm</div>
          <div className="metric-desc">
            {scrubberX > dc ? (
              <span className="danger-tag">Destructive Phase Cancel (1/d⁴)</span>
            ) : (
              <span className="safe-tag">Near-field Free Space (1/d²)</span>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Interactive SVG Chart */}
      <div className="hex-visualizer-container">
        <svg viewBox="0 0 500 200" className="hex-svg">
          {/* Grid lines */}
          <line x1="40" y1="20" x2="40" y2="160" stroke="var(--border-strong)" strokeWidth="1" />
          <line x1="40" y1="160" x2="460" y2="160" stroke="var(--border-strong)" strokeWidth="1" />

          {/* Y Axis Labels */}
          <text x="32" y="25" fill="var(--text-muted)" fontSize="9" textAnchor="end">-20</text>
          <text x="32" y="95" fill="var(--text-muted)" fontSize="9" textAnchor="end">-70</text>
          <text x="32" y="163" fill="var(--text-muted)" fontSize="9" textAnchor="end">-120 dBm</text>

          {/* X Axis Labels */}
          <text x="40" y="178" fill="var(--text-muted)" fontSize="9" textAnchor="middle">100m</text>
          <text x="180" y="178" fill="var(--text-muted)" fontSize="9" textAnchor="middle">500m</text>
          <text x="250" y="178" fill="var(--text-muted)" fontSize="9" textAnchor="middle">1 km</text>
          <text x="340" y="178" fill="var(--text-muted)" fontSize="9" textAnchor="middle">3 km</text>
          <text x="460" y="178" fill="var(--text-muted)" fontSize="9" textAnchor="middle">10 km</text>

          {/* Curves */}
          <path d={pathFs} fill="none" stroke="#4285f4" strokeWidth="2.5" />
          <path d={pathTr} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="5 2" />

          {/* Vertical Cross-over distance line (dc) */}
          {dcSvgX >= 40 && dcSvgX <= 460 && (
            <g>
              <line
                x1={dcSvgX}
                y1="20"
                x2={dcSvgX}
                y2="160"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
              <text x={dcSvgX} y="15" fill="#f59e0b" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                dc = {dcKm.toFixed(2)} km
              </text>
            </g>
          )}

          {/* Interactive Distance Scrubber */}
          <line
            x1={scrubberSvgX}
            y1="20"
            x2={scrubberSvgX}
            y2="160"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <circle cx={scrubberSvgX} cy={160 - ((scrubberFs - (-120)) / (100)) * 140} r="4" fill="#4285f4" />
          <circle cx={scrubberSvgX} cy={160 - ((scrubberTr - (-120)) / (100)) * 140} r="4" fill="#ef4444" />
        </svg>

        <div className="gauge-legend" style={{ justifyContent: 'center', marginTop: '0.75rem' }}>
          <span className="legend-item"><span className="legend-dot" style={{ backgroundColor: '#4285f4' }} /> Free Space Friis (20 dB/dec)</span>
          <span className="legend-item"><span className="legend-dot" style={{ backgroundColor: '#ef4444' }} /> 2-Ray Ground Model (40 dB/dec)</span>
          <span className="legend-item"><span className="legend-dot" style={{ backgroundColor: '#f59e0b' }} /> Cross-over Distance dc</span>
        </div>

        <div className="hex-explanation-footer">
          <Info size={15} className="info-icon" />
          <span>
            <strong>Physical Meaning:</strong> When $d &lt; d_c$ ({dcKm.toFixed(2)} km), the direct wave dominates and path loss follows the standard $1/d^2$ law. 
            Beyond $d_c$, the ground-reflected ray arrives almost $180^\circ$ out of phase with the direct ray, causing destructive wave cancellation that drops signal power by <strong>$1/d^4$ (40 dB per decade)</strong>!
          </span>
        </div>
      </div>
    </div>
  );
}
