import createCache from "@emotion/cache";
import { createEmotionCache } from "../../utils/create-emotion-cache";

describe("createEmotionCache", () => {
  it("returns an Emotion cache with the correct key", () => {
    const emotionCache = createEmotionCache();
    expect(emotionCache.key).toBe("css");
  });

  it("returns a valid Emotion cache", () => {
    const emotionCache = createEmotionCache();
    expect(emotionCache).toBeDefined();
    expect(emotionCache.sheet).toBeDefined();
    expect(emotionCache.sheet.tags).toBeDefined();
  });
});
