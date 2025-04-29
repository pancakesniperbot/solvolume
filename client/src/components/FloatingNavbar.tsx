import { motion } from "framer-motion";
import { 
  ChevronDown, 
  Bot, 
  Activity
} from "lucide-react";
import { SiSolana } from "react-icons/si";

interface FloatingNavbarProps {
  onClickContents: () => void;
  onClickAI: () => void;
  showContentsList: boolean;
  showAIDialog: boolean;
}

export function FloatingNavbar({
  onClickContents,
  onClickAI,
  showContentsList,
  showAIDialog
}: FloatingNavbarProps) {
  return (
    <div className="fixed bottom-14 left-0 right-0 z-50 flex items-center justify-center px-4">
      <div className="flex items-center gap-4 relative max-w-screen-lg w-full">
        {/* Contents Button */}
        <motion.button
          className="flex items-center gap-2 bg-gradient-to-br from-[#0c0c15]/90 to-[#14142b]/90 backdrop-blur-md border border-[#14F195]/30 rounded-lg px-3 py-3 shadow-[0_8px_32px_rgba(20,241,149,0.15),0_0_1px_rgba(153,69,255,0.5)] hover:shadow-[0_8px_32px_rgba(20,241,149,0.25),0_0_4px_rgba(153,69,255,0.6)] transition-all duration-300 group relative overflow-hidden justify-between w-16 sm:w-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onClick={onClickContents}
          aria-label="View Contents"
          title="View Contents"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ 
                rotate: showContentsList ? [0, 15, 0] : 0,
                scale: showContentsList ? [1, 1.2, 1] : 1
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Activity className="h-4 w-4 text-[#14F195]" />
            </motion.div>
            <span className="hidden sm:inline text-white">Contents</span>
          </div>
          <motion.div
            animate={{ rotate: showContentsList ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-4 w-4 text-[#14F195]/80" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#14F195]/10 to-[#9945FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
        </motion.button>
        
        {/* Solana Logo in the center */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 -translate-y-12 z-20"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative cursor-pointer w-12 h-12 bg-black/80 rounded-xl border border-[#14F195]/40 flex items-center justify-center shadow-lg shadow-[#14F195]/20 hover:scale-105 transition-transform">
            <div className="flex flex-col items-center">
              <SiSolana className="text-[#14F195] h-6 w-6" />
            </div>
            
            {/* Pulse effect */}
            <div className="absolute inset-0 rounded-xl border border-[#14F195]/40 animate-pulse" style={{ animationDuration: '2s' }}></div>
          </div>
        </motion.div>
        
        {/* AI Assistant Button */}
        <motion.button
          className="flex items-center gap-2 bg-gradient-to-br from-[#0c0c15]/90 to-[#14142b]/90 backdrop-blur-md border border-[#14F195]/30 rounded-lg px-3 py-3 shadow-[0_8px_32px_rgba(20,241,149,0.15),0_0_1px_rgba(153,69,255,0.5)] hover:shadow-[0_8px_32px_rgba(20,241,149,0.25),0_0_4px_rgba(153,69,255,0.6)] transition-all duration-300 group relative overflow-hidden justify-between w-16 sm:w-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onClick={onClickAI}
          aria-label="AI Assistant"
          title="AI Volume Bot Help Assistant"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ 
                rotate: [0, 15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: "loop",
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            >
              <Bot className="h-4 w-4 text-[#14F195]" />
            </motion.div>
            <span className="hidden sm:inline text-transparent bg-clip-text bg-gradient-to-r from-[#14F195] to-[#9945FF] font-medium whitespace-nowrap">A.I. Assistant</span>
          </div>
          <motion.div
            animate={{ rotate: showAIDialog ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="ml-2"
          >
            <ChevronDown className="h-4 w-4 text-[#14F195]/80" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#14F195]/10 to-[#9945FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
        </motion.button>
      </div>
    </div>
  );
}