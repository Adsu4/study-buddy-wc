import React, { useState } from 'react';
import { Eye, Layers, ZoomIn } from 'lucide-react';

export default function DiagramViewer({ diagramType }) {
  const [activeViewMode, setActiveViewMode] = useState('vector'); // 'vector' or 'reference'

  switch (diagramType) {
    case 'evolution_timeline':
      return (
        <div className="diagram-card">
          <div className="diagram-header">
            <span className="diagram-tag">FIG 1.1</span>
            <span className="diagram-caption">Evolutionary Roadmap: 1G Analog to 5G Ultra-Connected</span>
          </div>
          <svg viewBox="0 0 760 160" className="diagram-svg">
            <defs>
              <linearGradient id="grad1G" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            <line x1="50" y1="80" x2="710" y2="80" stroke="var(--border-strong)" strokeWidth="4" />
            
            {/* 1G */}
            <circle cx="90" cy="80" r="24" fill="#64748b" />
            <text x="90" y="85" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="13">1G</text>
            <text x="90" y="45" textAnchor="middle" fill="currentColor" fontWeight="bold" fontSize="12">1980s (AMPS)</text>
            <text x="90" y="125" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">Analog FM • Voice</text>

            {/* 2G */}
            <circle cx="230" cy="80" r="24" fill="#3b82f6" />
            <text x="230" y="85" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="13">2G</text>
            <text x="230" y="45" textAnchor="middle" fill="currentColor" fontWeight="bold" fontSize="12">1990s (GSM)</text>
            <text x="230" y="125" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">Digital TDMA • SMS</text>

            {/* 3G */}
            <circle cx="380" cy="80" r="24" fill="#06b6d4" />
            <text x="380" y="85" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="13">3G</text>
            <text x="380" y="45" textAnchor="middle" fill="currentColor" fontWeight="bold" fontSize="12">2000s (UMTS)</text>
            <text x="380" y="125" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">W-CDMA • 2 Mbps</text>

            {/* 4G */}
            <circle cx="530" cy="80" r="24" fill="#10b981" />
            <text x="530" y="85" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="13">4G</text>
            <text x="530" y="45" textAnchor="middle" fill="currentColor" fontWeight="bold" fontSize="12">2010s (LTE)</text>
            <text x="530" y="125" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">OFDMA • All-IP • VoLTE</text>

            {/* 5G */}
            <circle cx="670" cy="80" r="26" fill="#f59e0b" stroke="#fbbf24" strokeWidth="3" />
            <text x="670" y="85" textAnchor="middle" fill="#000" fontWeight="bold" fontSize="13">5G</text>
            <text x="670" y="45" textAnchor="middle" fill="#f59e0b" fontWeight="bold" fontSize="12">2020s (NR)</text>
            <text x="670" y="125" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">eMBB • URLLC • mMTC</text>
          </svg>
        </div>
      );

    case 'fdd_vs_tdd':
      return (
        <div className="diagram-card">
          <div className="diagram-header">
            <span className="diagram-tag">FIG 1.2</span>
            <span className="diagram-caption">Duplexing Techniques: FDD (Frequency Separation) vs. TDD (Time Alternation)</span>
          </div>
          <svg viewBox="0 0 700 170" className="diagram-svg">
            <g transform="translate(30, 15)">
              <rect x="0" y="0" width="300" height="135" rx="8" fill="var(--bg-card)" stroke="var(--border-subtle)" strokeWidth="1.5" />
              <text x="150" y="24" textAnchor="middle" fontWeight="bold" fill="currentColor" fontSize="12">Frequency Division Duplexing (FDD)</text>
              <rect x="30" y="38" width="240" height="26" rx="4" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" />
              <text x="150" y="55" textAnchor="middle" fill="#3b82f6" fontWeight="bold" fontSize="11">Forward Link / Downlink (f_DL)</text>
              
              <text x="150" y="80" textAnchor="middle" fill="var(--text-muted)" fontSize="9.5" fontStyle="italic">Duplex Frequency Gap (e.g., 45 MHz in GSM)</text>
              
              <rect x="30" y="94" width="240" height="26" rx="4" fill="#10b981" fillOpacity="0.2" stroke="#10b981" />
              <text x="150" y="111" textAnchor="middle" fill="#10b981" fontWeight="bold" fontSize="11">Reverse Link / Uplink (f_UL)</text>
            </g>

            <g transform="translate(370, 15)">
              <rect x="0" y="0" width="300" height="135" rx="8" fill="var(--bg-card)" stroke="var(--border-subtle)" strokeWidth="1.5" />
              <text x="150" y="24" textAnchor="middle" fontWeight="bold" fill="currentColor" fontSize="12">Time Division Duplexing (TDD)</text>
              <text x="150" y="44" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Single Shared Carrier Frequency (f_0)</text>
              
              <rect x="25" y="60" width="55" height="40" rx="4" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" />
              <text x="52" y="85" textAnchor="middle" fill="#3b82f6" fontWeight="bold" fontSize="11">DL</text>

              <rect x="85" y="60" width="55" height="40" rx="4" fill="#10b981" fillOpacity="0.2" stroke="#10b981" />
              <text x="112" y="85" textAnchor="middle" fill="#10b981" fontWeight="bold" fontSize="11">UL</text>

              <rect x="145" y="60" width="55" height="40" rx="4" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" />
              <text x="172" y="85" textAnchor="middle" fill="#3b82f6" fontWeight="bold" fontSize="11">DL</text>

              <rect x="205" y="60" width="70" height="40" rx="4" fill="#10b981" fillOpacity="0.2" stroke="#10b981" />
              <text x="240" y="85" textAnchor="middle" fill="#10b981" fontWeight="bold" fontSize="11">UL</text>
              
              <text x="150" y="120" textAnchor="middle" fill="var(--text-muted)" fontSize="9.5">Time Axis → (Fast Slot Switching)</text>
            </g>
          </svg>
        </div>
      );

    case 'piconet_scatternet':
      return (
        <div className="diagram-card">
          <div className="diagram-header">
            <span className="diagram-tag">FIG 1.3</span>
            <span className="diagram-caption">Bluetooth Topology: Piconet (1 Master, 7 Slaves) & Interconnected Scatternet</span>
          </div>
          <svg viewBox="0 0 680 180" className="diagram-svg">
            <circle cx="160" cy="90" r="75" fill="var(--primary)" fillOpacity="0.08" stroke="var(--primary)" strokeDasharray="4 3" />
            <text x="160" y="30" textAnchor="middle" fill="var(--primary)" fontWeight="bold" fontSize="11">Piconet 1</text>
            <circle cx="160" cy="90" r="16" fill="var(--primary)" />
            <text x="160" y="95" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="11">M1</text>

            <circle cx="105" cy="60" r="11" fill="#64748b" />
            <text x="105" y="64" textAnchor="middle" fill="#fff" fontSize="9">S1</text>
            <line x1="160" y1="90" x2="105" y2="60" stroke="var(--border-strong)" />

            <circle cx="110" cy="120" r="11" fill="#64748b" />
            <text x="110" y="124" textAnchor="middle" fill="#fff" fontSize="9">S2</text>
            <line x1="160" y1="90" x2="110" y2="120" stroke="var(--border-strong)" />

            {/* Bridge Node */}
            <circle cx="340" cy="90" r="16" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
            <text x="340" y="94" textAnchor="middle" fill="#000" fontWeight="bold" fontSize="9">Bridge</text>
            <text x="340" y="120" textAnchor="middle" fill="#f59e0b" fontWeight="bold" fontSize="9.5">Slave in P1 / Master in P2</text>
            <line x1="160" y1="90" x2="340" y2="90" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />

            {/* Piconet 2 */}
            <circle cx="500" cy="90" r="75" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeDasharray="4 3" />
            <text x="500" y="30" textAnchor="middle" fill="#10b981" fontWeight="bold" fontSize="11">Piconet 2</text>
            <line x1="340" y1="90" x2="500" y2="90" stroke="#10b981" strokeWidth="2" />

            <circle cx="500" cy="90" r="16" fill="#10b981" />
            <text x="500" y="95" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="11">M2</text>

            <circle cx="550" cy="60" r="11" fill="#64748b" />
            <text x="550" y="64" textAnchor="middle" fill="#fff" fontSize="9">S3</text>
            <line x1="500" y1="90" x2="550" y2="60" stroke="var(--border-strong)" />

            <circle cx="555" cy="120" r="11" fill="#64748b" />
            <text x="555" y="124" textAnchor="middle" fill="#fff" fontSize="9">S4</text>
            <line x1="500" y1="90" x2="555" y2="120" stroke="var(--border-strong)" />
          </svg>
        </div>
      );

    case 'cluster_reuse_7':
      return (
        <div className="diagram-card">
          <div className="diagram-header">
            <span className="diagram-tag">FIG 2.1</span>
            <span className="diagram-caption">Cellular Frequency Reuse & Cluster Pattern (N=7) with Cell Splitting</span>
            <div className="diagram-view-toggle">
              <button
                className={`view-toggle-btn ${activeViewMode === 'reference' ? 'active' : ''}`}
                onClick={() => setActiveViewMode(activeViewMode === 'reference' ? 'vector' : 'reference')}
              >
                <Eye size={12} /> {activeViewMode === 'reference' ? 'Show Vector Schematic' : 'View Full Technical Diagram'}
              </button>
            </div>
          </div>

          {activeViewMode === 'reference' ? (
            <div className="diagram-img-frame">
              <img
                src="/images/cellular_reuse_cluster.jpg"
                alt="Cellular Frequency Reuse and Cell Splitting"
                className="diagram-full-image"
              />
              <span className="diagram-img-caption">Standard Technical Reference: 7-Cell Reuse Geometry and Microcell Splitting (Rappaport Figure 3.2 & 3.8)</span>
            </div>
          ) : (
            <svg viewBox="0 0 650 200" className="diagram-svg">
              <g transform="translate(180, 10)">
                <polygon points="120,60 145,45 170,60 170,90 145,105 120,90" fill="#3b82f6" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="2" />
                <text x="145" y="79" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="12">1</text>

                <polygon points="170,60 195,45 220,60 220,90 195,105 170,90" fill="var(--bg-card)" stroke="var(--border-strong)" />
                <text x="195" y="79" textAnchor="middle" fill="currentColor" fontSize="11">2</text>

                <polygon points="145,105 170,90 195,105 195,135 170,150 145,135" fill="var(--bg-card)" stroke="var(--border-strong)" />
                <text x="170" y="124" textAnchor="middle" fill="currentColor" fontSize="11">3</text>

                <polygon points="95,105 120,90 145,105 145,135 120,150 95,135" fill="var(--bg-card)" stroke="var(--border-strong)" />
                <text x="120" y="124" textAnchor="middle" fill="currentColor" fontSize="11">4</text>

                <polygon points="70,60 95,45 120,60 120,90 95,105 70,90" fill="var(--bg-card)" stroke="var(--border-strong)" />
                <text x="95" y="79" textAnchor="middle" fill="currentColor" fontSize="11">5</text>

                <polygon points="95,15 120,0 145,15 145,45 120,60 95,45" fill="var(--bg-card)" stroke="var(--border-strong)" />
                <text x="120" y="34" textAnchor="middle" fill="currentColor" fontSize="11">6</text>

                <polygon points="145,15 170,0 195,15 195,45 170,60 145,45" fill="var(--bg-card)" stroke="var(--border-strong)" />
                <text x="170" y="34" textAnchor="middle" fill="currentColor" fontSize="11">7</text>
              </g>

              <text x="40" y="90" fill="var(--primary)" fontWeight="bold" fontSize="12">Cluster N = 7</text>
              <text x="40" y="110" fill="var(--text-secondary)" fontSize="11">Total channels S partitioned into</text>
              <text x="40" y="128" fill="var(--text-secondary)" fontSize="11">7 disjoint sets (k = S/7)</text>

              <text x="480" y="90" fill="#10b981" fontWeight="bold" fontSize="12">Shift Parameters:</text>
              <text x="480" y="110" fill="var(--text-secondary)" fontSize="11">i = 2, j = 1</text>
              <text x="480" y="128" fill="var(--text-secondary)" fontSize="11">N = 2² + (2×1) + 1² = 7</text>
            </svg>
          )}
        </div>
      );

    case 'two_ray_geometry':
      return (
        <div className="diagram-card">
          <div className="diagram-header">
            <span className="diagram-tag">FIG 3.1</span>
            <span className="diagram-caption">Two-Ray Ground Reflection Multipath Geometry</span>
            <div className="diagram-view-toggle">
              <button
                className={`view-toggle-btn ${activeViewMode === 'reference' ? 'active' : ''}`}
                onClick={() => setActiveViewMode(activeViewMode === 'reference' ? 'vector' : 'reference')}
              >
                <Eye size={12} /> {activeViewMode === 'reference' ? 'Show Vector Schematic' : 'View Full Technical Diagram'}
              </button>
            </div>
          </div>

          {activeViewMode === 'reference' ? (
            <div className="diagram-img-frame">
              <img
                src="/images/two_ray_ground_model.jpg"
                alt="Two-Ray Ground Reflection Model"
                className="diagram-full-image"
              />
              <span className="diagram-img-caption">Standard Technical Reference: 2-Ray Ground Wave Path Difference and Destructive Cancellation (Rappaport Figure 4.7)</span>
            </div>
          ) : (
            <svg viewBox="0 0 720 180" className="diagram-svg">
              <line x1="30" y1="140" x2="690" y2="140" stroke="#64748b" strokeWidth="2.5" />
              <text x="360" y="160" textAnchor="middle" fill="var(--text-muted)" fontSize="11">Ground Plane (Reflection Coefficient Γ ≈ -1)</text>

              <line x1="100" y1="140" x2="100" y2="30" stroke="#3b82f6" strokeWidth="3.5" />
              <polygon points="92,30 100,18 108,30" fill="#3b82f6" />
              <text x="75" y="85" textAnchor="middle" fill="#3b82f6" fontWeight="bold" fontSize="12">ht</text>

              <line x1="620" y1="140" x2="620" y2="105" stroke="#10b981" strokeWidth="3" />
              <circle cx="620" cy="100" r="4.5" fill="#10b981" />
              <text x="645" y="125" textAnchor="middle" fill="#10b981" fontWeight="bold" fontSize="12">hr</text>

              <line x1="100" y1="28" x2="620" y2="100" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5 2" />
              <text x="330" y="55" textAnchor="middle" fill="#3b82f6" fontWeight="bold" fontSize="11">Direct LOS Ray (r0)</text>

              <polyline points="100,28 340,140 620,100" fill="none" stroke="#ef4444" strokeWidth="2" />
              <circle cx="340" cy="140" r="4" fill="#ef4444" />
              <text x="240" y="115" textAnchor="middle" fill="#ef4444" fontWeight="bold" fontSize="11">Ground-Reflected Ray (r1)</text>
            </svg>
          )}
        </div>
      );

    case 'knife_edge_diffraction':
      return (
        <div className="diagram-card">
          <div className="diagram-header">
            <span className="diagram-tag">FIG 3.2</span>
            <span className="diagram-caption">Knife-Edge Diffraction Geometry, Fresnel Zones & Shadow Zone</span>
          </div>
          <div className="diagram-img-frame">
            <img
              src="/images/knife_edge_diffraction.jpg"
              alt="Knife-Edge Diffraction and Fresnel Zones"
              className="diagram-full-image"
            />
            <span className="diagram-img-caption">Standard Technical Reference: Fresnel Zone Geometry & Diffraction Parameter ν (Rappaport Figure 4.13 & 4.14)</span>
          </div>
        </div>
      );

    case 'fading_classification':
      return (
        <div className="diagram-card">
          <div className="diagram-header">
            <span className="diagram-tag">FIG 3.3</span>
            <span className="diagram-caption">Small-Scale Fading Classification Matrix (Rappaport Figure 5.11)</span>
          </div>
          <svg viewBox="0 0 700 190" className="diagram-svg">
            <rect x="180" y="15" width="240" height="75" fill="var(--bg-card)" stroke="#3b82f6" strokeWidth="2" rx="6" />
            <text x="300" y="40" textAnchor="middle" fill="#3b82f6" fontWeight="bold" fontSize="12">Flat Fading</text>
            <text x="300" y="60" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Bs &lt;&lt; Bc  or  Ts &gt;&gt; στ</text>
            <text x="300" y="78" textAnchor="middle" fill="var(--text-muted)" fontSize="9">No ISI • Equalizer not needed</text>

            <rect x="440" y="15" width="240" height="75" fill="var(--bg-card)" stroke="#ef4444" strokeWidth="2" rx="6" />
            <text x="560" y="40" textAnchor="middle" fill="#ef4444" fontWeight="bold" fontSize="12">Frequency Selective Fading</text>
            <text x="560" y="60" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Bs &gt; Bc  or  Ts &lt; στ</text>
            <text x="560" y="78" textAnchor="middle" fill="var(--text-muted)" fontSize="9">Severe ISI • Requires OFDM/Equalizer</text>

            <rect x="180" y="100" width="240" height="75" fill="var(--bg-card)" stroke="#f59e0b" strokeWidth="2" rx="6" />
            <text x="300" y="125" textAnchor="middle" fill="#f59e0b" fontWeight="bold" fontSize="12">Fast Fading</text>
            <text x="300" y="145" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Tc &lt; Ts  or  BD &gt; Bs</text>
            <text x="300" y="163" textAnchor="middle" fill="var(--text-muted)" fontSize="9">Channel varies within symbol</text>

            <rect x="440" y="100" width="240" height="75" fill="var(--bg-card)" stroke="#10b981" strokeWidth="2" rx="6" />
            <text x="560" y="125" textAnchor="middle" fill="#10b981" fontWeight="bold" fontSize="12">Slow Fading</text>
            <text x="560" y="145" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Tc &gt;&gt; Ts  or  BD &lt;&lt; Bs</text>
            <text x="560" y="163" textAnchor="middle" fill="var(--text-muted)" fontSize="9">Channel static over many symbols</text>

            <text x="90" y="55" textAnchor="middle" fill="currentColor" fontWeight="bold" fontSize="11">Time Dispersion</text>
            <text x="90" y="70" textAnchor="middle" fill="var(--text-muted)" fontSize="10">(Delay Spread)</text>

            <text x="90" y="140" textAnchor="middle" fill="currentColor" fontWeight="bold" fontSize="11">Frequency Dispersion</text>
            <text x="90" y="155" textAnchor="middle" fill="var(--text-muted)" fontSize="10">(Doppler Spread)</text>
          </svg>
        </div>
      );

    case 'gsm_architecture':
      return (
        <div className="diagram-card">
          <div className="diagram-header">
            <span className="diagram-tag">FIG 4.1</span>
            <span className="diagram-caption">Complete GSM Network Architecture & Standard Telecommunications Interfaces</span>
            <div className="diagram-view-toggle">
              <button
                className={`view-toggle-btn ${activeViewMode === 'reference' ? 'active' : ''}`}
                onClick={() => setActiveViewMode(activeViewMode === 'reference' ? 'vector' : 'reference')}
              >
                <Eye size={12} /> {activeViewMode === 'reference' ? 'Show Vector Schematic' : 'View Full Technical Diagram'}
              </button>
            </div>
          </div>

          {activeViewMode === 'reference' ? (
            <div className="diagram-img-frame">
              <img
                src="/images/gsm_architecture_real.jpg"
                alt="GSM Network Architecture Reference"
                className="diagram-full-image"
              />
              <span className="diagram-img-caption">Standard Technical Reference: Base Station Subsystem (BSS) & Network Switching Subsystem (NSS) Architecture (Rappaport Figure 10.1)</span>
            </div>
          ) : (
            <svg viewBox="0 0 740 190" className="diagram-svg">
              <rect x="20" y="70" width="80" height="45" rx="6" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
              <text x="60" y="93" textAnchor="middle" fill="#3b82f6" fontWeight="bold" fontSize="10.5">MS (ME+SIM)</text>

              <line x1="100" y1="92" x2="160" y2="92" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
              <text x="130" y="82" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">Um (Radio)</text>

              <rect x="160" y="70" width="70" height="45" rx="6" fill="var(--bg-card)" stroke="var(--border-strong)" strokeWidth="1.5" />
              <text x="195" y="93" textAnchor="middle" fill="currentColor" fontWeight="bold" fontSize="11">BTS Tower</text>

              <line x1="230" y1="92" x2="280" y2="92" stroke="var(--border-strong)" strokeWidth="2" />
              <text x="255" y="82" textAnchor="middle" fill="var(--text-muted)" fontSize="9">Abis</text>

              <rect x="280" y="70" width="75" height="45" rx="6" fill="var(--bg-card)" stroke="var(--border-strong)" strokeWidth="1.5" />
              <text x="317" y="93" textAnchor="middle" fill="currentColor" fontWeight="bold" fontSize="11">BSC Cntlr</text>

              <line x1="355" y1="92" x2="410" y2="92" stroke="var(--border-strong)" strokeWidth="2" />
              <text x="382" y="82" textAnchor="middle" fill="var(--text-muted)" fontSize="9">A Interf</text>

              <rect x="410" y="60" width="85" height="65" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
              <text x="452" y="95" textAnchor="middle" fill="#10b981" fontWeight="bold" fontSize="11.5">MSC / VLR</text>

              <rect x="410" y="10" width="85" height="35" rx="6" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="452" y="32" textAnchor="middle" fill="#f59e0b" fontWeight="bold" fontSize="10.5">HLR / AUC</text>
              <line x1="452" y1="45" x2="452" y2="60" stroke="#f59e0b" strokeWidth="1.5" />

              <rect x="540" y="70" width="75" height="45" rx="6" fill="var(--bg-card)" stroke="var(--border-strong)" strokeWidth="1.5" />
              <text x="577" y="93" textAnchor="middle" fill="currentColor" fontWeight="bold" fontSize="11">GMSC</text>
              <line x1="495" y1="92" x2="540" y2="92" stroke="var(--border-strong)" strokeWidth="2" />

              <rect x="650" y="70" width="70" height="45" rx="6" fill="#64748b" fillOpacity="0.3" stroke="#64748b" strokeWidth="1.5" />
              <text x="685" y="93" textAnchor="middle" fill="currentColor" fontWeight="bold" fontSize="11">PSTN/ISDN</text>
              <line x1="615" y1="92" x2="650" y2="92" stroke="#64748b" strokeWidth="2" />

              <text x="250" y="145" textAnchor="middle" fill="var(--text-secondary)" fontSize="10.5" fontWeight="bold">← BSS (Base Station Subsystem) →</text>
              <text x="500" y="145" textAnchor="middle" fill="var(--text-secondary)" fontSize="10.5" fontWeight="bold">← NSS (Network & Switching Subsystem) →</text>
            </svg>
          )}
        </div>
      );

    case 'rts_cts_timeline':
      return (
        <div className="diagram-card">
          <div className="diagram-header">
            <span className="diagram-tag">FIG 4.2</span>
            <span className="diagram-caption">IEEE 802.11 CSMA/CA MAC Handshake: RTS, CTS & NAV Timeline</span>
          </div>
          <svg viewBox="0 0 720 160" className="diagram-svg">
            <text x="40" y="40" fill="currentColor" fontWeight="bold" fontSize="11">Station A:</text>
            <rect x="110" y="25" width="35" height="22" rx="3" fill="#64748b" />
            <text x="127" y="40" textAnchor="middle" fill="#fff" fontSize="9">DIFS</text>

            <rect x="150" y="20" width="45" height="28" rx="3" fill="#3b82f6" />
            <text x="172" y="38" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="10">RTS</text>

            <rect x="250" y="20" width="180" height="28" rx="3" fill="#10b981" />
            <text x="340" y="38" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="11">DATA FRAME TRANSMISSION</text>

            <text x="40" y="85" fill="currentColor" fontWeight="bold" fontSize="11">Access Point:</text>
            <rect x="200" y="70" width="45" height="26" rx="3" fill="#f59e0b" />
            <text x="222" y="87" textAnchor="middle" fill="#000" fontWeight="bold" fontSize="10">CTS</text>

            <rect x="435" y="70" width="45" height="26" rx="3" fill="#3b82f6" />
            <text x="457" y="87" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="10">ACK</text>

            <text x="40" y="130" fill="#ef4444" fontWeight="bold" fontSize="11">Hidden Node C:</text>
            <rect x="245" y="118" width="240" height="22" rx="4" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeDasharray="3 2" />
            <text x="365" y="133" textAnchor="middle" fill="#ef4444" fontWeight="bold" fontSize="9.5">NAV (Network Allocation Vector): Transmitter Stays Silent</text>

            <text x="197" y="16" fill="var(--text-muted)" fontSize="8">SIFS</text>
            <text x="247" y="16" fill="var(--text-muted)" fontSize="8">SIFS</text>
            <text x="432" y="16" fill="var(--text-muted)" fontSize="8">SIFS</text>
          </svg>
        </div>
      );

    default:
      return null;
  }
}
