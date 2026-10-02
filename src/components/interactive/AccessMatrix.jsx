import React, { useState } from 'react';
import { Filter, Check, X, Shield, Cpu, Zap, Signal } from 'lucide-react';

export default function AccessMatrix() {
  const [selectedObjective, setSelectedObjective] = useState('all');

  const technologies = [
    {
      name: "FDMA (Frequency Division)",
      standard: "1G AMPS, CT2",
      reuse: "N ≥ 7 (Strict clustering)",
      isiResilience: "High (Narrowband symbol duration >> delay spread)",
      powerControl: "Moderate",
      duplexing: "FDD with costly RF duplexer",
      burstyData: "Poor (Continuous static channel)",
      idealFor: "Dedicated analog voice calls",
      summary: "Splits spectrum into frequency slices. Each user gets a continuous private carrier frequency."
    },
    {
      name: "TDMA (Time Division)",
      standard: "2G GSM, IS-136",
      reuse: "N = 4 or 7",
      isiResilience: "Moderate (Requires adaptive equalizer)",
      powerControl: "Moderate",
      duplexing: "TDD or non-simultaneous FDD (No duplexer needed)",
      burstyData: "Fair (Fixed slots)",
      idealFor: "Digital cellular voice + light data (SMS)",
      summary: "Users share the same frequency, but transmit in sequential time slots within a repeating frame."
    },
    {
      name: "CDMA (Code Division)",
      standard: "3G UMTS, IS-95",
      reuse: "N = 1 (Universal frequency reuse)",
      isiResilience: "High (Rake receiver resolves multipath echoes)",
      powerControl: "Extremely Critical (Near-Far problem)",
      duplexing: "FDD or TDD",
      burstyData: "Good (Variable spreading factors)",
      idealFor: "High-capacity cellular voice & mobile 3G broadband",
      summary: "All users transmit simultaneously on the exact same frequency using unique orthogonal pseudo-random codes."
    },
    {
      name: "OFDM / OFDMA",
      standard: "4G LTE, 5G NR, Wi-Fi 6",
      reuse: "N = 1 (with fractional reuse)",
      isiResilience: "Superb (Cyclic prefix completely absorbs multipath)",
      powerControl: "Moderate",
      duplexing: "Flexible FDD / TDD",
      burstyData: "Optimal (Dynamic 2D resource blocks in Time & Frequency)",
      idealFor: "Ultra-high throughput streaming and massive user density",
      summary: "Splits wideband channel into hundreds of narrowband orthogonal subcarriers. Eliminates ISI entirely."
    },
    {
      name: "CSMA/CA (Carrier Sense)",
      standard: "Wi-Fi (IEEE 802.11)",
      reuse: "Unlicensed / Local Coexistence",
      isiResilience: "Depends on underlying PHY (OFDM/DSSS)",
      powerControl: "Low to None",
      duplexing: "TDD (Half-duplex listen before talk)",
      burstyData: "Excellent for asynchronous local traffic",
      idealFor: "Unlicensed ad-hoc & indoor WLAN networks",
      summary: "Stations listen before transmitting. Uses random exponential backoff and RTS/CTS to avoid collisions."
    }
  ];

  const objectives = [
    { id: 'all', label: "Show All Protocols" },
    { id: 'n1', label: "Universal Frequency Reuse (N = 1)" },
    { id: 'isi', label: "Superb Immunity to Multipath ISI" },
    { id: 'burst', label: "Dynamic Bursty Packet Data" },
    { id: 'nodup', label: "No RF Duplexer Required" }
  ];

  const filtered = technologies.filter((tech) => {
    if (selectedObjective === 'all') return true;
    if (selectedObjective === 'n1') return tech.reuse.includes('N = 1');
    if (selectedObjective === 'isi') return tech.isiResilience.includes('High') || tech.isiResilience.includes('Superb');
    if (selectedObjective === 'burst') return tech.burstyData.includes('Optimal') || tech.burstyData.includes('Excellent') || tech.burstyData.includes('Good');
    if (selectedObjective === 'nodup') return tech.duplexing.includes('No duplexer');
    return true;
  });

  return (
    <div className="interactive-widget-box">
      <div className="widget-header">
        <div className="widget-title-group">
          <Filter className="widget-icon" />
          <div>
            <h4 className="widget-heading">Multiple Access Engineering Decision Matrix</h4>
            <p className="widget-subheading">Filter access strategies based on real-world engineering trade-offs and deployment requirements</p>
          </div>
        </div>
      </div>

      <div className="filter-pill-bar">
        {objectives.map((obj) => (
          <button
            key={obj.id}
            className={`filter-btn ${selectedObjective === obj.id ? 'active' : ''}`}
            onClick={() => setSelectedObjective(obj.id)}
          >
            {obj.label}
          </button>
        ))}
      </div>

      <div className="tech-cards-grid">
        {filtered.map((tech) => (
          <div key={tech.name} className="tech-matrix-card">
            <div className="tech-card-header">
              <h5 className="tech-card-title">{tech.name}</h5>
              <span className="tech-std-badge">{tech.standard}</span>
            </div>

            <p className="tech-summary-text">{tech.summary}</p>

            <div className="tech-specs-list">
              <div className="tech-spec-row">
                <span className="spec-label">Frequency Reuse:</span>
                <span className="spec-value">{tech.reuse}</span>
              </div>
              <div className="tech-spec-row">
                <span className="spec-label">Multipath / ISI:</span>
                <span className="spec-value">{tech.isiResilience}</span>
              </div>
              <div className="tech-spec-row">
                <span className="spec-label">Power Control:</span>
                <span className="spec-value">{tech.powerControl}</span>
              </div>
              <div className="tech-spec-row">
                <span className="spec-label">Duplexing:</span>
                <span className="spec-value">{tech.duplexing}</span>
              </div>
            </div>

            <div className="tech-ideal-box">
              <strong>Best Applied In:</strong> {tech.idealFor}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
