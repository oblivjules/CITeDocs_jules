import React, { useState } from 'react';
import './DocumentRequest.css';

const documentTypes = [
  { value: 'transcript', label: 'Transcript of Records', price: 150 },
  { value: 'diploma', label: 'Diploma', price: 200 },
  { value: 'good-moral', label: 'Certificate of Good Moral', price: 50 },
  { value: 'enrollment', label: 'Certificate of Enrollment', price: 50 },
  { value: 'grades', label: 'Certificate of Grades', price: 100 },
];

export default function DocumentRequest({ user }) {
  const [formData, setFormData] = useState({
    documentType: '',
    purpose: '',
    copies: 1,
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [requests, setRequests] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const selectedDoc = documentTypes.find(doc => doc.value === formData.documentType);
    const totalPrice = selectedDoc.price * formData.copies;
    
    const newRequest = {
      id: Date.now(),
      ...formData,
      documentLabel: selectedDoc.label,
      totalPrice,
      status: 'pending',
      date: new Date().toLocaleDateString(),
      studentName: user.name,
      studentId: user.studentId
    };

    setRequests([newRequest, ...requests]);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        documentType: '',
        purpose: '',
        copies: 1,
        notes: ''
      });
    }, 3000);
  };

  const selectedDoc = documentTypes.find(doc => doc.value === formData.documentType);
  const totalPrice = selectedDoc ? selectedDoc.price * formData.copies : 0;

  return (
    <div className="document-request-container">
      <div className="document-request-grid">
        <div className="request-form-section">
          <div className="card">
            <div className="section-header">
              <span className="section-icon">📄</span>
              <h2>Request Document</h2>
            </div>

            {submitted && (
              <div className="alert alert-success">
                Request submitted successfully! You will receive a notification once processed.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="documentType">Document Type</label>
                <select
                  id="documentType"
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a document</option>
                  {documentTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label} - ₱{option.price}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="purpose">Purpose</label>
                <input
                  type="text"
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Job Application, Transfer"
                />
              </div>

              <div className="input-group">
                <label htmlFor="copies">Number of Copies</label>
                <input
                  type="number"
                  id="copies"
                  name="copies"
                  value={formData.copies}
                  onChange={handleChange}
                  required
                  min="1"
                  max="10"
                />
              </div>

              <div className="input-group">
                <label htmlFor="notes">Additional Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Any special instructions..."
                />
              </div>

              {selectedDoc && (
                <div className="total-price">
                  <strong>Total: ₱{totalPrice}</strong>
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Submit Request
              </button>
            </form>
          </div>
        </div>

        <div className="requests-list-section">
          <h2>My Requests</h2>
          
          {requests.length === 0 ? (
            <div className="card empty-state">
              <p>No requests yet. Submit your first document request!</p>
            </div>
          ) : (
            <div className="requests-list">
              {requests.map((request) => (
                <div key={request.id} className="card request-item">
                  <div className="request-header">
                    <h3>{request.documentLabel}</h3>
                    <span className="badge badge-pending">{request.status}</span>
                  </div>
                  <div className="request-details">
                    <p><strong>Purpose:</strong> {request.purpose}</p>
                    <p><strong>Copies:</strong> {request.copies}</p>
                    <p><strong>Total:</strong> ₱{request.totalPrice}</p>
                    <p className="request-date">Submitted: {request.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}