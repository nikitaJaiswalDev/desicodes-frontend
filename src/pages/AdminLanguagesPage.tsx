import React, { useEffect, useState } from "react";
import { adminApi, type LanguageData, type LanguageCreate } from "../api/services/admin";
import "./AdminLanguagesPage.css";

const AdminLanguagesPage: React.FC = () => {
    const [languages, setLanguages] = useState<LanguageData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newLanguage, setNewLanguage] = useState<LanguageCreate>({
        name: "",
        slug: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchLanguages();
    }, []);

    const fetchLanguages = async () => {
        try {
            setLoading(true);
            const data = await adminApi.getLanguages();
            setLanguages(data);
        } catch (err: any) {
            setError(err?.response?.data?.detail || "Failed to fetch languages");
        } finally {
            setLoading(false);
        }
    };

    const handleAddLanguage = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await adminApi.createLanguage(newLanguage);
            setShowAddModal(false);
            setNewLanguage({ name: "", slug: "" });
            fetchLanguages();
        } catch (err: any) {
            alert(err?.response?.data?.detail || "Failed to add language");
        }
    };

    // const handleDeleteLanguage = async (languageId: number, languageName: string) => {
    //     if (window.confirm(`Are you sure you want to delete "${languageName}"?`)) {
    //         try {
    //             await adminApi.deleteLanguage(languageId);
    //             fetchLanguages();
    //         } catch (err: any) {
    //             alert(err?.response?.data?.detail || "Failed to delete language");
    //         }
    //     }
    // };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLanguages = languages.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(languages.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return (
            <div className="admin-page">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading languages...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-page">
                <div className="error-container">
                    <h2>Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <div>
                    <h1>Languages Management</h1>
                    <p>Manage programming languages supported by the system</p>
                </div>
                <button onClick={() => setShowAddModal(true)} className="add-language-btn">
                    <span>➕</span> Add Language
                </button>
            </div>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Language Name</th>
                            <th>Slug</th>
                            {/* <th>Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {currentLanguages.map((lang, index) => (
                            <tr key={lang.id}>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{lang.name}</td>
                                <td>
                                    <span className="slug-badge">{lang.slug}</span>
                                </td>
                                {/* <td className="action-buttons">
                                    <button
                                        onClick={() => handleDeleteLanguage(lang.id, lang.name)}
                                        className="btn-delete"
                                        title="Delete Language"
                                    >
                                        🗑️
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {languages.length === 0 && (
                <div className="no-data">
                    <p>No languages found</p>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="pagination-btn"
                    >
                        « Previous
                    </button>

                    <div className="pagination-numbers">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                            >
                                {pageNum}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="pagination-btn"
                    >
                        Next »
                    </button>
                </div>
            )}

            {/* Add Language Modal */}
            {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Add New Language</h2>
                            <button onClick={() => setShowAddModal(false)} className="close-btn">
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleAddLanguage} className="language-form">
                            <div className="form-group">
                                <label htmlFor="name">Language Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={newLanguage.name}
                                    onChange={(e) =>
                                        setNewLanguage({ ...newLanguage, name: e.target.value })
                                    }
                                    placeholder="e.g., Hindi, Tamil, Python"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="slug">Language Slug</label>
                                <input
                                    type="text"
                                    id="slug"
                                    value={newLanguage.slug}
                                    onChange={(e) =>
                                        setNewLanguage({ ...newLanguage, slug: e.target.value })
                                    }
                                    placeholder="e.g., hindi, tamil, python"
                                    required
                                />
                            </div>
                            <div className="form-actions">
                                <button type="button" onClick={() => setShowAddModal(false)} className="cancel-btn">
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    Add Language
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLanguagesPage;
