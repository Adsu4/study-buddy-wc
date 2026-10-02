import React, { useState } from 'react';
import { Network, PhoneCall, ShieldCheck, Play, RotateCcw, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function GsmCallFlowSim() {
  const [activeMode, setActiveMode] = useState('call_flow'); // 'call_flow' or 'security'
  const [stepIndex, setStepIndex] = useState(0);

  const callFlowSteps = [
    {
      title: "Step 1: Landline/PSTN User Dials Mobile Number (MSISDN)",
      desc: "A user on the fixed telephone network dials the subscriber's phone number. The PSTN recognizes the mobile code and forwards the call to the mobile operator's Gateway MSC (GMSC).",
      activeNodes: ["PSTN", "GMSC"],
      dataLabel: "ISUP IAM (MSISDN)"
    },
    {
      title: "Step 2: GMSC Queries Subscriber's HLR",
      desc: "GMSC does not know where the phone is physically located right now. It queries the permanent Home Location Register (HLR) using the dialed MSISDN.",
      activeNodes: ["GMSC", "HLR"],
      dataLabel: "MAP Send-Routing-Info"
    },
    {
      title: "Step 3: HLR Requests Roaming Number from Current VLR",
      desc: "HLR checks its records and sees the subscriber is currently roaming in City X. HLR contacts City X's Visitor Location Register (VLR) to request a temporary routing number.",
      activeNodes: ["HLR", "VLR"],
      dataLabel: "MAP Provide-Roaming-Number"
    },
    {
      title: "Step 4: VLR Generates & Returns MSRN",
      desc: "The VLR assigns a temporary Mobile Station Roaming Number (MSRN) and returns it back to the HLR, which forwards it to the GMSC.",
      activeNodes: ["VLR", "HLR", "GMSC"],
      dataLabel: "MSRN Generated"
    },
    {
      title: "Step 5: GMSC Routes Call to Serving Visited MSC",
      desc: "Armed with the temporary MSRN, the GMSC establishes a trunk circuit to the visited serving MSC where the mobile is physically situated.",
      activeNodes: ["GMSC", "MSC"],
      dataLabel: "ISUP Trunk Setup"
    },
    {
      title: "Step 6: Visited MSC Instructs BSCs to Page on PCH",
      desc: "The serving MSC instructs the Base Station Controller (BSC) and BTSs in the subscriber's Location Area to broadcast a Paging Request on the Paging Channel (PCH).",
      activeNodes: ["MSC", "BSC", "BTS"],
      dataLabel: "PCH Paging Broadcast"
    },
    {
      title: "Step 7: Mobile Responds on RACH & Authenticates",
      desc: "The mobile handset detects its IMSI/TMSI on the PCH and transmits a channel request over the Random Access Channel (RACH). Authentication and ciphering are activated.",
      activeNodes: ["BTS", "MS"],
      dataLabel: "RACH Request -> SDCCH"
    },
    {
      title: "Step 8: Traffic Channel (TCH) Assigned & Handset Rings!",
      desc: "The network assigns a dedicated voice Traffic Channel (TCH). The handset rings, the subscriber answers, and bidirectional encrypted speech begins!",
      activeNodes: ["MS", "BTS", "BSC", "MSC", "GMSC", "PSTN"],
      dataLabel: "Encrypted Speech Path Active"
    }
  ];

  const securitySteps = [
    {
      title: "Step 1: AUC Generates Random Challenge (RAND)",
      desc: "The Authentication Center (AUC) generates an unpredictable 128-bit random number (RAND). Subscriber's secret 128-bit key Ki is pulled from secure storage.",
      activeNodes: ["AUC", "HLR"],
      dataLabel: "128-bit RAND generated"
    },
    {
      title: "Step 2: AUC Computes SRES & Kc (Authentication Triplet)",
      desc: "AUC runs algorithm A3 to produce Signed Response SRES (32-bit), and algorithm A8 to produce cipher key Kc (64-bit). The triplet (RAND, SRES, Kc) is sent to the VLR.",
      activeNodes: ["AUC", "VLR"],
      dataLabel: "Triplet (RAND, SRES, Kc) to VLR"
    },
    {
      title: "Step 3: Base Station Challenges Mobile Handset with RAND",
      desc: "The network transmits ONLY the 128-bit RAND over the air to the Mobile Station. The secret key Ki is NEVER sent over the radio air-interface!",
      activeNodes: ["BTS", "MS"],
      dataLabel: "Air Challenge: RAND only"
    },
    {
      title: "Step 4: SIM Card Computes SRES & Kc Locally",
      desc: "The mobile's SIM card takes RAND and its internal secret key Ki, executes A3 to produce SRES_mobile, and executes A8 to produce Kc.",
      activeNodes: ["MS"],
      dataLabel: "SIM runs A3 & A8 internally"
    },
    {
      title: "Step 5: Handset Returns SRES_mobile to VLR for Verification",
      desc: "The phone transmits SRES_mobile over the air. The VLR checks if SRES_mobile == SRES_auc. If they match, the subscriber is 100% verified!",
      activeNodes: ["MS", "BTS", "BSC", "MSC", "VLR"],
      dataLabel: "SRES verification match!"
    },
    {
      title: "Step 6: Stream Cipher A5 Encrypts All Air Traffic",
      desc: "Using the 64-bit key Kc, both the mobile and BTS initialize the A5 hardware stream cipher. All subsequent voice bursts and SMS are encrypted over the air!",
      activeNodes: ["MS", "BTS"],
      dataLabel: "A5 Encryption Active"
    }
  ];

  const currentSteps = activeMode === 'call_flow' ? callFlowSteps : securitySteps;
  const current = currentSteps[stepIndex];

  const networkNodes = [
    { id: "PSTN", label: "Fixed PSTN", type: "external" },
    { id: "GMSC", label: "Gateway MSC", type: "nss" },
    { id: "HLR", label: "HLR", type: "nss" },
    { id: "AUC", label: "AUC", type: "nss" },
    { id: "VLR", label: "VLR", type: "nss" },
    { id: "MSC", label: "Serving MSC", type: "nss" },
    { id: "BSC", label: "BSC", type: "bss" },
    { id: "BTS", label: "BTS Tower", type: "bss" },
    { id: "MS", label: "Mobile Handset", type: "ms" }
  ];

  function handleNext() {
    if (stepIndex < currentSteps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  }

  function handleReset() {
    setStepIndex(0);
  }

  return (
    <div className="interactive-widget-box">
      <div className="widget-header">
        <div className="widget-title-group">
          <Network className="widget-icon" />
          <div>
            <h4 className="widget-heading">GSM Architecture & Signaling Flow Simulator</h4>
            <p className="widget-subheading">Step through end-to-end Mobile Terminated Call (MTC) routing and A3/A8/A5 cryptographic security</p>
          </div>
        </div>
      </div>

      <div className="tab-pills-row">
        <button
          className={`tab-pill ${activeMode === 'call_flow' ? 'active' : ''}`}
          onClick={() => { setActiveMode('call_flow'); setStepIndex(0); }}
        >
          <PhoneCall size={14} /> Mobile Terminated Call (MTC)
        </button>
        <button
          className={`tab-pill ${activeMode === 'security' ? 'active' : ''}`}
          onClick={() => { setActiveMode('security'); setStepIndex(0); }}
        >
          <ShieldCheck size={14} /> GSM Authentication & Ciphering (A3/A8/A5)
        </button>
      </div>

      {/* Visual GSM Node Map */}
      <div className="gsm-node-canvas">
        <div className="gsm-nodes-grid">
          {networkNodes.map((node) => {
            const isActive = current.activeNodes.includes(node.id);
            return (
              <div
                key={node.id}
                className={`gsm-node-card ${node.type} ${isActive ? 'active-pulse' : ''}`}
              >
                <div className="node-type-tag">{node.type.toUpperCase()}</div>
                <div className="node-title">{node.label}</div>
                {isActive && <div className="node-active-status">Active Signal</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Stepper Controller */}
      <div className="flow-step-details-card">
        <div className="step-badge-row">
          <span className="step-counter">Step {stepIndex + 1} of {currentSteps.length}</span>
          <span className="step-signal-tag">{current.dataLabel}</span>
        </div>

        <h5 className="step-title-text">{current.title}</h5>
        <p className="step-desc-text">{current.desc}</p>

        <div className="step-actions-row">
          <button className="btn-secondary" onClick={handleReset}>
            <RotateCcw size={14} /> Reset
          </button>
          <button
            className="btn-primary"
            onClick={handleNext}
            disabled={stepIndex === currentSteps.length - 1}
          >
            {stepIndex === currentSteps.length - 1 ? (
              <>Completed <CheckCircle2 size={14} /></>
            ) : (
              <>Next Step <ChevronRight size={14} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
