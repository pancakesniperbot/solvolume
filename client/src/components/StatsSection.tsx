import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { SiSolana } from "react-icons/si";
import { TrendingUp, BarChart2, PieChart, Activity, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";

// Generate realistic-looking trading volume data for demonstration
const generateVolumeData = () => {
  const data = [];
  let volume = 10000 + Math.random() * 5000;
  
  for (let i = 0; i < 24; i++) {
    // Add some randomness to create a realistic pattern
    // with an overall uptrend
    const change = (Math.random() - 0.3) * 2000;
    volume = Math.max(8000, volume + change);
    
    data.push({
      hour: i,
      volume: Math.round(volume),
      avg: 9000 + (i * 300)
    });
  }
  
  return data;
};

// Generate platform distribution data
const platformData = [
  { name: 'DEXTools', value: 40, color: '#00FFA3' },
  { name: 'Dexscreener', value: 30, color: '#DC1FFF' },
  { name: 'Pump.Fun', value: 20, color: '#3B82F6' },
  { name: 'Others', value: 10, color: '#F97316' }
];

const statsData = [
  {
    title: "Avg. Visibility Increase",
    value: "380%",
    subtext: "Platform metric score",
    icon: <TrendingUp className="h-6 w-6 text-[#00FFA3]" />,
    gradient: "from-[#00FFA3]/20 to-[#00FFA3]/5"
  },
  {
    title: "Trending Appearance",
    value: "94%",
    subtext: "Across platforms",
    icon: <BarChart2 className="h-6 w-6 text-[#DC1FFF]" />,
    gradient: "from-[#DC1FFF]/20 to-[#DC1FFF]/5"
  },
  {
    title: "Distribution Pattern",
    value: "1,250+",
    subtext: "Transactions per day",
    icon: <Activity className="h-6 w-6 text-blue-400" />,
    gradient: "from-blue-400/20 to-blue-400/5"
  },
  {
    title: "System Availability",
    value: "24/7",
    subtext: "Uninterrupted operation",
    icon: <Zap className="h-6 w-6 text-amber-400" />,
    gradient: "from-amber-400/20 to-amber-400/5"
  }
];

export function StatsSection() {
  const [volumeData, setVolumeData] = useState(() => generateVolumeData());
  const [animationComplete, setAnimationComplete] = useState(false);

  // Regenerate data every few seconds to simulate live updates
  useEffect(() => {
    if (!animationComplete) return;
    
    const interval = setInterval(() => {
      setVolumeData(generateVolumeData());
    }, 5000);
    
    return () => clearInterval(interval);
  }, [animationComplete]);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-[#00FFA3] opacity-10 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-[#DC1FFF] opacity-10 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          onAnimationComplete={() => setAnimationComplete(true)}
        >
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-card/40 backdrop-blur-sm border border-gray-800 shadow-lg">
              <PieChart className="mr-2 h-4 w-4 text-[#00FFA3]" />
              <span className="text-xs font-medium">Live Performance Stats</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00FFA3] via-blue-400 to-[#DC1FFF]">
              Platform Visibility Metrics
            </h2>
            
            <p className="max-w-2xl text-gray-400 md:text-lg mb-6">
              Our technical solution enhances token visibility across all major Solana DEX platforms
            </p>
            
            <div className="max-w-2xl mx-auto bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-8 text-amber-100 text-sm">
              <p className="text-center">
                <strong>Disclaimer:</strong> The metrics shown are visibility and discoverability measurements, not financial performance indicators. 
                Our tool does not provide investment advice or financial forecasting.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border border-gray-800 bg-card/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center p-3 rounded-lg bg-gradient-to-r ${stat.gradient} mb-4`}>
                    {stat.icon}
                  </div>
                  <h3 className="text-lg font-medium text-gray-300 mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.subtext}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Volume Chart */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border border-gray-800 bg-card/60 backdrop-blur-sm h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold mb-1">24-Hour Activity Distribution</h3>
                    <p className="text-sm text-gray-500">On-chain activity visibility patterns</p>
                  </div>
                  <div className="flex items-center text-[#00FFA3] bg-[#00FFA3]/10 px-2 py-1 rounded">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">Optimized</span>
                  </div>
                </div>
                
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={volumeData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00FFA3" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#00FFA3" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="avgGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#DC1FFF" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#DC1FFF" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                      <XAxis 
                        dataKey="hour" 
                        tickFormatter={(hour) => `${hour}:00`}
                        stroke="#666"
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        tickFormatter={(value) => `${value/1000}k`}
                        stroke="#666"
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value.toLocaleString()}`, 'Activity Units']}
                        labelFormatter={(hour) => `Time: ${hour}:00`}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="volume" 
                        stroke="#00FFA3" 
                        fillOpacity={1} 
                        fill="url(#volumeGradient)" 
                        strokeWidth={2}
                        activeDot={{ r: 6 }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="avg" 
                        stroke="#DC1FFF" 
                        fillOpacity={0.5} 
                        fill="url(#avgGradient)" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex items-center justify-center space-x-6 mt-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#00FFA3] mr-2"></div>
                    <span className="text-sm text-gray-400">With Distribution Tool</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#DC1FFF] mr-2"></div>
                    <span className="text-sm text-gray-400">Baseline Reference</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Platform Distribution */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border border-gray-800 bg-card/60 backdrop-blur-sm h-full">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-1">Trending Visibility</h3>
                <p className="text-sm text-gray-500 mb-6">Distribution across platforms</p>
                
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={platformData}
                      margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                      barSize={36}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                      <XAxis 
                        dataKey="name"
                        stroke="#666"
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        tickFormatter={(value) => `${value}%`}
                        stroke="#666"
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Visibility']}
                      />
                      <Bar 
                        dataKey="value" 
                        radius={[4, 4, 0, 0]}
                      >
                        {platformData.map((entry, index) => (
                          <motion.rect 
                            key={index}
                            fill={entry.color}
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <SiSolana className="h-5 w-5 text-[#00FFA3] mr-2" />
                      <span className="text-sm font-medium">DEXTools Trending Placement</span>
                    </div>
                    <span className="text-sm font-semibold">Top 3</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <motion.div 
                      className="bg-gradient-to-r from-[#00FFA3] to-[#DC1FFF] h-2 rounded-full" 
                      initial={{ width: 0 }}
                      whileInView={{ width: '85%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="inline-flex items-center bg-gradient-to-r from-[#00FFA3]/10 to-[#DC1FFF]/10 border border-gray-800 rounded-lg p-4 shadow-lg backdrop-blur-sm max-w-lg mx-auto">
            <div className="font-medium">
              <p className="text-gray-300 mb-1">
                <SiSolana className="inline mr-2 text-[#00FFA3]" />
                Increase your token's visibility on DEX platforms with our technical solution
              </p>
              <p className="text-sm text-gray-500">
                See our detailed documentation for platform-specific impact metrics
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}