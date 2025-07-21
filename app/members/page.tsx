"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  User,
  GraduationCap,
  Heart,
  Quote,
  Calendar,
  ArrowLeft,
  Users,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { apiClient } from "@/utils/api";
import { useRouter } from "next/navigation";

const MembersPage = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [departments, setDepartments] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadMembers();
  }, []);

  useEffect(() => {
    loadMembers();
  }, [currentPage, searchTerm, departmentFilter]);

  const loadMembers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiClient.getPublicMembers(
        currentPage,
        10,
        searchTerm || undefined,
        departmentFilter || undefined
      );

      setMembers(response.members);
      setPagination(response.pagination);

      // Get unique departments for filter
      const uniqueDepts = [
        ...new Set(response.members.map((m) => m.department)),
      ];
      setDepartments(uniqueDepts.sort());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  const handleMemberClick = (idNumber: string) => {
    apiClient
      .getPublicMemberById(idNumber)
      .then((member) => {
        setSelectedMember(member);
        setShowModal(true);
      })
      .catch((err) => {
        setError("Failed to load member details");
      });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleDepartmentFilter = (value: string) => {
    setDepartmentFilter(value);
    setCurrentPage(1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-600 to-slate-500">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-800 to-blue-700 py-8 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.replace("/")}
            className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-200 mb-6 cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </button>

          <div className="text-center">
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Light Bearers Directory
            </h1>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto">
              Meet our fellow Light Bearers in the CONCES UNIMAID fellowship
            </p>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6"></div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, ID, or department..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-4 border-b-2 border-slate-400 bg-transparent focus:outline-none focus:border-yellow-400 transition-all duration-300 text-white placeholder-slate-400"
            />
          </div>

          <div className="max-w-xs mx-auto mt-4">
            <select
              value={departmentFilter}
              onChange={(e) => handleDepartmentFilter(e.target.value)}
              className="w-full px-4 py-3 border-b-2 border-slate-400 bg-transparent focus:outline-none focus:border-yellow-400 transition-all duration-300 text-white"
            >
              <option value="" className="bg-slate-500">
                All Departments
              </option>
              {departments.map((dept) => (
                <option key={dept} value={dept} className="bg-slate-500">
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Users className="h-12 w-12 text-slate-400 mx-auto mb-4 animate-pulse" />
            <p className="text-slate-400 text-lg">Loading members...</p>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-red-400 text-lg">{error}</p>
            <button
              onClick={loadMembers}
              className="mt-4 px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
            >
              Retry
            </button>
          </motion.div>
        ) : (
          <>
            {/* Members Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {members.map((member, index) => (
                <motion.div
                  key={member.idNumber}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleMemberClick(member.idNumber)}
                  className="bg-slate-700/80 backdrop-blur-sm border border-slate-500 p-6 cursor-pointer hover:border-yellow-400 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-blue-400" />
                      <span className="text-sm text-slate-300">
                        ID: {member.idNumber.split("/").pop()}
                      </span>
                    </div>
                    <Eye className="h-4 w-4 text-yellow-400" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {member.fullName}
                  </h3>

                  <div className="flex items-center space-x-2 mb-3">
                    <GraduationCap className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-slate-300">
                      {member.department}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-slate-300">
                      Born: {member.dayMonth}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Heart className="h-4 w-4 text-blue-400 mt-0.5" />
                      <p className="text-xs text-slate-300 line-clamp-2">
                        {member.interests}
                      </p>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Quote className="h-4 w-4 text-blue-400 mt-0.5" />
                      <p className="text-xs text-slate-300 italic line-clamp-2">
                        "{member.bestEngineeringQuote}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center space-x-4 mt-12"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!pagination.hasPrev}
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors duration-200"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center space-x-2">
                  {Array.from(
                    { length: Math.min(5, pagination.pages) },
                    (_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 transition-colors duration-200 ${
                            page === currentPage
                              ? "bg-yellow-400 text-slate-900"
                              : "bg-slate-700 text-white hover:bg-slate-600"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    }
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!pagination.hasNext}
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors duration-200"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}

            {members.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">No members found</p>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Member Detail Modal */}
      {showModal && selectedMember && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-800 border border-slate-600 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <h2
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Member Details
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-slate-400">Full Name</label>
                  <p className="text-white font-medium">
                    {selectedMember.fullName}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-slate-400">ID Number</label>
                  <p className="text-white font-medium">
                    {selectedMember?.idNumber}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-slate-400">Department</label>
                  <p className="text-white font-medium">
                    {selectedMember?.department}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-slate-400">
                    State of Origin
                  </label>
                  <p className="text-white font-medium">
                    {selectedMember?.stateOfOrigin}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-400">Interests</label>
                <p className="text-white">{selectedMember?.interests}</p>
              </div>

              <div>
                <label className="text-sm text-slate-400">Hobbies</label>
                <p className="text-white">{selectedMember?.hobbies}</p>
              </div>

              <div>
                <label className="text-sm text-slate-400">
                  Best Engineering Quote
                </label>
                <p className="text-white italic">
                  "{selectedMember?.bestEngineeringQuote}"
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MembersPage;
