import welcome from "../components/welcome.vue";
import inside from "../components/inside.vue";
import forgot_password from "../components/forgot-password.vue";

// greetings

import greetings from "../components/greetings.vue";

// staff module

import user from "../components/staff/user.vue";
import usersList from "../components/staff/usersList.vue";
import viewUser from "../components/staff/viewStaff.vue";

import settings from "../components/settings.vue";

//bugs interfaces
import createBug from "../components/bugs/create-bug.vue";
import viewBugs from "../components/bugs/viewBugs.vue";
import Edit_Bugs from "../components/bugs/Edit-Bugs.vue";
import Delete_bugs from "../components/bugs/Delete-bugs.vue";

//project interface
import create_project from "../components/bugs/create-project.vue";
import Modify_project from "../components/bugs/Modify-project.vue";
import Delete_project from "../components/bugs/Delete-project.vue";

//project comment-Blog

import Update_comment from "../components/bugs/Update-comment.vue";
import Delete_comment from "../components/bugs/Delete-comment.vue";
import View_comment from "../components/bugs/View-comment.vue";

//project status
import Delete_status from "../components/bugs/Delete-status.vue";
import Edit_status from "../components/bugs/Edit-status.vue";
import View_status from "../components/bugs/View-status.vue";

//project reports
import Bug_Progress from "../components/Report/BugStatus.vue";
import Developer_Progress from "../components/Report/DeveloperProgress.vue";
import Monthly_Progress from "../components/Report/MonthlyProgress.vue";
import SQA_Progress from "../components/Report/SQAProgress.vue";
import projectWise from "../components/Report/ProjectWise.vue";
import userReport from "../components/Report/UserReport.vue";
import bugsSummary from "../components/Report/bugSummary.vue";

//labels
import createLabel from "../components/labels/create-label.vue";
import labelsList from "../components/labels/labels-list.vue";

const routes = [
  {
    path: "/",
    component: welcome,
    ignore: true,
  },

  {
    path: "/forgot-password",
    component: forgot_password,
    ignore: true,
  },
  {
    path: "/dashboard",
    component: greetings,
    name: "Greeting screen",
    meta: { requiresAuth: true, tag: "Greeting" },
    ignore: true,
  },
  {
    path: "/user",
    component: user,
    name: "Create / update user",
    meta: { requiresAuth: true, tag: "User" },
  },
  {
    path: "/update-staff",
    component: usersList,
    name: "Users list",
    meta: { requiresAuth: true, tag: "User" },
  },
  {
    path: "/viewStaff",
    component: viewUser,
    name: "View user",
    meta: { requiresAuth: true, tag: "User" },
  },

  {
    path: "/create-bug",
    component: createBug,
    name: "Create / update bug",
    meta: { requiresAuth: true, tag: "Bug" },
  },
  {
    path: "/bugs-list",
    component: viewBugs,
    name: "Bugs list",
    meta: { requiresAuth: true, tag: "Bug" },
  },
  {
    path: "/Edit-Bugs",
    component: Edit_Bugs,
    name: "Edit Bugs",
    meta: { requiresAuth: true, tag: "Bug" },
  },
  {
    path: "/Delete-bugs",
    component: Delete_bugs,
    name: "Delete Bugs",
    meta: { requiresAuth: true, tag: "Bug" },
  },

  // {
  //path: "/settings",
  //component: settings,
  //name: "Settings",
  //meta: { requiresAuth: true, tag: "Settings" },
  // ignore: true,
  //},

  {
    path: "/create-project",
    component: create_project,
    name: "Create project",
    meta: { requiresAuth: true, tag: "bugs" },
  },
  {
    path: "/modify-project",
    component: create_project,
    name: "Update project",
    meta: { requiresAuth: true, tag: "bugs" },
  },
  {
    path: "/projects-list",
    component: Modify_project,
    name: "Projects list",
    meta: { requiresAuth: true, tag: "bugs" },
  },
  {
    path: "/create-label",
    component: createLabel,
    name: "Create labels",
    meta: { requiresAuth: true, tag: "bugs" },
  },
  {
    path: "/update-label",
    component: createLabel,
    name: "Update labels",
    meta: { requiresAuth: true, tag: "bugs" },
  },
  {
    path: "/labels-list",
    component: labelsList,
    name: "Labels list",
    meta: { requiresAuth: true, tag: "bugs" },
  },
  {
    path: "/Delete-project",
    component: Delete_project,
    name: "Delete project",
    meta: { requiresAuth: true, tag: "bugs" },
  },

  {
    path: "/Delete-comment",
    component: Delete_comment,
    name: "Delete comment",
    meta: { requiresAuth: true, tag: "bugs" },
  },
  {
    path: "/Update-comment",
    component: Update_comment,
    name: "Update comment",
    meta: { requiresAuth: true, tag: "bugs" },
  },
  {
    path: "/View-comment",
    component: View_comment,
    name: "View comment",
    meta: { requiresAuth: true, tag: "bugs" },
  },
  {
    path: "/Delete-status",
    component: Delete_status,
    name: "Delete status",
    meta: { requiresAuth: true, tag: "bugs" },
  },
  {
    path: "/Edit-status",
    component: Edit_status,
    name: "Edit status",
    meta: { requiresAuth: true, tag: "bugs" },
  },
  {
    path: "/View-status",
    component: View_status,
    name: "View status",
    meta: { requiresAuth: true, tag: "bugs" },
  },
  {
    path: "/BugProgress",
    component: Bug_Progress,
    name: "Bug Progress",
    meta: { requiresAuth: true, tag: "Report" },
  },
  {
    path: "/DeveloperProgress",
    component: Developer_Progress,
    name: "Developer Progress",
    meta: { requiresAuth: true, tag: "Report" },
  },
  {
    path: "/MonthlyProgress",
    component: Monthly_Progress,
    name: "Monthly Progress",
    meta: { requiresAuth: true, tag: "Report" },
  },
  {
    path: "/SQAProgress",
    component: SQA_Progress,
    name: "SQA Progress",
    meta: { requiresAuth: true, tag: "Report" },
  },
  {
    path: "/projectWise",
    component: projectWise,
    name: "Bugs by project",
    meta: { requiresAuth: true, tag: "Report" },
  },
  {
    path: "/userReport",
    component: userReport,
    name: "User report",
    meta: { requiresAuth: true, tag: "Report" },
  },
  {
    path: "/bugsSummary",
    component: bugsSummary,
    name: "Bugs summary report",
    meta: { requiresAuth: true, tag: "Report" },
  },
];

export default routes;
