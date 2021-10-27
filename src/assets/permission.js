const admin = [
  {
    action: "group",
    title: "User",
    items: [
      {
        title: "Create an user",
        path: "/user",
      },
      {
        title: "Users list",
        path: "/update-staff",
      },
    ],
  },
  {
    action: "library_books",
    title: "Bug",
    items: [
      {
        title: "Create Bugs",
        path: "/create-bug",
      },
      {
        title: "Bugs List",
        path: "/bugs-list",
      },
      // {
      //   title: "Edit Bugs",
      //   path: "/Edit-Bugs",
      // },
      //{
      // title: "Delete Bugs",
      // path: "/Delete-bugs",
      // },
      {
        title: "Create Project",
        path: "/create-project",
      },

      {
        title: "Projects list",
        path: "/projects-list",
      },
      // {
      //   title: "Delete Project",
      //   path: "/Delete-project",
      //},
      // {
      //  title: "Delete Status",
      // path: "/Delete-status",
      // },
      {
        title: "Create labels",
        path: "/create-label",
      },
      {
        title: "Labels list",
        path: "/labels-list",
      },

      //{
      // title: "Update Comment",
      // path: "/Update-comment",
      // },
      //{
      // title: "Delete Comment",
      // path: "/Delete-comment",
      //},
      //{
      // title: "View Comment",
      // path: "/View-comment",
      //},
    ],
  },

  {
    action: "library_books",
    title: "Report",
    items: [
      {
        title: "BugProgress",
        path: "/BugProgress",
      },
      {
        title: "DeveloperProgress ",
        path: "/DeveloperProgress",
      },
      {
        title: "MonthlyProgress ",
        path: "/MonthlyProgress",
      },
      {
        title: "SQAProgress ",
        path: "/SQAProgress",
      },
      {
        title: "Bugs by project ",
        path: "/projectWise",
      },
      {
        title: "User report",
        path: "/userReport",
      },
    ],
  },
];

const manager = [];

const staff = [];

export { staff, manager, admin };
