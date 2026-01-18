let scrollIntervalId = null;
let refreshTimeoutId = null;

// Initialize on load
chrome.storage.local.get(
  ["isRunning", "scrollPixel", "scrollTime", "autoRefresh", "refreshInterval"],
  (result) => {
    if (result.isRunning) {
      startScrolling(result);
      if (result.autoRefresh) {
        scheduleRefresh(result.refreshInterval);
      }
    }
  },
);

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "start") {
    chrome.storage.local.get(
      ["scrollPixel", "scrollTime", "autoRefresh", "refreshInterval"],
      (result) => {
        startScrolling(result);
        if (result.autoRefresh) {
          scheduleRefresh(result.refreshInterval);
        }
      },
    );
  } else if (request.action === "stop") {
    stopScrolling();
    clearTimeout(refreshTimeoutId);
  }
});

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    console.log("[Infinite Scroll] Stopped by ESC key");
    stopScrolling();
    if (refreshTimeoutId) clearTimeout(refreshTimeoutId);
    chrome.storage.local.set({ isRunning: false });
  } else if (e.key === "ArrowDown") {
    chrome.storage.local.get(
      [
        "isRunning",
        "scrollPixel",
        "scrollTime",
        "autoRefresh",
        "refreshInterval",
      ],
      (result) => {
        if (!result.isRunning) {
          console.log("[Infinite Scroll] Resumed by ArrowDown key");
          chrome.storage.local.set({ isRunning: true });
          startScrolling(result);
          if (result.autoRefresh) {
            scheduleRefresh(result.refreshInterval);
          }
        }
      },
    );
  }
});

function startScrolling(settings) {
  if (scrollIntervalId) clearInterval(scrollIntervalId);

  const pixel = settings.scrollPixel || 100;
  const time = settings.scrollTime || 1000;

  scrollIntervalId = setInterval(() => {
    window.scrollBy({
      top: pixel,
      behavior: "smooth",
    });
  }, time);

  console.log(`[Infinite Scroll] Started: ${pixel}px every ${time}ms`);
}

function stopScrolling() {
  if (scrollIntervalId) {
    clearInterval(scrollIntervalId);
    scrollIntervalId = null;
  }
  console.log("[Infinite Scroll] Stopped");
}

function scheduleRefresh(intervalSeconds) {
  if (refreshTimeoutId) clearTimeout(refreshTimeoutId);

  const ms = (intervalSeconds || 60) * 1000;
  console.log(
    `[Infinite Scroll] Auto refresh scheduled in ${intervalSeconds}s`,
  );

  refreshTimeoutId = setTimeout(() => {
    location.reload();
  }, ms);
}
