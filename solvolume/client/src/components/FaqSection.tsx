import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  value: string;
}

const faqItems: FAQItemProps[] = [
  {
    question: "How exactly does the Solana Volume Bot work?",
    answer: (
      <>
        The <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">Solana Volume Bot</a> is a technical visibility enhancement tool that creates distributed on-chain transaction activity. It works by coordinating transactions across multiple wallets with varying amounts and timing intervals to create activity patterns that help tokens appear on trending lists. Our system monitors DEX platform algorithms and adapts transaction patterns to optimize visibility on platforms like DEXTools and Pump.fun. The <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">Sol Volume Bot</a> operates continuously to maintain consistent presence on discovery pages, similar to how SEO tools help websites appear in search results.
      </>
    ),
    value: "item-1"
  },
  {
    question: "How does your free trial for the Pump Fun Volume Bot work?",
    answer: (
      <>
        Our free trial gives you full access to the <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">Pump Fun Volume Bot</a> for 7 days with no restrictions. Simply enter your token address to get started immediately—no credit card or wallet connection required. During your trial, you'll have access to our dashboard with real-time analytics showing your token's performance across DEX platforms. If you decide to continue using the <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">Solana Volume Bot</a> after your trial ends, you can select any of our packages that suits your needs.
      </>
    ),
    value: "item-2"
  },
  {
    question: "Is the Dextools Volume Bot safe and secure to use?",
    answer: (
      <>
        Yes, the <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">Dextools Volume Bot</a> is designed with security as a top priority. Our system operates entirely through API interactions and never requires access to your private keys or wallet seed phrases. We implement military-grade encryption protocols to protect your data and token information. The <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">Sol Volume Bot</a> runs on a secure infrastructure with regular security audits to ensure the highest level of protection. Additionally, our anti-detection technology helps ensure that your volume activity appears natural to exchange monitoring systems.
      </>
    ),
    value: "item-3"
  },
  {
    question: "How quickly will my token start trending with the Pump Fun Trending Bot?",
    answer: (
      <>
        Most projects start seeing significant visibility improvements within 24-48 hours of activating the <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">Pump Fun Trending Bot</a>. For tokens with existing liquidity and some trading history, our customers typically see their tokens appear on Pump.fun trending lists within the first 24 hours. For DEXTools trending placement, which has a more competitive algorithm, the <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">Dextools Volume Bot</a> component typically requires 2-3 days of consistent volume before tokens start appearing on hot pairs lists. Premium packages accelerate these timelines with higher volume patterns and specialized algorithms.
      </>
    ),
    value: "item-4"
  },
  {
    question: "How do I configure the Solana Volume Bot for maximum effectiveness?",
    answer: (
      <>
        Configuring the <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">Solana Volume Bot</a> is straightforward through our intuitive dashboard. First, set your daily volume targets based on your token's market cap and liquidity. Next, customize volume patterns to match your token's natural transaction history. The <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">Sol Volume Bot</a> allows you to configure peak activity hours to align with your community's most active times. For DEXTools-specific optimization, our <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">Dextools Volume Bot</a> settings let you target specific metrics that affect trending algorithms. Premium subscribers gain access to advanced settings like volume distribution curves and multi-DEX targeting.
      </>
    ),
    value: "item-5"
  },
  {
    question: "Can the Pump Fun Volume Bot help with my token launch?",
    answer: (
      <>
        Absolutely! The <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">Pump Fun Volume Bot</a> is perfectly suited for new token launches. For maximum effectiveness, we recommend activating the bot immediately after you add initial liquidity. Our launch-specific settings create a gradual increase in volume that appears organic, helping your token gain visibility without triggering exchange monitoring systems. The <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">Solana Volume Bot</a> coordinates perfectly with your marketing efforts, amplifying visibility during key announcements and community events. Many successful projects use our service as a critical component of their launch strategy to establish early trending status on Pump.fun and DEXTools.
      </>
    ),
    value: "item-6"
  },
  {
    question: "Is the Solana Volume Bot a trading or investment tool?",
    answer: (
      <>
        <strong>No</strong>, the <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">Solana Volume Bot</a> is <strong>not</strong> a trading or investment tool. It is strictly a technical visibility enhancement solution. Our system creates balanced transactions that maintain neutral market impact while increasing on-chain activity to improve token discoverability. The <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">Sol Volume Bot</a> is designed solely to help tokens appear on trending lists and gain visibility across DEX platforms like Pump.fun and DEXTools. It should be considered as a technical marketing solution, similar to SEO for websites, but for on-chain tokens. The tool does not provide trading signals, investment advice, or financial recommendations of any kind.
      </>
    ),
    value: "item-7"
  },
  {
    question: "How does the Dextools Volume Bot avoid detection?",
    answer: (
      <>
        Our <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">DEXTools Volume Bot</a> employs sophisticated anti-detection systems developed by our team of DeFi experts. The bot creates natural-looking volume patterns by varying transaction sizes, timing intervals, and wallet origins. We analyze genuine volume patterns from successful tokens and replicate these characteristics in our volume generation. The <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">Solana Volume Bot</a> distributes transactions across multiple wallets with realistic blockchain histories, making the activity indistinguishable from genuine market activity. Our system also adapts to DEX algorithm changes, ensuring your token maintains visibility even as platforms update their trending algorithms.
      </>
    ),
    value: "item-8"
  },
  {
    question: "Which DEX platforms does the PUMP.FUN Trending Bot support?",
    answer: (
      <>
        The <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">PUMP.FUN Trending Bot</a> supports all major Solana DEX platforms. Our primary focus is on PUMP.FUN and DEXTools, where visibility has the greatest impact on market awareness. The <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">Sol Volume Bot</a> also supports Jupiter, Raydium, and Orca for transaction execution, with volume data reflecting across DEXScreener, CoinGecko, and other tracking platforms. Our Enterprise package extends support to additional platforms and includes customized volume distribution across multiple DEXes simultaneously. All volume activity generated by the <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">DEXTools Volume Bot</a> is visible on-chain and contributes to your token's overall market presence.
      </>
    ),
    value: "item-9"
  },
  {
    question: "Can I control how much volume the Solana Volume Bot generates?",
    answer: (
      <>
        Yes, you have complete control over the volume settings in the <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">Solana Volume Bot</a>. Our dashboard allows you to set daily volume targets, either as a specific USD amount or as a percentage of your token's market cap. The <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">PUMP.FUN Volume Bot</a> features include adjustable volume patterns, allowing you to create spikes during key marketing events or maintain steady baseline activity. You can pause and resume volume generation instantly through the dashboard, and our scheduling feature enables you to program volume changes in advance. Premium subscribers to the <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">DEXTools Volume Bot</a> receive additional fine-grained controls for maximum customization.
      </>
    ),
    value: "item-10"
  }
];

export function FaqSection() {
  return (
    <section id="faq" className="py-20 bg-background/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-[#00FFA3] to-[#DC1FFF] text-transparent bg-clip-text">
            Questions
          </span>
        </h2>
        
        <div className="max-w-3xl mx-auto bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-10 text-amber-100">
          <p className="text-center">
            <strong>Important Disclaimer:</strong> Solana Volume Bot is a technical visibility enhancement tool, not a financial product. We do not provide investment advice, trading signals, or price manipulation services. Our tool is designed solely to increase token discoverability through legitimate on-chain activity distribution. Results may vary based on market conditions and token parameters.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            {faqItems.map((item) => (
              <AccordionItem 
                key={item.value} 
                value={item.value}
                className="bg-card rounded-xl overflow-hidden border-none shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 text-lg font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 opacity-80">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
