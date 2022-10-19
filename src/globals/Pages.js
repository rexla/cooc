export default {
  signup: {
    title: "報名",
    content: {
      elementary: {
        text: "國小課外課程",
        pages: [
          { text: "選課系統", url: "/signup/elementary-selection" },
          { text: "選課結果公告", url: "/signup/elementary-result" },
          { text: "選課紀錄查詢", url: "/signup/elementary-search" },
        ],
      },
      activity: {
        text: "活動課程",
        pages: [
          { text: "活動報名", url: "/signup/activity-signup" },
          { text: "報名結果公告", url: "/signup/activity-result" },
          { text: "活動紀錄查詢", url: "/signup/activity-record-search" },
        ],
      },
      competition: {
        text: "校內競賽",
        pages: [{ text: "競賽報名", url: "/signup/competition-signup" }],
      },
    },
  },
  management: {
    title: "管理",
    content: {
      elementary: {
        text: "國小課外課程",
        pages: [
          { text: "共通設定", url: "/management/course-settings" },
          {
            text: "課程設定與建立",
            url: "/management/course-create",
          },
          {
            text: "編班選課管理",
            url: "/management/course-update",
          },
          {
            text: "點名設定",
            url: "/management/course-roll-call-settings",
          },
          {
            text: "綜合查詢",
            url: "/management/course-search",
          },
        ],
      },
      activity: {
        text: "活動課程",
        pages: [
          { text: "活動建立", url: "/management/activity-create" },
          { text: "活動管理", url: "/management/activity-update" },
          { text: "活動查詢", url: "/management/activity-search" },
        ],
      },
      competition: {
        text: "校內競賽",
        pages: [{ text: "競賽建立", url: "/management/competition-create" }],
      },
      permission: {
        text: "權限管理",
        url: "/management/permission-settings",
      },
    },
  },
  "roll-call": {
    text: "點名",
    url: "/roll-call",
  },
};
