import {
  LayoutDashboard,
  Building2,
  CreditCard,
  KeyRound,
  Code2,
  Users,
  Package,
  ClipboardList,
  Network,
  FolderTree,
  Settings,
  Briefcase,
  FileUser,
  LogOut,
} from "lucide-react";

export const companyMenu = [
  {
    section: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/company/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    section: "Company",
    items: [
      {
        title: "Company Profile",
        href: "/company/profile",
        icon: Building2,
      },
      {
        title: "Subscription",
        href: "/company/subscription",
        icon: CreditCard,
      },
      {
        title: "Billing",
        href: "/company/billing",
        icon:CreditCard,
      },
      {
        title: "API Key",
        href: "/company/api-key",
        icon: KeyRound,
      },
      {
        title: "Widget Script",
        href: "/company/widget",
        icon: Code2,
      },
    ],
  },

  {
    section: "Recruitment",
    items: [
      {
        title: "Jobs",
        href: "/company/jobs",
        icon: Briefcase,
      },
      {
        title: "Applications",
        href: "/company/applications",
        icon: FileUser,
      },
      {
        title: "Departments",
        href: "/company/departments",
        icon: FolderTree,
      },
      {
        title: "Locations",
        href: "/company/locations",
        icon: Network,
      },
    ],
  },

  {
    section: "Team",
    items: [
      {
        title: "Team Members",
        href: "/company/team-members",
        icon: Users,
      },
    ],
  },

  {
    section: "Preferences",
    items: [
      {
        title: "Settings",
        href: "/company/settings",
        icon: Settings,
      },
    ],
  },

  {
    section: "Account",
    items: [
      {
        title: "Logout",
        href: "/auth/login",
        action: "logout",
        icon: LogOut,
      },
    ],
  },
];

export const adminMenu = [
  {
    section: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    section: "Management",
    items: [
      {
        title: "Companies",
        href: "/admin/companies",
        icon: Users,
      },
      {
        title: "Subscriptions",
        href: "/admin/subscriptions",
        icon: Package,
      },
    ],
  },

  {
    section: "Monitoring",
    items: [
      {
        title: "Audit Logs",
        href: "/admin/audit-logs",
        icon: ClipboardList,
      },
    ],
  },

  {
    section: "Account",
    items: [
      {
        title: "Logout",
        href: "/admin/login",
        action: "logout",
        icon: LogOut,
      },
    ],
  },
];