import { describe, it, expect, beforeEach } from "vitest";
import { TierManager } from "../tierManager";

describe("tierManager", () => {
  let tierManager: InstanceType<typeof TierManager>;

  beforeEach(() => {
    tierManager = new TierManager();
  });

  it("should allow free tier features within limits", () => {
    expect(tierManager.canUseFeature("resumeReviews")).toBe(true);
    expect(tierManager.getRemainingUsage("resumeReviews")).toBe(3);
  });

  it("should block free tier features when limit reached", () => {
    // 使用3次简历评估
    tierManager.incrementUsage("resumeReviews");
    tierManager.incrementUsage("resumeReviews");
    tierManager.incrementUsage("resumeReviews");

    expect(tierManager.canUseFeature("resumeReviews")).toBe(false);
    expect(tierManager.getRemainingUsage("resumeReviews")).toBe(0);
  });

  it("should allow unlimited premium features", () => {
    tierManager.upgradeToPremium();

    expect(tierManager.canUseFeature("resumeReviews")).toBe(true);
    expect(tierManager.getRemainingUsage("resumeReviews")).toBe(Infinity);
  });

  it("should track usage correctly", () => {
    tierManager.incrementUsage("resumeReviews");
    tierManager.incrementUsage("mockInterviews");

    expect(tierManager.getRemainingUsage("resumeReviews")).toBe(2);
    expect(tierManager.getRemainingUsage("mockInterviews")).toBe(0);
  });

  it("should handle boolean features", () => {
    expect(tierManager.canUseFeature("basicTemplates")).toBe(true);
    expect(tierManager.getRemainingUsage("basicTemplates")).toBe(1);
  });

  it("should get current tier info", () => {
    expect(tierManager.getCurrentTier().type).toBe("free");

    tierManager.upgradeToPremium();
    expect(tierManager.getCurrentTier().type).toBe("premium");
  });
});
