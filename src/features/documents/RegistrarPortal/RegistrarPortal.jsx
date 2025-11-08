import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrarPortal.css';

const initialRequests = [
  {
    id: 1,
    studentName: 'John Doe',
    studentId: '2024-001',
    documentType: 'Transcript of Records',
    purpose: 'Job Application',
    copies: 2,
    totalPrice: 300,
    status: 'pending',
    date: '2024-01-15'
  },
  {
    id: 2,
    studentName: 'Jane Smith',
    studentId: '2024-002',
    documentType: 'Certificate of Good Moral',
    purpose: 'Scholarship',
    copies: 1,
    totalPrice: 50,
    status: 'approved',
    date: '2024-01-14'
  },
  {
    id: 3,
    studentName: 'Mike Johnson',
    studentId: '2024-003',
    documentType: 'Diploma',
    purpose: 'Employment',
    copies: 1,
    totalPrice: 200,
    status: 'ready',
    date: '2024-01-13'
  },
];

export default function AdminPortal() {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  const handleStatusChange = (id, newStatus) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
    setShowModal(false);
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handlePrintClaimSlip = (request) => {
    navigate(`/claim/${request.id}`);
  };

  const filteredRequests = statusFilter === 'all' 
    ? requests 
    : requests.filter(req => req.status === statusFilter);

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    ready: requests.filter(r => r.status === 'ready').length,
  };

  return (
    <div className="admin-portal-container">
      <div className="admin-header">
        <span className="admin-icon">📊</span>
        <h1>Admin Portal</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card card">
          <h3>Total Requests</h3>
          <p className="stat-number">{stats.total}</p>
        </div>
        <div className="stat-card card">
          <h3>Pending</h3>
          <p className="stat-number stat-warning">{stats.pending}</p>
        </div>
        <div className="stat-card card">
          <h3>Approved</h3>
          <p className="stat-number stat-info">{stats.approved}</p>
        </div>
        <div className="stat-card card">
          <h3>Ready for Pickup</h3>
          <p className="stat-number stat-success">{stats.ready}</p>
        </div>
      </div>

      <div className="card">
        <div className="table-header">
          <h2>Document Requests</h2>
          <div className="input-group" style={{ marginBottom: 0, maxWidth: '200px' }}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="ready">Ready</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Document Type</th>
                <th>Copies</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.studentId}</td>
                  <td>{request.studentName}</td>
                  <td>{request.documentType}</td>
                  <td>{request.copies}</td>
                  <td>₱{request.totalPrice}</td>
                  <td>{request.date}</td>
                  <td>
                    <span className={`badge badge-${request.status}`}>
                      {request.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-small btn-outline"
                        onClick={() => handleViewDetails(request)}
                      >
                        View
                      </button>
                      {request.status === 'ready' && (
                        <button 
                          className="btn-small btn-primary"
                          onClick={() => handlePrintClaimSlip(request)}
                        >
                          Claim Slip
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedRequest && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Request Details</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <strong>Student:</strong> {selectedRequest.studentName}
              </div>
              <div className="detail-row">
                <strong>Student ID:</strong> {selectedRequest.studentId}
              </div>
              <div className="detail-row">
                <strong>Document:</strong> {selectedRequest.documentType}
              </div>
              <div className="detail-row">
                <strong>Purpose:</strong> {selectedRequest.purpose}
              </div>
              <div className="detail-row">
                <strong>Copies:</strong> {selectedRequest.copies}
              </div>
              <div className="detail-row">
                <strong>Total Price:</strong> ₱{selectedRequest.totalPrice}
              </div>
              <div className="detail-row">
                <strong>Date Requested:</strong> {selectedRequest.date}
              </div>
              <div className="detail-row">
                <strong>Current Status:</strong> {selectedRequest.status.toUpperCase()}
              </div>

              <div className="modal-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => handleStatusChange(selectedRequest.id, 'approved')}
                >
                  Approve
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleStatusChange(selectedRequest.id, 'ready')}
                >
                  Mark Ready
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleStatusChange(selectedRequest.id, 'rejected')}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}