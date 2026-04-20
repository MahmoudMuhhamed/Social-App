import React, { useState } from 'react'





export default function Notification() {
  const [activeTab, setActiveTab] = useState("unread");







  return <>
  
  <div className="min-h-screen bg-gray-100 flex items-start justify-center px-4 pt-7">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-sm border border-gray-100">

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Realtime updates for likes, comments, shares, and follows.
            </p>
          </div>
          <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 border border-gray-200 rounded-full px-3 py-1.5 mt-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Mark all as read
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 px-6 pb-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
              ${activeTab === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("unread")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
              ${activeTab === "unread"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
          >
            Unread
          </button>
        </div>

        <hr className="border-gray-100" />

        {/* Empty state only */}
        <div className="p-4">
          <div className="flex items-center justify-center py-12 text-gray-400 text-sm border border-gray-100 rounded-xl">
            {activeTab === "unread"
              ? "No unread notifications yet."
              : "No notifications yet."}
          </div>
        </div>

      </div>
    </div>
  
  
  </>
}
