import React, { useState, useMemo } from 'react';
import { Layers, CheckCircle2, AlertTriangle, Info, Zap, Sparkles, Navigation } from 'lucide-react';

export default function ClusterReuseSim() {
  const [iVal, setIVal] = useState(2);
  const [jVal, setJVal] = useState(1);
  const [pathLossN, setPathLossN] = useState(4);
  const [sectorType, setSectorType] = useState('omni'); // 'omni' (6 interferers), '120' (2 interferers), '60' (1 interferer)
  const [cellRadiusR, setCellRadiusR] = useState(2); // km
  const [hoveredCell, setHoveredCell] = useState(null);

  const N = iVal * iVal + iVal * jVal + jVal * jVal;
  const Q = Math.sqrt(3 * N);
  const D = cellRadiusR * Q;

  // Interferers count based on sectorization
  const interferersCount = sectorType === 'omni' ? 6 : sectorType === '120' ? 2 : 1;
  const siLinear = Math.pow(Q, pathLossN) / interferersCount;
  const siDb = 10 * Math.log10(siLinear);
  const isSafe = siDb >= 18.0;

  // Pre-generate a 37-cell hexagonal grid for the interactive visualizer
  // Axial coordinates (q, r) where q + r + s = 0, ring radius 3
  const hexGrid = useMemo(() => {
    const cells = [];
    const hexRadius = 24; // visual pixel radius
    const sqrt3 = Math.sqrt(3);

    for (let q = -3; q <= 3; q++) {
      const r1 = Math.max(-3, -q - 3);
      const r2 = Math.min(3, -q + 3);
      for (let r = r1; r <= r2; r++) {
        const x = 250 + hexRadius * (sqrt3 * q + (sqrt3 / 2) * r);
        const y = 145 + hexRadius * ((3 / 2) * r);
        cells.push({ q, r, x, y, id: `${q},${r}` });
      }
    }
    return cells;
  }, []);

  // Compute the 6 co-channel offsets for given (i, j)
  // In axial coordinates, 6 basis directions are:
  // d0: (+1, 0), d1: (0, +1), d2: (-1, +1), d3: (-1, 0), d4: (0, -1), d5: (+1, -1)
  const coChannelCoords = useMemo(() => {
    const directions = [
      { q: 1, r: 0 },
      { q: 0, r: 1 },
      { q: -1, r: 1 },
      { q: -1, r: 0 },
      { q: 0, r: -1 },
      { q: 1, r: -1 }
    ];

    return directions.map((dir, idx) => {
      // Step i in dir, turn 60 deg left (next direction in CCW order), step j
      const leftDir = directions[(idx + 1) % 6];
      const targetQ = iVal * dir.q + jVal * leftDir.q;
      const targetR = iVal * dir.r + jVal * leftDir.r;
      return { q: targetQ, r: targetR, id: `${targetQ},${targetR}` };
    });
  }, [iVal, jVal]);

  const coChannelIds = useMemo(() => new Set(coChannelCoords.map(c => c.id)), [coChannelCoords]);

  // Points of a regular flat-topped/pointy-topped hexagon
  function getHexPoints(cx, cy, r) {
    const points = [];
    for (let k = 0; k < 6; k++) {
      const angle = (Math.PI / 180) * (60 * k - 30);
      points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
    }
    return points.join(' ');
  }

  return (
    <div className="interactive-widget-box">
      <div className="widget-header">
        <div className="widget-title-group">
          <Layers className="widget-icon" />
          <div>
            <h4 className="widget-heading">Cellular Frequency Reuse & Cluster Size Visualizer</h4>
            <p className="widget-subheading">
              Interactive 37-cell hexagonal lattice: Observe exact co-channel cell locations, reuse ratio Q = √(3N), and S/I calculations
            </p>
          </div>
        </div>
      </div>

      <div className="sim-controls-grid">
        <div className="control-group">
          <label>Shift Parameter <strong>i</strong>: <span className="val-badge">{iVal}</span></label>
          <input
            type="range"
            min="1"
            max="3"
            step="1"
            value={iVal}
            onChange={(e) => setIVal(parseInt(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>Shift Parameter <strong>j</strong>: <span className="val-badge">{jVal}</span></label>
          <input
            type="range"
            min="0"
            max="2"
            step="1"
            value={jVal}
            onChange={(e) => setJVal(parseInt(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>Antenna Configuration: <span className="val-badge">{sectorType === 'omni' ? 'Omni (360°)' : sectorType === '120' ? '120° Sector (3 Sectors)' : '60° Sector (6 Sectors)'}</span></label>
          <div className="segmented-btns">
            <button
              className={sectorType === 'omni' ? 'active' : ''}
              onClick={() => setSectorType('omni')}
            >
              Omni (6 Intf)
            </button>
            <button
              className={sectorType === '120' ? 'active' : ''}
              onClick={() => setSectorType('120')}
            >
              120° (2 Intf)
            </button>
            <button
              className={sectorType === '60' ? 'active' : ''}
              onClick={() => setSectorType('60')}
            >
              60° (1 Intf)
            </button>
          </div>
        </div>

        <div className="control-group">
          <label>Path Loss Exponent <strong>n</strong>: <span className="val-badge">n = {pathLossN}</span></label>
          <div className="segmented-btns">
            {[3, 3.5, 4, 4.5].map((val) => (
              <button
                key={val}
                className={pathLossN === val ? 'active' : ''}
                onClick={() => setPathLossN(val)}
              >
                n={val}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Math Output Cards */}
      <div className="metrics-row">
        <div className="metric-card primary">
          <div className="metric-label">Cluster Size (N)</div>
          <div className="metric-val">{N}</div>
          <div className="metric-desc">{iVal}² + ({iVal}×{jVal}) + {jVal}²</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Reuse Ratio (Q = D/R)</div>
          <div className="metric-val">{Q.toFixed(2)}</div>
          <div className="metric-desc">√(3 × {N})</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Interferers Count</div>
          <div className="metric-val">{interferersCount}</div>
          <div className="metric-desc">{sectorType === 'omni' ? 'Omni first-tier' : `${sectorType}° sectoring`}</div>
        </div>

        <div className={`metric-card ${isSafe ? 'success' : 'danger'}`}>
          <div className="metric-label">Worst-case S/I (1st tier)</div>
          <div className="metric-val">{siDb.toFixed(2)} dB</div>
          <div className="metric-desc">
            {isSafe ? (
              <span className="safe-tag"><CheckCircle2 size={13} /> ≥ 18 dB Target Satisfied</span>
            ) : (
              <span className="danger-tag"><AlertTriangle size={13} /> &lt; 18 dB Voice Degradation</span>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Hexagonal Lattice Visualizer */}
      <div className="hex-visualizer-container">
        <svg viewBox="0 0 500 290" className="hex-svg">
          <defs>
            <radialGradient id="centerCellGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4285f4" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.4" />
            </radialGradient>
            <radialGradient id="coChannelGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.4" />
            </radialGradient>
          </defs>

          {/* Render all 37 hexagonal cells */}
          {hexGrid.map((cell) => {
            const isCenter = cell.q === 0 && cell.r === 0;
            const isCoChannel = coChannelIds.has(cell.id);
            const isHovered = hoveredCell === cell.id;

            let fillColor = 'var(--bg-card)';
            let strokeColor = 'var(--border-subtle)';
            let strokeWidth = 1.2;

            if (isCenter) {
              fillColor = 'url(#centerCellGrad)';
              strokeColor = '#4285f4';
              strokeWidth = 2.5;
            } else if (isCoChannel) {
              fillColor = 'url(#coChannelGrad)';
              strokeColor = '#ef4444';
              strokeWidth = 2.5;
            } else if (isHovered) {
              fillColor = 'var(--bg-hover)';
              strokeColor = 'var(--border-strong)';
            }

            return (
              <g
                key={cell.id}
                onMouseEnter={() => setHoveredCell(cell.id)}
                onMouseLeave={() => setHoveredCell(null)}
                style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
              >
                <polygon
                  points={getHexPoints(cell.x, cell.y, 23)}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                />
                <text
                  x={cell.x}
                  y={cell.y + 4}
                  textAnchor="middle"
                  fill={isCenter || isCoChannel ? '#ffffff' : 'var(--text-muted)'}
                  fontSize={isCenter || isCoChannel ? 11 : 9}
                  fontWeight={isCenter || isCoChannel ? 'bold' : 'normal'}
                >
                  {isCenter ? 'A0' : isCoChannel ? 'A' : ''}
                </text>
              </g>
            );
          })}

          {/* Vector Guide Arrow showing i-step and j-step for the first co-channel cell */}
          {(() => {
            const firstCo = coChannelCoords[0];
            const targetCell = hexGrid.find(c => c.q === firstCo.q && c.r === firstCo.r);
            if (!targetCell) return null;
            return (
              <g>
                <line
                  x1="250"
                  y1="145"
                  x2={targetCell.x}
                  y2={targetCell.y}
                  stroke="#fbbf24"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <circle cx={targetCell.x} cy={targetCell.y} r="4" fill="#fbbf24" />
                <text
                  x={(250 + targetCell.x) / 2}
                  y={(145 + targetCell.y) / 2 - 8}
                  fill="#fbbf24"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  D = R√(3×{N})
                </text>
              </g>
            );
          })()}
        </svg>

        <div className="hex-explanation-footer">
          <Info size={15} className="info-icon" />
          <span>
            <strong>Lattice Analysis:</strong> With shift parameters <strong>i={iVal}, j={jVal}</strong>, cluster size is <strong>N={N}</strong>. 
            The 6 co-channel interferers (red cells labeled <strong>A</strong>) are spaced at distance <strong>D = {D.toFixed(1)} km</strong> from serving cell <strong>A0</strong>.
            {isSafe ? (
              <> Under <strong>{sectorType === 'omni' ? 'omni' : `${sectorType}° sectoring`}</strong>, the worst-case S/I is <strong>{siDb.toFixed(1)} dB</strong>, surpassing the 18 dB threshold.</>
            ) : (
              <> With omni antennas, S/I is only <strong>{siDb.toFixed(1)} dB</strong> (&lt; 18 dB). Switch to <strong>120° sectoring</strong> above to observe how cutting interferers from 6 to 2 boosts S/I to <strong>{(siDb + 4.77).toFixed(1)} dB</strong>!</>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
