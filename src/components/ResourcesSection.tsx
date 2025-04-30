import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ChevronRight, BookOpen, Code, FileText, Terminal, Copy, Check, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ResourcesSection() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(text);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  return (
    <section id="resources" className="py-20 bg-gradient-to-b from-[#0c0c15] to-[#0e0e1a] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[350px] -left-[350px] w-[700px] h-[700px] rounded-full bg-[#9945FF]/5 blur-[120px]"></div>
        <div className="absolute -bottom-[350px] -right-[350px] w-[700px] h-[700px] rounded-full bg-[#14F195]/5 blur-[120px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
              Resources & Documentation
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to get started with Solana Volume Bot. Learn how to connect your tokens, 
              manage volume settings, and access our API - all in one place.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto mt-6 bg-[#0a0a12] border border-amber-500/30 rounded-lg p-4"
          >
            <p className="text-amber-400 text-sm font-medium mb-1">Disclaimer:</p>
            <p className="text-gray-300 text-sm">
              Solana Volume Bot is a technical visibility tool designed to help tokens appear in trending lists through distributed on-chain activity. It is <strong>not</strong> a financial service, trading bot, investment advisor, or price manipulation tool. This documentation is for informational purposes only and does not constitute financial advice. Results vary based on market conditions, token liquidity, and other factors.
            </p>
          </motion.div>
        </div>

        <Tabs defaultValue="documentation" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="documentation" className="flex items-center justify-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Documentation</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center justify-center gap-2">
              <Code className="h-4 w-4" />
              <span>API Reference</span>
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="flex items-center justify-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Tutorials</span>
            </TabsTrigger>
          </TabsList>

          {/* Documentation Content */}
          <TabsContent value="documentation" className="mt-0">
            <div className="bg-[#0c0c15]/70 backdrop-blur-sm border border-[#1e2035] rounded-xl p-5 md:p-8 shadow-lg">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="what-is-solana-volume-bot" className="border-b border-[#1e2035]">
                  <AccordionTrigger className="text-white hover:text-[#14F195] transition-colors">
                    What is Solana Volume Bot?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p className="mb-3">
                      Solana Volume Bot is a technical platform designed to enhance token visibility through simulated on-chain volume distribution. It helps Solana-based tokens become more discoverable across major platforms like Pump.fun, DEXTools, and Dexscreener.
                    </p>
                    <p className="mb-3">
                      The system creates distributed transaction patterns that mimic organic activity by utilizing multiple wallet addresses with various transaction sizes and timing parameters. This helps tokens appear more active in network metrics.
                    </p>
                    <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-3 my-3">
                      <p className="text-amber-400 text-sm font-medium">Important Note:</p>
                      <p className="text-gray-300 text-sm">This tool is for visibility enhancement purposes only and does not offer financial advice, trading signals, or price manipulation services. Results vary based on market conditions and token parameters.</p>
                    </div>
                    <h4 className="font-medium text-white mt-4 mb-2">Technical Capabilities:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
                      <li>Enhanced token discoverability on DEX trending lists</li>
                      <li>Improved visibility in platform activity charts</li>
                      <li>Distributed transaction patterns across multiple wallets</li>
                      <li>Technical metrics improvement for token analytics</li>
                      <li>Customizable volume distribution strategies</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="connecting-your-token" className="border-b border-[#1e2035]">
                  <AccordionTrigger className="text-white hover:text-[#14F195] transition-colors">
                    How to Connect Your Token
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-white mb-2">Step 1: Token Information</h4>
                        <p>Provide your token's contract address and basic information:</p>
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                          <li>Token contract address (SPL Token ID)</li>
                          <li>Token name and symbol</li>
                          <li>Current liquidity pool details</li>
                          <li>Raydium, Orca, or other DEX pair information</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Step 2: Liquidity Verification</h4>
                        <p>Our system will verify your token has sufficient liquidity to support volume operations:</p>
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                          <li>Minimum liquidity requirements: 2 SOL or equivalent</li>
                          <li>Token must be tradable on supported DEXes</li>
                          <li>No honeypot or trading restrictions allowed</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Step 3: Dashboard Connection</h4>
                        <p>Once verified, your token will be connected to your dashboard:</p>
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                          <li>Generate your API key for token management</li>
                          <li>Connect your wallet to add funds for operations</li>
                          <li>Configure network fees settings</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="volume-settings" className="border-b border-[#1e2035]">
                  <AccordionTrigger className="text-white hover:text-[#14F195] transition-colors">
                    Setting Up Volume Parameters
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-white mb-2">Volume Intensity</h4>
                        <p>Configure the daily volume target for your token:</p>
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                          <li>Low: 1-5% of market cap (most natural looking)</li>
                          <li>Medium: 5-15% of market cap (balanced approach)</li>
                          <li>High: 15-30% of market cap (aggressive visibility)</li>
                          <li>Custom: Set specific volume targets in SOL</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Trading Pattern</h4>
                        <p>Select the pattern that best fits your token strategy:</p>
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                          <li>Natural: Random variations throughout the day</li>
                          <li>Ascending: Gradually increasing volume</li>
                          <li>Pulsed: Periodic volume spikes between quiet periods</li>
                          <li>Custom: Design your own pattern with our visual editor</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Wallet Distribution</h4>
                        <p>Configure how many wallets will participate in creating volume:</p>
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                          <li>Standard: 5-10 wallets (recommended for most tokens)</li>
                          <li>Enhanced: 10-25 wallets (better for larger market cap tokens)</li>
                          <li>Premium: 25-50+ wallets (maximum realism and distribution)</li>
                        </ul>
                        <p className="mt-2 text-sm bg-[#14F195]/10 p-2 rounded">Note: Higher wallet counts provide more natural-looking volume but require more operational resources.</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="troubleshooting" className="border-b border-[#1e2035]">
                  <AccordionTrigger className="text-white hover:text-[#14F195] transition-colors">
                    Troubleshooting Common Issues
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-white mb-2">Volume Not Appearing on DEXTools</h4>
                        <p>If your volume isn't being tracked correctly:</p>
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                          <li>Verify your token is properly indexed by DEXTools</li>
                          <li>Ensure your token has the correct pair addresses configured</li>
                          <li>Check that your liquidity is above the minimum threshold</li>
                          <li>Allow 2-4 hours for DEXTools to update after initial setup</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Insufficient Balance Errors</h4>
                        <p>If you're seeing insufficient balance warnings:</p>
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                          <li>Top up your connected wallet with SOL for gas fees</li>
                          <li>Reduce your volume settings if operating costs exceed your plan</li>
                          <li>Check for any failed transactions in your operation logs</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Fluctuating Price Impact</h4>
                        <p>If your token price is moving too much from volume activity:</p>
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                          <li>Increase your liquidity depth in the token pool</li>
                          <li>Lower the transaction size in your volume settings</li>
                          <li>Switch to "Balanced Buy/Sell" mode to neutralize price impact</li>
                          <li>Adjust to "Low Impact" trading algorithm in advanced settings</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">24h Support Access</h4>
                        <p>For issues not covered here, premium subscribers can access our 24/7 support:</p>
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                          <li>Use the live chat feature in your dashboard</li>
                          <li>Check your email for support ticket updates</li>
                          <li>Schedule a call with our technical team for complex issues</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>

          {/* API Reference Content */}
          <TabsContent value="api" className="mt-0">
            <div className="bg-[#0c0c15]/70 backdrop-blur-sm border border-[#1e2035] rounded-xl p-5 md:p-8 shadow-lg">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-3">Solana Volume Bot API</h3>
                <p className="text-gray-300">
                  Our RESTful API allows you to programmatically manage your volume operations, monitor performance, 
                  and integrate Solana Volume Bot with your existing systems. All endpoints require authentication 
                  using your API key.
                </p>
              </div>

              <div className="mb-8">
                <h4 className="font-medium text-white mb-3 flex items-center">
                  <Terminal className="mr-2 h-5 w-5 text-[#14F195]" /> Authentication
                </h4>
                <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-4 mb-4">
                  <div className="flex items-start">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      All API requests require a valid API key passed in the <code className="text-[#14F195] bg-[#14F195]/10 px-1 py-0.5 rounded">X-API-Key</code> header.
                      Your API key can be found in your Solana Volume Bot dashboard under Account Settings.
                    </p>
                  </div>
                </div>
                <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-2">Example Request:</p>
                  <div className="flex items-start">
                    <pre className="text-xs text-gray-300 font-mono leading-relaxed overflow-x-auto w-full">
{`curl -X GET https://api.solanavolumebot.io/v1/tokens \\
  -H "X-API-Key: your_api_key_here" \\
  -H "Content-Type: application/json"`}
                    </pre>
                    <button 
                      onClick={() => copyToClipboard(`curl -X GET https://api.solanavolumebot.io/v1/tokens \\
  -H "X-API-Key: your_api_key_here" \\
  -H "Content-Type: application/json"`)}
                      className="ml-2 p-1 rounded-md hover:bg-[#1e2035]/50 flex-shrink-0"
                      aria-label="Copy to clipboard"
                    >
                      {copiedEndpoint === `curl -X GET https://api.solanavolumebot.io/v1/tokens \\
  -H "X-API-Key: your_api_key_here" \\
  -H "Content-Type: application/json"` ? 
                        <Check className="h-4 w-4 text-[#14F195]" /> : 
                        <Copy className="h-4 w-4 text-gray-400" />
                      }
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Token Management Endpoints */}
                <div>
                  <h4 className="font-medium text-white mb-3">Token Management</h4>
                  
                  {/* Endpoint: List Tokens */}
                  <div className="border border-[#1e2035] rounded-lg overflow-hidden mb-4">
                    <div className="bg-[#1e2035]/30 p-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded-md bg-blue-600/20 text-blue-400 text-xs font-medium mr-2">GET</span>
                        <code className="text-sm text-gray-300">/v1/tokens</code>
                      </div>
                      <button 
                        onClick={() => copyToClipboard("/v1/tokens")}
                        className="p-1 rounded-md hover:bg-[#1e2035]/50"
                        aria-label="Copy endpoint"
                      >
                        {copiedEndpoint === "/v1/tokens" ? 
                          <Check className="h-4 w-4 text-[#14F195]" /> : 
                          <Copy className="h-4 w-4 text-gray-400" />
                        }
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-300 text-sm mb-3">Lists all tokens connected to your account.</p>
                      <div className="bg-[#0a0a12] rounded-lg p-3 mb-3">
                        <p className="text-xs text-gray-400 mb-1">Response:</p>
                        <pre className="text-xs text-gray-300 font-mono overflow-x-auto">
{`{
  "success": true,
  "tokens": [
    {
      "id": "token_12345",
      "address": "So11111111111111111111111111111111111111112",
      "symbol": "SOL",
      "name": "Solana",
      "status": "active",
      "volume_24h": 2500.45,
      "created_at": "2025-04-01T12:00:00Z"
    },
    ...
  ]
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                  
                  {/* Endpoint: Add New Token */}
                  <div className="border border-[#1e2035] rounded-lg overflow-hidden mb-4">
                    <div className="bg-[#1e2035]/30 p-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded-md bg-green-600/20 text-green-400 text-xs font-medium mr-2">POST</span>
                        <code className="text-sm text-gray-300">/v1/tokens</code>
                      </div>
                      <button 
                        onClick={() => copyToClipboard("/v1/tokens")}
                        className="p-1 rounded-md hover:bg-[#1e2035]/50"
                        aria-label="Copy endpoint"
                      >
                        {copiedEndpoint === "/v1/tokens" ? 
                          <Check className="h-4 w-4 text-[#14F195]" /> : 
                          <Copy className="h-4 w-4 text-gray-400" />
                        }
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-300 text-sm mb-3">Adds a new token to your account for volume operations.</p>
                      <div className="bg-[#0a0a12] rounded-lg p-3 mb-3">
                        <p className="text-xs text-gray-400 mb-1">Request Body:</p>
                        <pre className="text-xs text-gray-300 font-mono overflow-x-auto">
{`{
  "address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "dex_pair": "raydium",
  "pair_address": "58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2"
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                  
                  {/* Endpoint: Get Token Details */}
                  <div className="border border-[#1e2035] rounded-lg overflow-hidden">
                    <div className="bg-[#1e2035]/30 p-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded-md bg-blue-600/20 text-blue-400 text-xs font-medium mr-2">GET</span>
                        <code className="text-sm text-gray-300">/v1/tokens/:token_id</code>
                      </div>
                      <button 
                        onClick={() => copyToClipboard("/v1/tokens/:token_id")}
                        className="p-1 rounded-md hover:bg-[#1e2035]/50"
                        aria-label="Copy endpoint"
                      >
                        {copiedEndpoint === "/v1/tokens/:token_id" ? 
                          <Check className="h-4 w-4 text-[#14F195]" /> : 
                          <Copy className="h-4 w-4 text-gray-400" />
                        }
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-300 text-sm mb-3">Get detailed information about a specific token.</p>
                    </div>
                  </div>
                </div>
                
                {/* Volume Operations Endpoints */}
                <div>
                  <h4 className="font-medium text-white mb-3">Volume Operations</h4>
                  
                  {/* Endpoint: Create Volume Campaign */}
                  <div className="border border-[#1e2035] rounded-lg overflow-hidden mb-4">
                    <div className="bg-[#1e2035]/30 p-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded-md bg-green-600/20 text-green-400 text-xs font-medium mr-2">POST</span>
                        <code className="text-sm text-gray-300">/v1/campaigns</code>
                      </div>
                      <button 
                        onClick={() => copyToClipboard("/v1/campaigns")}
                        className="p-1 rounded-md hover:bg-[#1e2035]/50"
                        aria-label="Copy endpoint"
                      >
                        {copiedEndpoint === "/v1/campaigns" ? 
                          <Check className="h-4 w-4 text-[#14F195]" /> : 
                          <Copy className="h-4 w-4 text-gray-400" />
                        }
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-300 text-sm mb-3">Create a new volume campaign for a token.</p>
                      <div className="bg-[#0a0a12] rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Request Body:</p>
                        <pre className="text-xs text-gray-300 font-mono overflow-x-auto">
{`{
  "token_id": "token_12345",
  "volume_target": 5000,
  "duration_hours": 24,
  "pattern": "natural",
  "wallet_count": 15,
  "price_impact_limit": 2.5
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                  
                  {/* Endpoint: Get Volume Stats */}
                  <div className="border border-[#1e2035] rounded-lg overflow-hidden">
                    <div className="bg-[#1e2035]/30 p-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded-md bg-blue-600/20 text-blue-400 text-xs font-medium mr-2">GET</span>
                        <code className="text-sm text-gray-300">/v1/stats/volume/:token_id</code>
                      </div>
                      <button 
                        onClick={() => copyToClipboard("/v1/stats/volume/:token_id")}
                        className="p-1 rounded-md hover:bg-[#1e2035]/50"
                        aria-label="Copy endpoint"
                      >
                        {copiedEndpoint === "/v1/stats/volume/:token_id" ? 
                          <Check className="h-4 w-4 text-[#14F195]" /> : 
                          <Copy className="h-4 w-4 text-gray-400" />
                        }
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-300 text-sm mb-3">Get volume statistics for a specific token.</p>
                      <div className="bg-[#0a0a12] rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Query Parameters:</p>
                        <pre className="text-xs text-gray-300 font-mono overflow-x-auto">
{`period: "day" | "week" | "month" (default: "day")
from: YYYY-MM-DD (optional)
to: YYYY-MM-DD (optional)`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-[#1e2035] pt-6">
                <h4 className="font-medium text-white mb-3">Rate Limits & Usage</h4>
                <p className="text-gray-300 text-sm mb-4">
                  API rate limits are based on your subscription plan:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-4">
                    <h5 className="text-[#14F195] font-medium mb-2">Standard Plan</h5>
                    <p className="text-gray-300 text-sm">60 requests per minute</p>
                  </div>
                  <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-4">
                    <h5 className="text-[#14F195] font-medium mb-2">Premium Plan</h5>
                    <p className="text-gray-300 text-sm">300 requests per minute</p>
                  </div>
                  <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-4">
                    <h5 className="text-[#14F195] font-medium mb-2">Enterprise Plan</h5>
                    <p className="text-gray-300 text-sm">1,000+ requests per minute</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-4">
                  API rate limit headers are returned with each response to help you track your usage.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Tutorials Content */}
          <TabsContent value="tutorials" className="mt-0">
            <div className="bg-[#0c0c15]/70 backdrop-blur-sm border border-[#1e2035] rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1e2035]">
                {/* Tutorial 1 */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="p-6 text-left hover:bg-[#1e2035]/10 transition-colors group">
                      <div className="flex justify-between items-start mb-3">
                        <div className="p-2 bg-[#14F195]/10 rounded-lg">
                          <ArrowRight className="h-5 w-5 text-[#14F195]" />
                        </div>

                      </div>
                      <h3 className="text-lg font-medium text-white mb-2 group-hover:text-[#14F195] transition-colors">Connect Your Solana Token in Under 5 Minutes</h3>
                      <p className="text-gray-400 text-sm">Quick start guide for connecting your Solana token to the Volume Bot platform.</p>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-3xl overflow-y-auto max-h-[90vh] bg-[#0c0c15] border-[#1e2035]" onEscapeKeyDown={(e) => e.preventDefault()}>
                    <DialogHeader className="relative">
                      <DialogTitle className="text-xl font-bold text-white">Connect Your Solana Token in Under 5 Minutes</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        A complete step-by-step guide to connecting your token to Solana Volume Bot
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 text-gray-300">
                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Prerequisites</h4>
                        <p className="mb-3">Before you start, make sure you have:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Your Solana token's contract address (SPL Token ID)</li>
                          <li>Access to a wallet that has ownership or management permissions for the token</li>
                          <li>At least 2 SOL of liquidity in a supported DEX pool (Raydium, Orca, etc.)</li>
                          <li>An active Solana Volume Bot subscription plan</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Step 1: Access Your Dashboard</h4>
                        <p className="mb-3">Log in to your Solana Volume Bot account and navigate to the "Tokens" section of your dashboard. Click the "Add New Token" button in the upper right corner.</p>
                        <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-4 my-3">
                          <p className="text-sm text-[#14F195]">Pro Tip:</p>
                          <p className="text-sm">If you haven't created an account yet, you can sign up for a 7-day free trial that includes full access to all features.</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Step 2: Enter Token Details</h4>
                        <p>In the token creation form, enter the following information:</p>
                        <ol className="list-decimal pl-5 space-y-2 my-3">
                          <li><span className="font-medium text-white">Token Address:</span> Enter your SPL token address (starts with a Solana address format)</li>
                          <li><span className="font-medium text-white">DEX Selection:</span> Choose the primary DEX where your token's liquidity is located (Raydium, Orca, etc.)</li>
                          <li><span className="font-medium text-white">Pair Address:</span> Enter the liquidity pool pair address (the system may auto-detect this)</li>
                          <li><span className="font-medium text-white">Display Name:</span> (Optional) A custom name for your token in the dashboard</li>
                        </ol>
                        <p>Click "Verify Token" to proceed to the next step.</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Step 3: Liquidity Verification</h4>
                        <p className="mb-3">The system will now verify your token's liquidity and tradability. This usually takes 30-60 seconds. You'll see a progress indicator during the verification process.</p>
                        <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-4 my-3">
                          <p className="text-sm text-amber-400">Common Issues:</p>
                          <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
                            <li><span className="text-white">Insufficient Liquidity:</span> Add more liquidity to your token's pool (minimum 2 SOL)</li>
                            <li><span className="text-white">Trading Restrictions:</span> Remove any honeypot or anti-bot mechanisms</li>
                            <li><span className="text-white">Incorrect Pair Address:</span> Double-check your liquidity pool address</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Step 4: Volume Settings Configuration</h4>
                        <p className="mb-3">Once your token is verified, you'll be redirected to the volume settings page. Here you can configure:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li><span className="font-medium text-white">Daily Volume Target:</span> How much trading volume to generate (in SOL)</li>
                          <li><span className="font-medium text-white">Trading Pattern:</span> Natural, Ascending, Pulsed, or Custom</li>
                          <li><span className="font-medium text-white">Wallet Distribution:</span> Number of wallets to use for transactions</li>
                          <li><span className="font-medium text-white">Price Impact Limit:</span> Maximum allowed price change per transaction</li>
                        </ul>
                        <p className="mt-3">Click "Save Settings" to finalize your configuration.</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Step 5: Activation</h4>
                        <p className="mb-3">After saving your settings, you'll be taken to the activation page. Here you can:</p>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Review your chosen settings and estimated operational costs</li>
                          <li>Set the start time (immediate or scheduled)</li>
                          <li>Toggle the "Activate" switch to begin volume operations</li>
                        </ol>
                        <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-4 my-3">
                          <p className="text-sm text-[#14F195]">Success Indicators:</p>
                          <p className="text-sm">Within 1-2 hours after activation, you should start seeing increased volume on DEXTools, Pump.fun, and other tracking platforms. Your token's visibility metrics will begin to improve within 12-24 hours.</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#1e2035]">
                        <h4 className="text-lg font-medium text-white mb-2">Next Steps</h4>
                        <p>Once your token is connected and active, explore these additional features:</p>
                        <ul className="list-disc pl-5 space-y-1 my-3">
                          <li>Set up volume alerts and notifications</li>
                          <li>Configure advanced trading patterns in the Strategy Builder</li>
                          <li>Connect additional tokens with our multi-token discount</li>
                        </ul>
                        
                        <DialogClose asChild>
                          <button 
                            onClick={() => {
                              const resourcesSection = document.getElementById('resources');
                              if (resourcesSection) {
                                resourcesSection.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                            className="mt-4 px-4 py-2 bg-[#14F195]/20 hover:bg-[#14F195]/30 text-[#14F195] rounded-lg border border-[#14F195]/50 transition-all duration-200"
                          >
                            Back to Resources
                          </button>
                        </DialogClose>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Tutorial 2 */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="p-6 text-left hover:bg-[#1e2035]/10 transition-colors group">
                      <div className="flex justify-between items-start mb-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                          <ArrowRight className="h-5 w-5 text-purple-400" />
                        </div>

                      </div>
                      <h3 className="text-lg font-medium text-white mb-2 group-hover:text-[#14F195] transition-colors">Configure Advanced Volume Distribution</h3>
                      <p className="text-gray-400 text-sm">Create strategic volume distribution patterns for improved token visibility.</p>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-3xl overflow-y-auto max-h-[90vh] bg-[#0c0c15] border-[#1e2035]" onEscapeKeyDown={(e) => e.preventDefault()}>
                    <DialogHeader className="relative">
                      <DialogTitle className="text-xl font-bold text-white">Configure Advanced Volume Distribution Patterns</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Learn how to create strategic volume distribution patterns that enhance token visibility without disrupting market metrics
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 text-gray-300">
                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Understanding Whale Transactions</h4>
                        <p className="mb-3">Whale transactions (large-volume trades) naturally attract attention from traders and can signal confidence in a token. However, poorly executed whale simulation can cause:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Extreme price volatility</li>
                          <li>Suspicious trading patterns that look artificial</li>
                          <li>Negative sentiment if handled poorly</li>
                        </ul>
                        <p className="mt-3">This tutorial will teach you how to create realistic, beneficial whale patterns.</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Step 1: Plan Your Whale Strategy</h4>
                        <p className="mb-3">Before configuring any settings, determine your whale strategy objectives:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                          <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-4">
                            <h5 className="font-medium text-white mb-2">Accumulation Pattern</h5>
                            <p className="text-sm">Series of medium buys followed by occasional large buys, showing steady accumulation over time.</p>
                            <p className="text-xs text-[#14F195] mt-2">Best for: New tokens establishing credibility</p>
                          </div>
                          <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-4">
                            <h5 className="font-medium text-white mb-2">Confidence Pattern</h5>
                            <p className="text-sm">Large buys after small dips, demonstrating whale confidence during temporary price drops.</p>
                            <p className="text-xs text-[#14F195] mt-2">Best for: Tokens needing price support</p>
                          </div>
                          <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-4">
                            <h5 className="font-medium text-white mb-2">Distribution Pattern</h5>
                            <p className="text-sm">Occasional large sells matched with multiple smaller buys to show controlled profit-taking.</p>
                            <p className="text-xs text-[#14F195] mt-2">Best for: Mature tokens maintaining stability</p>
                          </div>
                          <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-4">
                            <h5 className="font-medium text-white mb-2">Breakout Pattern</h5>
                            <p className="text-sm">Sudden increase in buy volume across multiple wallet sizes to simulate organic interest surge.</p>
                            <p className="text-xs text-[#14F195] mt-2">Best for: Tokens with positive news events</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Step 2: Configure Advanced Volume Settings</h4>
                        <p className="mb-3">In your token's Volume Settings page, switch to "Advanced Mode" and configure:</p>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li><span className="font-medium text-white">Transaction Size Distribution:</span> Set to "Custom" and use the slider to allocate percentage between Small, Medium, and Large transactions</li>
                          <li><span className="font-medium text-white">Whale Transaction Threshold:</span> Define what qualifies as a "whale" transaction for your token (typically 2-5% of daily volume in a single transaction)</li>
                          <li><span className="font-medium text-white">Frequency:</span> Set how often whale transactions should occur (recommended: 2-4 per day maximum)</li>
                        </ol>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Step 3: Time Distribution Settings</h4>
                        <p className="mb-3">Whale transactions should be strategically timed for maximum impact:</p>
                        <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-4 my-3">
                          <h5 className="font-medium text-white mb-2">Recommended Timing Patterns</h5>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li><span className="text-white">Morning Activity:</span> Schedule smaller transactions early in the day (8-10 AM UTC)</li>
                            <li><span className="text-white">Mid-day Whale:</span> Place a significant whale transaction during peak trading (1-3 PM UTC)</li>
                            <li><span className="text-white">Evening Support:</span> Schedule medium-sized transactions for evening hours (7-9 PM UTC)</li>
                          </ul>
                          <p className="text-xs text-[#14F195] mt-2">Use the Time Distribution chart in the dashboard to visualize and adjust your pattern</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Step 4: Wallet Aging and Preparation</h4>
                        <p className="mb-3">For realistic whale simulation, proper wallet preparation is crucial:</p>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Enable the "Premium Wallet Aging" feature in your dashboard</li>
                          <li>Set the recommended 3-5 day aging period for primary whale wallets</li>
                          <li>Allow the system to generate preliminary transaction history</li>
                          <li>Allocate 3-5 dedicated wallets for whale transactions (out of your total wallet allocation)</li>
                        </ol>
                        <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-4 my-3">
                          <p className="text-sm text-amber-400">Important:</p>
                          <p className="text-sm">Wallet aging requires premium subscription tier and adds 3-5 days to your initial setup time, but dramatically increases the realism and effectiveness of whale transaction patterns.</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Step 5: Price Impact Management</h4>
                        <p className="mb-3">Whale transactions can significantly impact price - control this with:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li><span className="font-medium text-white">Slippage Thresholds:</span> Set maximum acceptable price impact per whale transaction</li>
                          <li><span className="font-medium text-white">Adaptive Sizing:</span> Enable the AI to adjust transaction size based on current liquidity</li>
                          <li><span className="font-medium text-white">Transaction Splitting:</span> Break large transactions into multiple smaller ones over short periods</li>
                          <li><span className="font-medium text-white">Counterbalanced Transactions:</span> Automatic smaller trades in opposite direction to stabilize price</li>
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-[#1e2035]">
                        <h4 className="text-lg font-medium text-white mb-2">Monitoring and Optimization</h4>
                        <p className="mb-3">After implementing your whale strategy:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Monitor DEXTools and Pump.fun rankings daily to gauge effectiveness</li>
                          <li>Check "Whale Impact Analytics" in your dashboard to see trader reactions</li>
                          <li>Adjust patterns based on the 7-day performance metrics</li>
                          <li>Consider A/B testing different whale patterns using our split testing feature</li>
                        </ul>
                        <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-4 mt-3">
                          <p className="text-sm text-[#14F195]">Expert Tip:</p>
                          <p className="text-sm">The most effective whale strategies are those that appear natural and align with your token's market narrative. Drastic pattern changes can appear suspicious - implement changes gradually over 3-5 days.</p>
                        </div>
                        
                        <DialogClose asChild>
                          <button 
                            onClick={() => {
                              const resourcesSection = document.getElementById('resources');
                              if (resourcesSection) {
                                resourcesSection.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                            className="mt-4 px-4 py-2 bg-[#14F195]/20 hover:bg-[#14F195]/30 text-[#14F195] rounded-lg border border-[#14F195]/50 transition-all duration-200"
                          >
                            Back to Resources
                          </button>
                        </DialogClose>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Tutorial 3 */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="p-6 text-left hover:bg-[#1e2035]/10 transition-colors group">
                      <div className="flex justify-between items-start mb-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <ArrowRight className="h-5 w-5 text-blue-400" />
                        </div>

                      </div>
                      <h3 className="text-lg font-medium text-white mb-2 group-hover:text-[#14F195] transition-colors">Using Multiple Wallets for Realistic Volume</h3>
                      <p className="text-gray-400 text-sm">Master the art of distributed volume across multiple wallets for maximum authenticity.</p>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-3xl overflow-y-auto max-h-[90vh] bg-[#0c0c15] border-[#1e2035]" onEscapeKeyDown={(e) => e.preventDefault()}>
                    <DialogHeader className="relative">
                      <DialogTitle className="text-xl font-bold text-white">Using Multiple Wallets for Realistic Volume</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        A comprehensive guide to creating realistic trading volume by effectively using multiple wallet accounts
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 text-gray-300">
                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Why Multiple Wallets Matter</h4>
                        <p className="mb-3">Using multiple wallets for volume generation is critical for several reasons:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Trading from a single wallet is easy to identify as artificial volume</li>
                          <li>Multiple wallets create the appearance of diverse investor interest</li>
                          <li>Different wallet behaviors can simulate various trader types</li>
                          <li>Distribution across wallets reduces detection risk on tracking platforms</li>
                        </ul>
                        <p className="mt-3">This tutorial covers advanced techniques for optimizing multi-wallet strategies.</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Step 1: Wallet Quantity and Allocation</h4>
                        <p className="mb-3">Determining the right number of wallets based on your token's market cap is crucial:</p>
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-[#0a0a12] border border-[#1e2035] rounded-lg my-3">
                            <thead>
                              <tr className="border-b border-[#1e2035]">
                                <th className="py-2 px-4 text-left text-sm font-medium text-white">Token Size</th>
                                <th className="py-2 px-4 text-left text-sm font-medium text-white">Recommended Wallets</th>
                                <th className="py-2 px-4 text-left text-sm font-medium text-white">Wallet Distribution</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-[#1e2035]">
                                <td className="py-2 px-4 text-sm">Micro (&lt;$100k)</td>
                                <td className="py-2 px-4 text-sm">5-10 wallets</td>
                                <td className="py-2 px-4 text-sm">60% small, 30% medium, 10% large</td>
                              </tr>
                              <tr className="border-b border-[#1e2035]">
                                <td className="py-2 px-4 text-sm">Small ($100k-$1M)</td>
                                <td className="py-2 px-4 text-sm">10-15 wallets</td>
                                <td className="py-2 px-4 text-sm">50% small, 35% medium, 15% large</td>
                              </tr>
                              <tr className="border-b border-[#1e2035]">
                                <td className="py-2 px-4 text-sm">Medium ($1M-$10M)</td>
                                <td className="py-2 px-4 text-sm">15-25 wallets</td>
                                <td className="py-2 px-4 text-sm">40% small, 40% medium, 20% large</td>
                              </tr>
                              <tr>
                                <td className="py-2 px-4 text-sm">Large ($10M+)</td>
                                <td className="py-2 px-4 text-sm">25-50+ wallets</td>
                                <td className="py-2 px-4 text-sm">30% small, 45% medium, 25% large</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <p className="mt-2 text-sm">In the Solana Volume Bot dashboard, navigate to "Advanced Settings" → "Wallet Management" to configure your wallet distribution.</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Step 2: Wallet Personality Configuration</h4>
                        <p className="mb-3">Each wallet should have a distinct "trading personality" to create realistic patterns:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                          <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-4">
                            <h5 className="font-medium text-white mb-2">Scalper Wallets (20-30%)</h5>
                            <p className="text-sm">Configure these wallets to make frequent, small transactions with short holding periods. Set transaction frequency to "High" and size to "Small".</p>
                          </div>
                          <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-4">
                            <h5 className="font-medium text-white mb-2">Swing Trader Wallets (30-40%)</h5>
                            <p className="text-sm">These wallets should make medium-sized trades on a regular but less frequent basis. Set holding periods between 4-48 hours.</p>
                          </div>
                          <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-4">
                            <h5 className="font-medium text-white mb-2">Position Builder Wallets (20-30%)</h5>
                            <p className="text-sm">Configure these to consistently accumulate tokens with primarily buy orders and occasional profit-taking sells.</p>
                          </div>
                          <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-4">
                            <h5 className="font-medium text-white mb-2">Whale Wallets (5-10%)</h5>
                            <p className="text-sm">These make infrequent but large transactions that can influence market sentiment. Limit to 1-3 transactions per day.</p>
                          </div>
                        </div>
                        <p className="mt-2 text-sm">Use the "Wallet Personality Editor" in your dashboard to configure these settings for each wallet group.</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Step 3: Wallet History Development</h4>
                        <p className="mb-3">For maximum authenticity, wallets should have realistic transaction histories:</p>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li><span className="font-medium text-white">Enable "Wallet Conditioning"</span> in your dashboard settings</li>
                          <li><span className="font-medium text-white">Set Aging Period:</span> Allow 3-7 days for the system to build natural history</li>
                          <li><span className="font-medium text-white">Multi-Token Activity:</span> Enable trading on 2-3 established tokens to create diversified history</li>
                          <li><span className="font-medium text-white">Native Chain Activity:</span> Add small SOL transfers between wallets for natural blockchain usage patterns</li>
                        </ol>
                        <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-4 my-3">
                          <p className="text-sm text-amber-400">Important Note:</p>
                          <p className="text-sm">Wallet conditioning requires premium subscription features and increases your setup time, but provides dramatically more realistic results that can withstand scrutiny from trackers and analysts.</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Step 4: Transaction Timing Distribution</h4>
                        <p className="mb-3">Realistic wallet activity follows specific timing patterns:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li><span className="font-medium text-white">Avoid Synchronization:</span> Transactions from different wallets should not occur at predictable intervals</li>
                          <li><span className="font-medium text-white">Time Zone Simulation:</span> Distribute activity to simulate traders in different geographical locations</li>
                          <li><span className="font-medium text-white">Market Reaction:</span> Configure some wallets to react to price movements (buy dips, sell peaks)</li>
                          <li><span className="font-medium text-white">Natural Pauses:</span> Include periods of lower activity during certain hours</li>
                        </ul>
                        <p className="mt-3">Use the "24h Activity Heat Map" in your dashboard to configure these timing patterns.</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Step 5: Implementing Cross-Wallet Strategies</h4>
                        <p className="mb-3">Advanced strategies that involve multiple wallets interacting:</p>
                        <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-4 my-3">
                          <h5 className="font-medium text-white mb-2">Strategic Wallet Groups</h5>
                          <ol className="list-decimal pl-5 space-y-1 text-sm">
                            <li><span className="text-white">Momentum Group:</span> Configure 3-5 wallets to trade in the same direction within a 30-60 minute window</li>
                            <li><span className="text-white">Counter-Trend Group:</span> Set 2-3 wallets to trade against the current price movement to create natural resistance/support</li>
                            <li><span className="text-white">Stability Group:</span> Configure 4-6 wallets to make balanced buy/sell transactions to maintain price within a range</li>
                          </ol>
                        </div>
                        <p className="text-sm">Access these features under "Strategy Builder" → "Multi-Wallet Coordination" in the premium dashboard.</p>
                      </div>

                      <div className="pt-4 border-t border-[#1e2035]">
                        <h4 className="text-lg font-medium text-white mb-2">Monitoring and Analysis</h4>
                        <p className="mb-3">Continuous monitoring ensures your multi-wallet strategy remains effective:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Track "Volume Authentication Score" in your dashboard - aim for 85%+</li>
                          <li>Review "Wallet Pattern Analysis" reports weekly to identify potential patterns</li>
                          <li>Monitor DEXTools "Volume Quality" metrics to ensure your volume is being recognized</li>
                          <li>Adjust wallet distribution if you notice changing effectiveness</li>
                        </ul>
                        <div className="bg-[#0a0a12] border border-[#1e2035] rounded-lg p-4 mt-3">
                          <p className="text-sm text-[#14F195]">Advanced Strategy:</p>
                          <p className="text-sm">For tokens with long-term volume needs, implement the "Progressive Evolution" strategy - gradually change wallet behaviors over 3-4 weeks to simulate changing market conditions and investor sentiment. This prevents pattern detection by advanced tracking systems.</p>
                        </div>
                        
                        <DialogClose asChild>
                          <button 
                            onClick={() => {
                              const resourcesSection = document.getElementById('resources');
                              if (resourcesSection) {
                                resourcesSection.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                            className="mt-4 px-4 py-2 bg-[#14F195]/20 hover:bg-[#14F195]/30 text-[#14F195] rounded-lg border border-[#14F195]/50 transition-all duration-200"
                          >
                            Back to Resources
                          </button>
                        </DialogClose>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}