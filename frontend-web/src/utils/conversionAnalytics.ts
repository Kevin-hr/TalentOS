type ConversionEventName =
  | "free_trial_start"
  | "feature_limit_reached"
  | "premium_upgrade"
  | "case_study_view";

type ConversionMetadata = Record<string, unknown>;

interface ConversionEvent {
  event: ConversionEventName;
  userId?: string;
  timestamp: number;
  metadata?: ConversionMetadata;
}

type GtagFn = (
  command: "event",
  eventName: string,
  params?: ConversionMetadata,
) => void;

type WindowWithGtag = Window & {
  gtag?: GtagFn;
};

class ConversionAnalytics {
  private events: ConversionEvent[] = [];

  track(event: ConversionEventName, metadata?: ConversionMetadata) {
    const conversionEvent: ConversionEvent = {
      event,
      timestamp: Date.now(),
      metadata,
    };

    this.events.push(conversionEvent);

    if (typeof window !== "undefined") {
      const w = window as WindowWithGtag;
      if (typeof w.gtag === "function") {
        w.gtag("event", event, metadata);
      }
    }

    console.log("[Analytics]", event, metadata);
  }

  getConversionRate(eventType: ConversionEventName): number {
    const relevantEvents = this.events.filter((e) => e.event === eventType);
    return relevantEvents.length / this.events.length || 0;
  }

  getUserJourney(): ConversionEvent[] {
    return [...this.events].sort((a, b) => a.timestamp - b.timestamp);
  }

  reset() {
    this.events = [];
  }
}

export const analytics = new ConversionAnalytics();
