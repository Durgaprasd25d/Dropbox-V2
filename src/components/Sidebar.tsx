import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Star, Users, Clock, Cloud, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const menuItems = [
    { icon: Home, label: 'Home', href: '/dashboard' },
    { icon: Star, label: 'Starred', href: '/starred' },
    { icon: Users, label: 'Shared', href: '/shared' },
    { icon: Clock, label: 'Recent', href: '/recent' },
  ];

  const sidebarVariants = {
    expanded: { width: '16rem' },
    collapsed: { width: '4rem' }
  };

  return (
    <motion.div
      initial="expanded"
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative bg-white h-screen border-r border-gray-200 overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Cloud className="h-8 w-8 text-blue-600" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-xl font-semibold"
                >
                  Dropbox V2
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>
      
      <nav className="mt-6 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors mb-1",
              location.pathname === item.href
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        ))}
      </nav>

      <div className={cn(
        "absolute bottom-4",
        isCollapsed ? "w-[calc(100%-1rem)]" : "w-[calc(100%-2rem)]",
        "mx-2"
      )}>
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex justify-between mb-2">
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-gray-600"
              >
                Storage
              </motion.span>
            )}
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-gray-600"
              >
                75%
              </motion.span>
            )}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;