// Menu Types
export interface MenuItem {
    label: string;
    icon: string;
    href: string;
}

export interface MenuCategory {
    label: string;
    icon: string;
    items: MenuItem[];
}

export interface MenuData {
    mainMenu: MenuCategory[];
    quickLinks: MenuItem[];
}

// Product Types
export interface Product {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    route: string;
}

// Stats Types
export interface StatCard {
    title: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down';
    icon: string;
    color: string;
}

// Request Types
export interface PendingRequest {
    id: string;
    name: string;
    type: string;
    days: string;
    avatar?: string;
}

// Feed Types
export interface PunchEntry {
    id: string;
    name: string;
    department: string;
    punchIn: string;
    punchOut: string;
    status: 'present' | 'late' | 'absent';
}
