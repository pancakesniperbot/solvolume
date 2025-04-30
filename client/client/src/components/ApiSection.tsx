import { useState } from "react";
import { motion } from "framer-motion";
import { Code, ArrowRight, Copy, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CyberpunkBackground } from "./CyberpunkBackground";

export function ApiSection() {
  const [activeTab, setActiveTab] = useState("overview");
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);
  
  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };
  
  return (
    <section id="api" className="py-20 relative overflow-hidden">
      {/* Cyberpunk background */}
      <CyberpunkBackground variant="dark" withGrid withGlitch />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-[#14F195]/10 p-3 rounded-full">
              <Code className="h-8 w-8 text-[#14F195]" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful <span className="text-[#14F195]">API Integration</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Integrate Solana Volume Bot functionality directly into your applications with our comprehensive API suite.
          </p>
        </motion.div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-[#1e2035]/50 border border-[#1e2035] p-1">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-[#14F195] data-[state=active]:text-black"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="endpoints" 
                className="data-[state=active]:bg-[#14F195] data-[state=active]:text-black"
              >
                Endpoints
              </TabsTrigger>
              <TabsTrigger 
                value="examples" 
                className="data-[state=active]:bg-[#14F195] data-[state=active]:text-black"
              >
                Examples
              </TabsTrigger>
              <TabsTrigger 
                value="sdks" 
                className="data-[state=active]:bg-[#14F195] data-[state=active]:text-black"
              >
                SDKs
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* API Overview */}
          <TabsContent value="overview" className="mt-4">
            <Card className="bg-[#0c0c15] border-[#1e2035] shadow-lg">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Solana Volume Bot API</CardTitle>
                <CardDescription className="text-gray-400">
                  A RESTful API for programmatic control of volume generation
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-400 space-y-6">
                <div>
                  <h3 className="text-white text-lg mb-2">Overview</h3>
                  <p>
                    The Solana Volume Bot API provides programmatic access to our volume generation system, allowing developers to integrate token visibility enhancement directly into their applications. Our API follows REST principles, uses JSON for request and response formats, and requires API key authentication.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-white text-lg mb-2">Base URL</h3>
                  <div className="bg-[#1e2035] rounded-md p-3 font-mono text-[#14F195] flex justify-between items-center">
                    <code>https://api.solanavolumebot.io/v1</code>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => copyToClipboard("https://api.solanavolumebot.io/v1", "base-url")}
                    >
                      {copiedEndpoint === "base-url" ? (
                        <Check className="h-4 w-4 text-[#14F195]" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white text-lg mb-2">Authentication</h3>
                  <p className="mb-3">
                    All API requests require an API key that should be included in the <code className="bg-[#1e2035] px-1 py-0.5 rounded text-[#14F195]">Authorization</code> header:
                  </p>
                  <div className="bg-[#1e2035] rounded-md p-3 font-mono text-[#14F195] flex justify-between items-center">
                    <code>Authorization: Bearer YOUR_API_KEY</code>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => copyToClipboard("Authorization: Bearer YOUR_API_KEY", "auth")}
                    >
                      {copiedEndpoint === "auth" ? (
                        <Check className="h-4 w-4 text-[#14F195]" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white text-lg mb-2">Rate Limits</h3>
                  <p>
                    Free tier accounts are limited to 100 requests per hour.
                    Pro tier accounts are limited to 1,000 requests per hour.
                    Enterprise tier accounts have customizable rate limits based on needs.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-white text-lg mb-2">Response Format</h3>
                  <p className="mb-3">
                    All responses are returned in JSON format. Successful responses have a 2xx status code and contain a <code className="bg-[#1e2035] px-1 py-0.5 rounded text-[#14F195]">data</code> field with the result. Error responses have a 4xx or 5xx status code and contain <code className="bg-[#1e2035] px-1 py-0.5 rounded text-[#14F195]">error</code> and <code className="bg-[#1e2035] px-1 py-0.5 rounded text-[#14F195]">message</code> fields.
                  </p>
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button 
                    onClick={() => setActiveTab("endpoints")}
                    className="bg-gradient-to-r from-[#14F195] to-[#9945FF] text-black hover:from-[#05E286] hover:to-[#8035E5]"
                  >
                    View API Endpoints
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* API Endpoints */}
          <TabsContent value="endpoints" className="mt-4">
            <Card className="bg-[#0c0c15] border-[#1e2035] shadow-lg">
              <CardHeader>
                <CardTitle className="text-white text-2xl">API Endpoints</CardTitle>
                <CardDescription className="text-gray-400">
                  Available endpoints for volume management
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-400 space-y-8">
                {/* Campaigns Endpoints */}
                <div>
                  <h3 className="text-white text-lg mb-3">Campaign Management</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-green-600 px-2 py-0.5 rounded text-xs font-bold">GET</span>
                        <code className="font-mono text-[#14F195]">/campaigns</code>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-6 w-6 ml-auto"
                          onClick={() => copyToClipboard("https://api.solanavolumebot.io/v1/campaigns", "get-campaigns")}
                        >
                          {copiedEndpoint === "get-campaigns" ? (
                            <Check className="h-3 w-3 text-[#14F195]" />
                          ) : (
                            <Copy className="h-3 w-3 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      <p className="text-sm">List all your volume campaigns</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-green-600 px-2 py-0.5 rounded text-xs font-bold">GET</span>
                        <code className="font-mono text-[#14F195]">/campaigns/{'{campaign_id}'}</code>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-6 w-6 ml-auto"
                          onClick={() => copyToClipboard("https://api.solanavolumebot.io/v1/campaigns/{campaign_id}", "get-campaign")}
                        >
                          {copiedEndpoint === "get-campaign" ? (
                            <Check className="h-3 w-3 text-[#14F195]" />
                          ) : (
                            <Copy className="h-3 w-3 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      <p className="text-sm">Get details of a specific campaign</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-600 px-2 py-0.5 rounded text-xs font-bold">POST</span>
                        <code className="font-mono text-[#14F195]">/campaigns</code>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-6 w-6 ml-auto"
                          onClick={() => copyToClipboard("https://api.solanavolumebot.io/v1/campaigns", "post-campaign")}
                        >
                          {copiedEndpoint === "post-campaign" ? (
                            <Check className="h-3 w-3 text-[#14F195]" />
                          ) : (
                            <Copy className="h-3 w-3 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      <p className="text-sm">Create a new volume campaign</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-yellow-600 px-2 py-0.5 rounded text-xs font-bold">PUT</span>
                        <code className="font-mono text-[#14F195]">/campaigns/{'{campaign_id}'}</code>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-6 w-6 ml-auto"
                          onClick={() => copyToClipboard("https://api.solanavolumebot.io/v1/campaigns/{campaign_id}", "put-campaign")}
                        >
                          {copiedEndpoint === "put-campaign" ? (
                            <Check className="h-3 w-3 text-[#14F195]" />
                          ) : (
                            <Copy className="h-3 w-3 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      <p className="text-sm">Update an existing campaign</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-red-600 px-2 py-0.5 rounded text-xs font-bold">DELETE</span>
                        <code className="font-mono text-[#14F195]">/campaigns/{'{campaign_id}'}</code>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-6 w-6 ml-auto"
                          onClick={() => copyToClipboard("https://api.solanavolumebot.io/v1/campaigns/{campaign_id}", "delete-campaign")}
                        >
                          {copiedEndpoint === "delete-campaign" ? (
                            <Check className="h-3 w-3 text-[#14F195]" />
                          ) : (
                            <Copy className="h-3 w-3 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      <p className="text-sm">Delete a campaign</p>
                    </div>
                  </div>
                </div>
                
                {/* Volume Configuration Endpoints */}
                <div>
                  <h3 className="text-white text-lg mb-3">Volume Configuration</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-600 px-2 py-0.5 rounded text-xs font-bold">POST</span>
                        <code className="font-mono text-[#14F195]">/campaigns/{'{campaign_id}'}/start</code>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-6 w-6 ml-auto"
                          onClick={() => copyToClipboard("https://api.solanavolumebot.io/v1/campaigns/{campaign_id}/start", "start-campaign")}
                        >
                          {copiedEndpoint === "start-campaign" ? (
                            <Check className="h-3 w-3 text-[#14F195]" />
                          ) : (
                            <Copy className="h-3 w-3 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      <p className="text-sm">Start volume generation for a campaign</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-600 px-2 py-0.5 rounded text-xs font-bold">POST</span>
                        <code className="font-mono text-[#14F195]">/campaigns/{'{campaign_id}'}/stop</code>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-6 w-6 ml-auto"
                          onClick={() => copyToClipboard("https://api.solanavolumebot.io/v1/campaigns/{campaign_id}/stop", "stop-campaign")}
                        >
                          {copiedEndpoint === "stop-campaign" ? (
                            <Check className="h-3 w-3 text-[#14F195]" />
                          ) : (
                            <Copy className="h-3 w-3 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      <p className="text-sm">Stop volume generation for a campaign</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-yellow-600 px-2 py-0.5 rounded text-xs font-bold">PUT</span>
                        <code className="font-mono text-[#14F195]">/campaigns/{'{campaign_id}'}/patterns</code>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-6 w-6 ml-auto"
                          onClick={() => copyToClipboard("https://api.solanavolumebot.io/v1/campaigns/{campaign_id}/patterns", "update-patterns")}
                        >
                          {copiedEndpoint === "update-patterns" ? (
                            <Check className="h-3 w-3 text-[#14F195]" />
                          ) : (
                            <Copy className="h-3 w-3 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      <p className="text-sm">Update volume patterns configuration</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-yellow-600 px-2 py-0.5 rounded text-xs font-bold">PUT</span>
                        <code className="font-mono text-[#14F195]">/campaigns/{'{campaign_id}'}/schedule</code>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-6 w-6 ml-auto"
                          onClick={() => copyToClipboard("https://api.solanavolumebot.io/v1/campaigns/{campaign_id}/schedule", "update-schedule")}
                        >
                          {copiedEndpoint === "update-schedule" ? (
                            <Check className="h-3 w-3 text-[#14F195]" />
                          ) : (
                            <Copy className="h-3 w-3 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      <p className="text-sm">Configure volume generation schedule</p>
                    </div>
                  </div>
                </div>
                
                {/* Analytics Endpoints */}
                <div>
                  <h3 className="text-white text-lg mb-3">Analytics</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-green-600 px-2 py-0.5 rounded text-xs font-bold">GET</span>
                        <code className="font-mono text-[#14F195]">/campaigns/{'{campaign_id}'}/stats</code>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-6 w-6 ml-auto"
                          onClick={() => copyToClipboard("https://api.solanavolumebot.io/v1/campaigns/{campaign_id}/stats", "get-stats")}
                        >
                          {copiedEndpoint === "get-stats" ? (
                            <Check className="h-3 w-3 text-[#14F195]" />
                          ) : (
                            <Copy className="h-3 w-3 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      <p className="text-sm">Get campaign performance statistics</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-green-600 px-2 py-0.5 rounded text-xs font-bold">GET</span>
                        <code className="font-mono text-[#14F195]">/campaigns/{'{campaign_id}'}/trending</code>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-6 w-6 ml-auto"
                          onClick={() => copyToClipboard("https://api.solanavolumebot.io/v1/campaigns/{campaign_id}/trending", "get-trending")}
                        >
                          {copiedEndpoint === "get-trending" ? (
                            <Check className="h-3 w-3 text-[#14F195]" />
                          ) : (
                            <Copy className="h-3 w-3 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      <p className="text-sm">Get trending position data across platforms</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-green-600 px-2 py-0.5 rounded text-xs font-bold">GET</span>
                        <code className="font-mono text-[#14F195]">/tokens/{'{token_address}'}/volume-data</code>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-6 w-6 ml-auto"
                          onClick={() => copyToClipboard("https://api.solanavolumebot.io/v1/tokens/{token_address}/volume-data", "get-token-volume")}
                        >
                          {copiedEndpoint === "get-token-volume" ? (
                            <Check className="h-3 w-3 text-[#14F195]" />
                          ) : (
                            <Copy className="h-3 w-3 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      <p className="text-sm">Get comprehensive token volume distribution data</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button 
                    onClick={() => setActiveTab("examples")}
                    className="bg-gradient-to-r from-[#14F195] to-[#9945FF] text-black hover:from-[#05E286] hover:to-[#8035E5]"
                  >
                    View API Usage Examples
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* API Examples */}
          <TabsContent value="examples" className="mt-4">
            <Card className="bg-[#0c0c15] border-[#1e2035] shadow-lg">
              <CardHeader>
                <CardTitle className="text-white text-2xl">API Usage Examples</CardTitle>
                <CardDescription className="text-gray-400">
                  Code examples for common API operations
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-400 space-y-8">
                {/* Create Campaign Example */}
                <div>
                  <h3 className="text-white text-lg mb-3">Create a Volume Campaign</h3>
                  
                  <div className="bg-[#1e2035] rounded-md p-4 font-mono text-sm">
                    <pre className="text-[#14F195] whitespace-pre-wrap">
{`// JavaScript Example
const createCampaign = async () => {
  const response = await fetch('https://api.solanavolumebot.io/v1/campaigns', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'My Token Campaign',
      token_address: 'YOUR_TOKEN_ADDRESS',
      target_platforms: ['pump.fun', 'dextools'],
      daily_volume_usd: 5000,
      pattern: 'natural',
      duration_days: 30
    })
  });
  
  const data = await response.json();
  return data;
};`}
                    </pre>
                    <div className="flex justify-end mt-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-7"
                        onClick={() => copyToClipboard(`// JavaScript Example
const createCampaign = async () => {
  const response = await fetch('https://api.solanavolumebot.io/v1/campaigns', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'My Token Campaign',
      token_address: 'YOUR_TOKEN_ADDRESS',
      target_platforms: ['pump.fun', 'dextools'],
      daily_volume_usd: 5000,
      pattern: 'natural',
      duration_days: 30
    })
  });
  
  const data = await response.json();
  return data;
};`, "create-example")}
                      >
                        {copiedEndpoint === "create-example" ? (
                          <Check className="h-4 w-4 mr-1 text-[#14F195]" />
                        ) : (
                          <Copy className="h-4 w-4 mr-1 text-gray-400" />
                        )}
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Start Campaign Example */}
                <div>
                  <h3 className="text-white text-lg mb-3">Start a Volume Campaign</h3>
                  
                  <div className="bg-[#1e2035] rounded-md p-4 font-mono text-sm">
                    <pre className="text-[#14F195] whitespace-pre-wrap">
{`// Python Example
import requests

def start_campaign(campaign_id, api_key):
    url = f"https://api.solanavolumebot.io/v1/campaigns/{campaign_id}/start"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    response = requests.post(url, headers=headers)
    return response.json()

# Example usage
result = start_campaign("campaign_123456", "YOUR_API_KEY")`}
                    </pre>
                    <div className="flex justify-end mt-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-7"
                        onClick={() => copyToClipboard(`// Python Example
import requests

def start_campaign(campaign_id, api_key):
    url = f"https://api.solanavolumebot.io/v1/campaigns/{campaign_id}/start"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    response = requests.post(url, headers=headers)
    return response.json()

# Example usage
result = start_campaign("campaign_123456", "YOUR_API_KEY")`, "start-example")}
                      >
                        {copiedEndpoint === "start-example" ? (
                          <Check className="h-4 w-4 mr-1 text-[#14F195]" />
                        ) : (
                          <Copy className="h-4 w-4 mr-1 text-gray-400" />
                        )}
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Get Campaign Stats Example */}
                <div>
                  <h3 className="text-white text-lg mb-3">Get Campaign Statistics</h3>
                  
                  <div className="bg-[#1e2035] rounded-md p-4 font-mono text-sm">
                    <pre className="text-[#14F195] whitespace-pre-wrap">
{`// cURL Example
curl -X GET \\
  "https://api.solanavolumebot.io/v1/campaigns/campaign_123456/stats" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                    </pre>
                    <div className="flex justify-end mt-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-7"
                        onClick={() => copyToClipboard(`// cURL Example
curl -X GET \\
  "https://api.solanavolumebot.io/v1/campaigns/campaign_123456/stats" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`, "stats-example")}
                      >
                        {copiedEndpoint === "stats-example" ? (
                          <Check className="h-4 w-4 mr-1 text-[#14F195]" />
                        ) : (
                          <Copy className="h-4 w-4 mr-1 text-gray-400" />
                        )}
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button 
                    onClick={() => setActiveTab("sdks")}
                    className="bg-gradient-to-r from-[#14F195] to-[#9945FF] text-black hover:from-[#05E286] hover:to-[#8035E5]"
                  >
                    View Available SDKs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* SDKs */}
          <TabsContent value="sdks" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* JavaScript SDK */}
              <Card className="bg-[#0c0c15] border-[#1e2035] hover:border-[#14F195]/50 transition-all shadow-lg">
                <CardHeader>
                  <div className="bg-[#14F195]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <svg className="h-6 w-6 text-[#14F195]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
                    </svg>
                  </div>
                  <CardTitle className="text-white">JavaScript SDK</CardTitle>
                  <CardDescription className="text-gray-400">
                    For Node.js and browser applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-400 flex-grow">
                  <p>Our JavaScript SDK provides a convenient interface for interacting with the Solana Volume Bot API from both Node.js and browser environments.</p>
                  <div className="bg-[#1e2035] rounded-md p-3 mt-4 font-mono text-xs">
                    <code className="text-[#14F195]">npm install solanavolumebot-js</code>
                  </div>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#14F195]"></span>
                      <span>Promise-based API</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#14F195]"></span>
                      <span>TypeScript support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#14F195]"></span>
                      <span>Comprehensive documentation</span>
                    </li>
                  </ul>
                </CardContent>
                <CardContent className="pt-0">
                  <div className="flex justify-end">
                    <Button 
                      variant="link" 
                      className="text-[#14F195]"
                      onClick={() => window.open('https://github.com/solanavolumebot/javascript-sdk', '_blank')}
                    >
                      View on GitHub
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Python SDK */}
              <Card className="bg-[#0c0c15] border-[#1e2035] hover:border-[#14F195]/50 transition-all shadow-lg">
                <CardHeader>
                  <div className="bg-[#14F195]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <svg className="h-6 w-6 text-[#14F195]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
                    </svg>
                  </div>
                  <CardTitle className="text-white">Python SDK</CardTitle>
                  <CardDescription className="text-gray-400">
                    For Python applications and scripts
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-400 flex-grow">
                  <p>The Python SDK provides a Pythonic interface to the Solana Volume Bot API, making it easy to integrate with your Python applications, data science workflows, or trading bots.</p>
                  <div className="bg-[#1e2035] rounded-md p-3 mt-4 font-mono text-xs">
                    <code className="text-[#14F195]">pip install solanavolumebot</code>
                  </div>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#14F195]"></span>
                      <span>Async support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#14F195]"></span>
                      <span>Type hints</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#14F195]"></span>
                      <span>Pandas integration</span>
                    </li>
                  </ul>
                </CardContent>
                <CardContent className="pt-0">
                  <div className="flex justify-end">
                    <Button 
                      variant="link" 
                      className="text-[#14F195]"
                      onClick={() => window.open('https://github.com/solanavolumebot/python-sdk', '_blank')}
                    >
                      View on GitHub
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Java SDK */}
              <Card className="bg-[#0c0c15] border-[#1e2035] hover:border-[#14F195]/50 transition-all shadow-lg">
                <CardHeader>
                  <div className="bg-[#14F195]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <svg className="h-6 w-6 text-[#14F195]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.93.828-.93-3.514 1.104-5.773 2.652-2.483 3.796 11.3 3.933 20.598-1.77 14.817-3.892M9.292 13.21s-2.325.557-1.29.991c5.725 2.422 15.318 1.296 15.318 1.296s-.169.186-.579.417c-6.038 1.599-17.754.896-14.383-.657 2.835-1.306 3.925-.939 6.068-1.119-1.251-.335-2.427-.554-5.134-.928M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.186-.515.186s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.166M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"/>
                    </svg>
                  </div>
                  <CardTitle className="text-white">Java SDK</CardTitle>
                  <CardDescription className="text-gray-400">
                    For Java applications and services
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-400 flex-grow">
                  <p>Our Java SDK provides a robust implementation for enterprise applications, ensuring type-safety and comprehensive error handling for Java-based systems.</p>
                  <div className="bg-[#1e2035] rounded-md p-3 mt-4 font-mono text-xs">
                    <code className="text-[#14F195]">
                      &lt;dependency&gt;<br/>
                      &nbsp;&nbsp;&lt;groupId&gt;io.solanavolumebot&lt;/groupId&gt;<br/>
                      &nbsp;&nbsp;&lt;artifactId&gt;api-client&lt;/artifactId&gt;<br/>
                      &nbsp;&nbsp;&lt;version&gt;1.0.0&lt;/version&gt;<br/>
                      &lt;/dependency&gt;
                    </code>
                  </div>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#14F195]"></span>
                      <span>Thread-safe design</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#14F195]"></span>
                      <span>Comprehensive logging</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#14F195]"></span>
                      <span>Enterprise-ready</span>
                    </li>
                  </ul>
                </CardContent>
                <CardContent className="pt-0">
                  <div className="flex justify-end">
                    <Button 
                      variant="link" 
                      className="text-[#14F195]"
                      onClick={() => window.open('https://github.com/solanavolumebot/java-sdk', '_blank')}
                    >
                      View on GitHub
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-400 max-w-3xl mx-auto mb-8">
                Need help integrating our API? Our developer team is ready to assist you with implementation, customization, and optimization.
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#14F195] to-[#9945FF] text-black hover:from-[#05E286] hover:to-[#8035E5]"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Developer Support
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}