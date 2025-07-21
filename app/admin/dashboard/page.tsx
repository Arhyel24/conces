"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LogOut,
  Users,
  Filter,
  Download,
  Search,
  Calendar,
  MapPin,
  GraduationCap,
  Mail,
  Phone,
  User,
  Heart,
  Gamepad2,
  Quote,
  ArrowUpDown,
} from "lucide-react";
import { apiClient } from "@/utils/api";
import { useRouter } from "next/navigation";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [sortField, setSortField] = useState<string>("submittedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
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
  const [states, setStates] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadMembers();
    loadFilters();
  }, []);

  useEffect(() => {
    loadMembers();
  }, [currentPage, searchTerm, departmentFilter, stateFilter]);

  const loadMembers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiClient.getAdminMembers(
        currentPage,
        10,
        searchTerm || undefined,
        departmentFilter || undefined,
        stateFilter || undefined
      );

      setMembers(response.members);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  const loadFilters = async () => {
    try {
      const [depts, states] = await Promise.all([
        apiClient.getDepartments(),
        apiClient.getStates(),
      ]);
      setDepartments(depts);
      setStates(states);
    } catch (err) {
      console.error("Failed to load filters:", err);
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(members, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "CONCES_members.json";
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handleLogout = () => {
    apiClient.logout();
    router.push("/admin/login");
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (type: "department" | "state", value: string) => {
    if (type === "department") setDepartmentFilter(value);
    if (type === "state") setStateFilter(value);
    setCurrentPage(1);
  };

  const uniqueDepartments = [...new Set(members.map((m) => m.department))];
  const uniqueStates = [...new Set(members.map((m) => m.stateOfOrigin))];

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
        className="bg-gradient-to-r from-blue-900 to-blue-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Users className="h-8 w-8 text-yellow-400" />
              <div>
                <h1
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  CONCES Admin Dashboard
                </h1>
                <p className="text-slate-300">Manage member registrations</p>
              </div>
            </div>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-slate-700/90 backdrop-blur-sm border border-slate-500 overflow-hidden"
        >
          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-800 to-blue-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="text-white">
                <h2 className="text-lg font-semibold">Total Members</h2>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="text-3xl font-bold text-yellow-400"
                >
                  {pagination.total}
                </motion.p>
              </div>
              <motion.button
                onClick={exportData}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-4 py-2 transition-colors duration-200 font-semibold"
              >
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            variants={itemVariants}
            className="p-6 bg-slate-600/50 border-b border-slate-500"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-b-2 border-slate-400 bg-transparent focus:outline-none focus:border-yellow-400 transition-all duration-300 text-white placeholder-slate-300"
                />
              </div>

              <select
                value={departmentFilter}
                onChange={(e) =>
                  handleFilterChange("department", e.target.value)
                }
                className="px-4 py-3 border-b-2 border-slate-400 bg-transparent focus:outline-none focus:border-yellow-400 transition-all duration-300 text-white"
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>

              <select
                value={stateFilter}
                onChange={(e) => handleFilterChange("state", e.target.value)}
                className="px-4 py-3 border-b-2 border-slate-400 bg-transparent focus:outline-none focus:border-yellow-400 transition-all duration-300 text-white"
              >
                <option value="">All States</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-300">
                  Showing {members.length} of {pagination.total} members
                </span>
              </div>
            </div>
          </motion.div>

          {/* Members List */}
          <div className="p-6">
            {loading ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <Users className="h-12 w-12 text-slate-400 mx-auto mb-4 animate-pulse" />
                <p className="text-slate-400 text-lg">Loading members...</p>
              </motion.div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
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
            ) : members.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">No members found</p>
              </motion.div>
            ) : (
              <motion.div variants={containerVariants} className="space-y-6">
                {/* Sort Controls */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <button
                    onClick={() => handleSort("fullName")}
                    className="flex items-center space-x-1 px-3 py-1 bg-slate-600 text-yellow-400 hover:bg-slate-500 transition-colors duration-200"
                  >
                    <span>Name</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleSort("department")}
                    className="flex items-center space-x-1 px-3 py-1 bg-slate-600 text-yellow-400 hover:bg-slate-500 transition-colors duration-200"
                  >
                    <span>Department</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleSort("submittedAt")}
                    className="flex items-center space-x-1 px-3 py-1 bg-slate-600 text-yellow-400 hover:bg-slate-500 transition-colors duration-200"
                  >
                    <span>Date</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </div>

                {members.map((member, index) => (
                  <motion.div
                    key={member._id}
                    variants={itemVariants}
                    custom={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-600/80 backdrop-blur-sm border border-slate-500 p-6 hover:border-yellow-400 transition-all duration-300"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <User className="h-5 w-5 text-blue-400" />
                          <div>
                            <p className="text-sm text-slate-400">Full Name</p>
                            <p className="font-semibold text-white">
                              {member.fullName}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-blue-400" />
                          <div>
                            <p className="text-sm text-slate-400">Email</p>
                            <p className="font-medium text-white">
                              {member.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-blue-400" />
                          <div>
                            <p className="text-sm text-slate-400">Phone</p>
                            <p className="font-medium text-white">
                              {member.phoneNumber}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <GraduationCap className="h-5 w-5 text-blue-400" />
                          <div>
                            <p className="text-sm text-slate-400">Department</p>
                            <p className="font-medium text-white">
                              {member.department}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-blue-400" />
                          <div>
                            <p className="text-sm text-slate-400">State</p>
                            <p className="font-medium text-white">
                              {member.stateOfOrigin}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-blue-400" />
                          <div>
                            <p className="text-sm text-slate-400">
                              Date of Birth
                            </p>
                            <p className="font-medium text-white">
                              {new Date(
                                member.dateOfBirth
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Heart className="h-5 w-5 text-blue-400 mt-1" />
                          <div>
                            <p className="text-sm text-slate-400">Interests</p>
                            <p className="font-medium text-white text-sm">
                              {member.interests}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Gamepad2 className="h-5 w-5 text-blue-400 mt-1" />
                          <div>
                            <p className="text-sm text-slate-400">Hobbies</p>
                            <p className="font-medium text-white text-sm">
                              {member.hobbies}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Quote className="h-5 w-5 text-blue-400 mt-1" />
                          <div>
                            <p className="text-sm text-slate-400">
                              Engineering Quote
                            </p>
                            <p className="font-medium text-white text-sm italic">
                              "{member.bestEngineeringQuote}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-500">
                      <p className="text-xs text-slate-400">
                        Submitted:{" "}
                        {new Date(member.submittedAt).toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center space-x-4 mt-8 pt-8 border-t border-slate-500"
                  >
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={!pagination.hasPrev}
                      className="px-4 py-2 bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors duration-200"
                    >
                      Previous
                    </button>

                    <span className="text-slate-300">
                      Page {pagination.page} of {pagination.pages}
                    </span>

                    <button
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(pagination.pages, prev + 1)
                        )
                      }
                      disabled={!pagination.hasNext}
                      className="px-4 py-2 bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors duration-200"
                    >
                      Next
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
