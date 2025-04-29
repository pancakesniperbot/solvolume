import { pgTable, text, serial, timestamp, integer, boolean, decimal, foreignKey, primaryKey, json, varchar, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  role: text("role").default("user").notNull(), // user, admin
  walletAddress: text("wallet_address"),
  apiKey: text("api_key").unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// User relations
export const usersRelations = relations(users, ({ many }) => ({
  subscriptions: many(subscriptions),
  botCampaigns: many(botCampaigns),
  referrals: many(referrals),
}));

// Subscriptions table
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  planId: integer("plan_id").notNull().references(() => plans.id),
  status: text("status").notNull(), // active, cancelled, expired
  currentPeriodStart: timestamp("current_period_start").notNull(),
  currentPeriodEnd: timestamp("current_period_end").notNull(),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false),
  trialEnd: timestamp("trial_end"),
  cancelledAt: timestamp("cancelled_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Subscription relations
export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
  plan: one(plans, {
    fields: [subscriptions.planId],
    references: [plans.id],
  }),
}));

// Subscription Plans table
export const plans = pgTable("plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("USD").notNull(),
  interval: text("interval").notNull(), // monthly, yearly
  features: json("features").$type<string[]>(),
  isPopular: boolean("is_popular").default(false),
  maxBotCampaigns: integer("max_bot_campaigns").default(1).notNull(),
  maxTokensPerDay: integer("max_tokens_per_day"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Plan relations
export const plansRelations = relations(plans, ({ many }) => ({
  subscriptions: many(subscriptions),
}));

// Bot Campaigns table - for volume bot configurations
export const botCampaigns = pgTable("bot_campaigns", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text("name").notNull(),
  tokenAddress: text("token_address").notNull(),
  status: text("status").notNull(), // active, paused, completed
  targetVolume: decimal("target_volume", { precision: 16, scale: 6 }),
  dailyVolumeLimit: decimal("daily_volume_limit", { precision: 16, scale: 6 }),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  settings: json("settings").$type<{
    tradingPairs?: string[];
    tradingStrategy?: string;
    minTradeSize?: number;
    maxTradeSize?: number;
    tradingFrequency?: string;
  }>(),
  statistics: json("statistics").$type<{
    totalVolume?: number;
    totalTrades?: number;
    averageTradeSize?: number;
    trending?: {
      dextools?: boolean;
      dexscreener?: boolean;
      pumpFun?: boolean;
    }
  }>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Bot Campaign relations
export const botCampaignsRelations = relations(botCampaigns, ({ one }) => ({
  user: one(users, {
    fields: [botCampaigns.userId],
    references: [users.id],
  }),
}));

// Referrals table for affiliate program
export const referrals = pgTable("referrals", {
  id: serial("id").primaryKey(),
  referrerId: integer("referrer_id").notNull().references(() => users.id),
  referredId: integer("referred_id").notNull().references(() => users.id),
  code: text("code").notNull(),
  status: text("status").notNull(), // pending, completed
  commission: decimal("commission", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Referral relations
export const referralsRelations = relations(referrals, ({ one }) => ({
  referrer: one(users, {
    fields: [referrals.referrerId],
    references: [users.id],
    relationName: "referrer",
  }),
  referred: one(users, {
    fields: [referrals.referredId],
    references: [users.id],
    relationName: "referred",
  }),
}));

// Define insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  walletAddress: true,
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).pick({
  userId: true,
  planId: true,
  status: true,
  currentPeriodStart: true,
  currentPeriodEnd: true,
  cancelAtPeriodEnd: true,
  trialEnd: true,
});

export const insertPlanSchema = createInsertSchema(plans).pick({
  name: true,
  description: true,
  price: true,
  currency: true,
  interval: true,
  features: true,
  isPopular: true,
  maxBotCampaigns: true,
  maxTokensPerDay: true,
});

export const insertBotCampaignSchema = createInsertSchema(botCampaigns).pick({
  userId: true,
  name: true,
  tokenAddress: true,
  status: true,
  targetVolume: true,
  dailyVolumeLimit: true,
  startDate: true,
  endDate: true,
  settings: true,
});

export const insertReferralSchema = createInsertSchema(referrals).pick({
  referrerId: true,
  referredId: true,
  code: true,
  status: true,
  commission: true,
});

// Define types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type InsertPlan = z.infer<typeof insertPlanSchema>;
export type InsertBotCampaign = z.infer<typeof insertBotCampaignSchema>;
export type InsertReferral = z.infer<typeof insertReferralSchema>;

export type User = typeof users.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
export type Plan = typeof plans.$inferSelect;
export type BotCampaign = typeof botCampaigns.$inferSelect;
export type Referral = typeof referrals.$inferSelect;
