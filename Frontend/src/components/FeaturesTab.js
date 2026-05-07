import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Map, RefreshCcw, Brain, Shield, ShoppingCart, Store, Zap, Lock, BarChart2 } from "lucide-react";
import styles from "./FeaturesTab.module.css";

const tabs = [
  { id: "item-management", label: "Item management" },
  { id: "store-oversight", label: "Store oversight" },
  { id: "transaction-tracking", label: "Transaction tracking" },
  { id: "smart-features", label: "Smart features" },
  { id: "security-performance", label: "Security & Performance" }
];

const featuresData = {
  "item-management": [
    {
      icon: <Package size={32} color="#f472b6" />,
      bgVar: "linear-gradient(135deg, #fdf2f8, #fbcfe8)",
      shadowVar: "rgba(244, 114, 182, 0.2)",
      gradVar: "linear-gradient(90deg, #f472b6, #db2777)",
      title: "Item grouping and assembling",
      desc: "Create categories based on attributes and manage complete CRUD operations for all inventory items effortlessly."
    },
    {
      icon: <RefreshCcw size={32} color="#3b82f6" />,
      bgVar: "linear-gradient(135deg, #eff6ff, #bfdbfe)",
      shadowVar: "rgba(59, 130, 246, 0.2)",
      gradVar: "linear-gradient(90deg, #3b82f6, #2563eb)",
      title: "Real-time Sync",
      desc: "Experience instant updates across all modules. No manual entry errors or delayed synchronization."
    },
    {
      icon: <ShoppingCart size={32} color="#10b981" />,
      bgVar: "linear-gradient(135deg, #ecfdf5, #a7f3d0)",
      shadowVar: "rgba(16, 185, 129, 0.2)",
      gradVar: "linear-gradient(90deg, #10b981, #059669)",
      title: "Product lifecycle",
      desc: "Track the movement of each item from procurement to final sale without losing control over your stock."
    }
  ],
  "store-oversight": [
    {
      icon: <Store size={32} color="#f59e0b" />,
      bgVar: "linear-gradient(135deg, #fffbeb, #fde68a)",
      shadowVar: "rgba(245, 158, 11, 0.2)",
      gradVar: "linear-gradient(90deg, #f59e0b, #d97706)",
      title: "Multi-warehouse management",
      desc: "Manage stock at multiple locations and keep track of transfers from a single centralized dashboard."
    },
    {
      icon: <Map size={32} color="#6366f1" />,
      bgVar: "linear-gradient(135deg, #eef2ff, #c7d2fe)",
      shadowVar: "rgba(99, 102, 241, 0.2)",
      gradVar: "linear-gradient(90deg, #6366f1, #4f46e5)",
      title: "Store specific linking",
      desc: "Link products to specific store locations to ensure precise tracking of localized inventory levels."
    }
  ],
  "transaction-tracking": [
    {
      icon: <BarChart2 size={32} color="#ec4899" />,
      bgVar: "linear-gradient(135deg, #fdf2f8, #fbcfe8)",
      shadowVar: "rgba(236, 72, 153, 0.2)",
      gradVar: "linear-gradient(90deg, #ec4899, #db2777)",
      title: "Automated Adjustments",
      desc: "Stock levels adjust automatically based on logged sales and purchase transactions."
    },
    {
      icon: <RefreshCcw size={32} color="#14b8a6" />,
      bgVar: "linear-gradient(135deg, #f0fdfa, #ccfbf1)",
      shadowVar: "rgba(20, 184, 166, 0.2)",
      gradVar: "linear-gradient(90deg, #14b8a6, #0d9488)",
      title: "Purchase & Sales Sync",
      desc: "A unified view of inbound procurement and outbound sales ensuring zero discrepancy."
    }
  ],
  "smart-features": [
    {
      icon: <Brain size={32} color="#8b5cf6" />,
      bgVar: "linear-gradient(135deg, #f5f3ff, #ddd6fe)",
      shadowVar: "rgba(139, 92, 246, 0.2)",
      gradVar: "linear-gradient(90deg, #8b5cf6, #7c3aed)",
      title: "AI Predictive Forecasting",
      desc: "Utilize advanced Python-based AI to forecast sales velocity and predict future stock level requirements."
    },
    {
      icon: <BarChart2 size={32} color="#f43f5e" />,
      bgVar: "linear-gradient(135deg, #fff1f2, #fecdd3)",
      shadowVar: "rgba(244, 63, 94, 0.2)",
      gradVar: "linear-gradient(90deg, #f43f5e, #e11d48)",
      title: "Automated KPIs",
      desc: "Automatic calculation of key performance indicators like Turnover Rate, Profit Margins, and DIO."
    }
  ],
  "security-performance": [
    {
      icon: <Shield size={32} color="#10b981" />,
      bgVar: "linear-gradient(135deg, #ecfdf5, #a7f3d0)",
      shadowVar: "rgba(16, 185, 129, 0.2)",
      gradVar: "linear-gradient(90deg, #10b981, #059669)",
      title: "Role-based Security",
      desc: "Secure JWT Authentication and Bcrypt password hashing to keep your business data completely safe."
    },
    {
      icon: <Zap size={32} color="#f59e0b" />,
      bgVar: "linear-gradient(135deg, #fffbeb, #fde68a)",
      shadowVar: "rgba(245, 158, 11, 0.2)",
      gradVar: "linear-gradient(90deg, #f59e0b, #d97706)",
      title: "Lightning Performance",
      desc: "Built on the robust MERN stack, ensuring sub-second load times and fluid data transitions."
    }
  ]
};

export default function FeaturesTab() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className={styles.container}>
      {/* Content Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          FineRise Ecosystem
        </h2>
        <p className={styles.subtitle}>
          Group, customize, manage, and track your business processes from a single application. Experience seamless asset management without losing control.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabsContainer}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Feature Cards Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={styles.grid}
        >
          {featuresData[activeTab].map((feature, idx) => (
            <motion.div 
              key={idx}
              className={styles.card}
              style={{
                "--card-gradient": feature.gradVar,
                "--icon-bg": feature.bgVar,
                "--icon-shadow": feature.shadowVar
              }}
            >
              <div className={styles.iconWrapper}>
                {feature.icon}
              </div>
              <h3 className={styles.cardTitle}>
                {feature.title}
              </h3>
              <p className={styles.cardDesc}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
