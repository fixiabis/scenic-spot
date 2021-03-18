# scenic-spot

## 啟動

啟動將使用到 yarn 與 serve。

### 複製該專案內容

```bash
git clone https://github.com/fixiabis/scenic-spot.git
```

### 安裝相關套件

```bash
yarn
```

### 開發與預覽可用

```bash
yarn run dev
```

### 產出靜態頁面供其他應用

```bash
yarn run export
```

產出後的檔案將在該專案目錄的 `/out` 資料夾中。

#### 以 serve 為例

```bash
cd ./out
serve -p 3000
```

正常狀態下將顯示該畫面:

```bash
   ┌────────────────────────────────────────────────────┐
   │                                                    │
   │   Serving!                                         │
   │                                                    │
   │   - Local:            http://localhost:3000        │
   │   - On Your Network:  http://xxx.xxx.xxx.xxx:3000  │
   │                                                    │
   │   Copied local address to clipboard!               │
   │                                                    │
   └────────────────────────────────────────────────────┘
```

請使用畫面中的網址瀏覽網頁。

## 預覽

https://scenic-spot.vercel.app/

## 說明

主要語言為 typescript，使用 next.js 進行所有功能的開發。

## 實作細節

請求景點資料時，有受到一些限制，最終將收到 429 (Too Many Requests) 回應，無法取得全部的資料，可能需要申請會員帳號，不過目前還沒拿到，因此如果收到報錯時，會在底部彈出文字提示 "無法載入更多景點了"。

相關樣式不多，皆在 `/styles/global.css` 中。

縣市資料固定，建立了一份資料檔，為 `/values/cityNames.json`。

依照題目與限制設計了一些 hooks，於該專案目錄的 `/components/hooks` 中，分別為：

- `/useScenicSpots.ts` 景點資料與載入功能
- `/useEffectOnScrollToBottom.ts` 網頁捲至底部時觸發效果
- `/useAutoHideHint.ts` 自動隱藏的提示，當觸發顯示後預設 1 秒後將提示隱藏。

載入功能將部分函數分開，於該專案目錄的 `/components/utils/request.ts` 中。

建立了一些作為樣版的函數，於該專案目錄的 `/components/templates` 中，分別為：

- `/BottomHint.tsx` 底部文字提示
- `/Navbar.tsx` 導覽列
- `/ScenicSpotList.tsx` 景點列表

主要頁面於該專案目錄的 `/pages` 中，分別為：

- `/index.tsx` 主頁面，有導覽列可以導向至其他頁面
- `/scenicSpot.tsx` 全部景點列表
- `/scenicSpot/[city].tsx` 各縣市景點列表

列表部分的程式碼：

```tsx
// 提示文字的狀態，當顯示觸發時，預設1秒後會隱藏(有一個 isActive 屬性供狀態切換)
const [hint, setHint] = useAutoHideHint();

// 景點資料本身，提供了資料與載入功能(往下將看到 data 與 load)
// 該載入功能當從api抓到空陣列時便不會再繼續往下抓(有一個 isLoaded 屬性供判斷)
const scenicSpots = useScenicSpots('/' + city);

// 捲動底部觸發效果，載入景點資料
useEffectOnScrollToBottom(() =>
  scenicSpots
    .load()
    // 針對 429 問題顯示提示文字
    .catch(() => setHint({ text: '無法載入更多景點了', isActive: true }))
);

return (
  <Fragment>
    {Navbar(cityNames)}
    {ScenicSpotList(scenicSpots.data)}
    {BottomHint(hint.text, hint.isActive)}
  </Fragment>
);
```
