/**
 * lib/spam-detector.ts — Anti-spam heuristics & rate limiting for public forms
 */

// In-memory sliding window rate limiter: IP -> timestamps
const ipSubmissions = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_SUBMISSIONS_PER_WINDOW = 4;

/**
 * Checks if an IP has exceeded rate limits.
 */
export function isRateLimited(ip: string): boolean {
  if (!ip || ip === "unknown") return false;
  const now = Date.now();
  const history = ipSubmissions.get(ip) || [];
  const recent = history.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    return true;
  }

  recent.push(now);
  ipSubmissions.set(ip, recent);
  return false;
}

/**
 * Detects erratic case alternation in a single word (e.g. "hCVpJunxZj", "mOwNphpfGv")
 * Normal names/words do not alternate upper/lower case 4+ times inside a single token.
 */
function hasExcessiveCaseJitter(word: string): boolean {
  if (word.length < 8) return false;
  let transitions = 0;
  for (let i = 0; i < word.length - 1; i++) {
    const isUpperA = word[i] >= "A" && word[i] <= "Z";
    const isLowerA = word[i] >= "a" && word[i] <= "z";
    const isUpperB = word[i + 1] >= "A" && word[i + 1] <= "Z";
    const isLowerB = word[i + 1] >= "a" && word[i + 1] <= "z";

    if ((isUpperA && isLowerB) || (isLowerA && isUpperB)) {
      transitions++;
    }
  }
  return transitions >= 4;
}

export interface SpamCheckInput {
  name: string;
  email: string;
  message: string;
  subject?: string | null;
  website_url?: string | null;
  formLoadedAt?: number | null;
}

export interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
}

export function detectSpam(input: SpamCheckInput): SpamCheckResult {
  // 1. Honeypot check (hidden field filled by bots)
  if (input.website_url && input.website_url.trim().length > 0) {
    return { isSpam: true, reason: "Honeypot field filled" };
  }

  // 2. Minimum submission duration check (< 2.5 seconds is automated bot)
  if (input.formLoadedAt && typeof input.formLoadedAt === "number") {
    const elapsedMs = Date.now() - input.formLoadedAt;
    if (elapsedMs < 2500) {
      return { isSpam: true, reason: `Form submitted unnaturally fast (${elapsedMs}ms)` };
    }
  }

  const cleanMsg = (input.message || "").trim();
  const cleanName = (input.name || "").trim();
  const cleanSubj = (input.subject || "").trim();

  // 3. Message contains no whitespace (like "nHXTl1Oi7DsQa15plwlgydxHsUVzfCTGsNOPaO2yFqMYj4caS9rQjyl")
  if (cleanMsg.length >= 25 && !/\s/.test(cleanMsg)) {
    return { isSpam: true, reason: "Long unspaced message string" };
  }

  // 4. Any token in message > 45 characters without a valid URL prefix
  const tokens = cleanMsg.split(/\s+/);
  for (const token of tokens) {
    if (token.length > 45 && !token.startsWith("http://") && !token.startsWith("https://")) {
      return { isSpam: true, reason: "Excessively long token without space" };
    }
  }

  // 5. Gibberish name, subject, or message check (case jitter)
  if (hasExcessiveCaseJitter(cleanName)) {
    return { isSpam: true, reason: "Erratic case jitter in name" };
  }
  if (cleanSubj && hasExcessiveCaseJitter(cleanSubj)) {
    return { isSpam: true, reason: "Erratic case jitter in subject" };
  }
  if (tokens.length <= 3 && tokens.some((t) => hasExcessiveCaseJitter(t))) {
    return { isSpam: true, reason: "Erratic case jitter in message token" };
  }

  return { isSpam: false };
}
