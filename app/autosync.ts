// app/auto-sync.ts
import { useSyncStore } from "./store/sync";
import { showToast, showConfirm } from "./components/ui-lib";

const SYNC_INTERVAL = 30 * 60 * 1000; // 30分钟

function startAutoSync() {
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
  showToast("[AutoSync] 启动", {
    text: "OK",
    onClick: () => {
    },
  }, 1000);
  const syncStore = useSyncStore();
  
  console.log(`[AutoSync] 自动同步定时器启动，每隔 ${SYNC_INTERVAL / 1000 / 60} 分钟同步一次，${new Date().toLocaleString()}`);
  setInterval(async () => {
    try {
        await syncStore.sync();
        showToast("自动同步成功!", {
          text: "OK",
          onClick: () => {
          }
        }, 15*60000);
        console.log("[AutoSync] 自动同步成功!", new Date().toLocaleString());
    } catch (e) {
      console.error("[AutoSync] 自动同步失败:", e);
      showToast("自动同步失败！！！", {
        text: "OK",
        onClick: () => {
            console.log("自动同步失败, error:", e);
        }
      }, 30*60000);
    }
  }, SYNC_INTERVAL);
}

export default startAutoSync;
