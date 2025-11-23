import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { FaFilter } from 'react-icons/fa';
import api from '../api';

const AuditLogPage = () => {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
    };

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await api.get('/audit-logs');
                const formattedData = response.data.map(item => ({
                    id: item.id,
                    date: formatDate(item.created_at), // Ambil dari created_at
                    time: formatTime(item.created_at), // Ambil dari created_at
                    ip: item.ip_address,               // Sesuai nama kolom di db
                    action: item.action
                }));

                setLogs(formattedData);
                setFilteredLogs(formattedData);
            } catch (error) {
                console.error("Gagal ambil log:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLogs();
    }, []);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        const results = logs.filter(log =>
            log.action.toLowerCase().includes(term) ||
            log.date.toLowerCase().includes(term) ||
            log.ip.includes(term)
        );
        setFilteredLogs(results);
    };

    return (
        <AdminLayout title="Admin Audit Log">
            <div className="toolbar">
                <div className="search-group">
                    <input
                        type="text"
                        placeholder="Search by action or date..."
                        className="search-input"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <button className="btn btn-secondary">
                    <FaFilter /> Filter
                </button>
            </div>

            {isLoading ? (
                <p style={{textAlign: 'center', padding: '20px'}}>Loading log data...</p>
            ) : (
                <table className="audit-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>IP Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLogs.length > 0 ? (
                            filteredLogs.map((log, index) => (
                                <tr key={index}>
                                    <td>{log.date}</td>
                                    <td>{log.time}</td>
                                    <td>{log.ip}</td>
                                    <td>{log.action}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                                    No logs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </AdminLayout>
    );
};

export default AuditLogPage;