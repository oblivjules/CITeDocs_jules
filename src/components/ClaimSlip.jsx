import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ClaimSlip.css';

export default function ClaimSlip() {
  const { id } = useParams();

  const claimData = {
    id: id,
    claimNumber: `CLAIM-${id}-${Date.now()}`,
    studentName: 'John Doe',
    studentId: '2024-001',
    documentType: 'Transcript of Records',
    copies: 2,
    totalPrice: 300,
    dateRequested: '2024-01-15',
    dateReady: new Date().toLocaleDateString(),
    claimLocation: 'Registrar Office, Room 101',
    claimHours: 'Monday-Friday, 8:00 AM - 5:00 PM'
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="claim-slip-container">
      <div className="claim-slip-card card">
        <div className="claim-header">
          <div className="claim-icon">✓</div>
          <h1>Document Claim Slip</h1>
          <h2>CITeDocs</h2>
        </div>

        <div className="divider"></div>

        <div className="claim-info-grid">
          <div className="info-item">
            <span className="info-label">Claim Number</span>
            <span className="info-value">{claimData.claimNumber}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Date Ready</span>
            <span className="info-value">{claimData.dateReady}</span>
          </div>
        </div>

        <div className="divider"></div>

        <h3>Student Information</h3>
        <div className="claim-info-grid">
          <div className="info-item">
            <span className="info-label">Name</span>
            <span className="info-value">{claimData.studentName}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Student ID</span>
            <span className="info-value">{claimData.studentId}</span>
          </div>
        </div>

        <h3>Document Details</h3>
        <div className="claim-info-grid">
          <div className="info-item full-width">
            <span className="info-label">Document Type</span>
            <span className="info-value">{claimData.documentType}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Number of Copies</span>
            <span className="info-value">{claimData.copies}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Total Amount</span>
            <span className="info-value price">₱{claimData.totalPrice}</span>
          </div>
        </div>

        <div className="divider"></div>

        <h3>Claim Instructions</h3>
        <div className="instructions-box">
          <p><strong>Location:</strong> {claimData.claimLocation}</p>
          <p><strong>Office Hours:</strong> {claimData.claimHours}</p>
          <p><strong>Requirements:</strong></p>
          <ul>
            <li>Valid School ID or Government-issued ID</li>
            <li>This claim slip (printed or digital)</li>
            <li>Payment receipt (if not yet paid)</li>
          </ul>
        </div>

        <div className="print-button-container no-print">
          <button className="btn btn-primary" onClick={handlePrint}>
            🖨️ Print Claim Slip
          </button>
        </div>

        <div className="claim-footer">
          <p>Please present this claim slip when picking up your documents.</p>
          <p>For inquiries, contact the Registrar Office at registrar@cit.edu</p>
        </div>
      </div>
    </div>
  );
}