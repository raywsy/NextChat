// app/auto-sync.ts
import { useSyncStore } from "./store/sync";
import { showToast, showConfirm } from "./components/ui-lib";

const SYNC_INTERVAL = 5 * 60 * 1000; // 10分钟

function startAutoSync() {
  console.log("[AutoSync] 启动");
  const syncStore = useSyncStore();
  if (typeof window === "undefined") {
    // 只在浏览器环境运行
    return;
  }

  // 防止重复启动多个定时器
  if ((window as any).__autoSyncStarted) {
    console.log("[AutoSync] 已经启动过定时同步任务，跳过。");
    return;
  }
  (window as any).__autoSyncStarted = true;

  console.log(`[AutoSync] 自动同步定时器启动，每隔 ${SYNC_INTERVAL / 1000 / 60} 分钟同步一次。`);

  setInterval(async () => {
    console.log("[AutoSync] 开始自动同步...", new Date().toLocaleString());
    try {
      await syncStore.sync();
      showConfirm("自动同步成功!");
      console.log("[AutoSync] 自动同步成功!", new Date().toLocaleString());
    } catch (e) {
      console.error("[AutoSync] 自动同步失败:", e);
      showConfirm("自动同步失败！！！");
    }
  }, SYNC_INTERVAL);
}

export default startAutoSync;
