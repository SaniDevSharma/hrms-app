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

// Employee Types
export interface Employee {
    id: string;
    employeeId: string;
    name: string;
    email: string;
    role: string;
    department: string;
    status: 'Active' | 'Inactive';
    joinDate: string;
    location: string;
    avatar: string;

    // Personal Details
    dob?: string;
    gender?: 'Male' | 'Female' | 'Other';
    maritalStatus?: 'Single' | 'Married' | 'Divorced';
    bloodGroup?: string;
    phone?: string;
    fatherName?: string;

    // Address
    currentAddress?: string;
    permanentAddress?: string;

    // Professional
    managerId?: string;
    employmentType?: 'Full-time' | 'Contract' | 'Intern';
    shift?: string;

    // Statutory
    pan?: string;
    aadhar?: string;
    uan?: string;
    pfNumber?: string;

    // Bank
    bankName?: string;
    accountNumber?: string;
    ifscCode?: string;
    branchName?: string;
}

// Department Types
export interface Department {
    id: string;
    name: string;
    headOfDepartment: string;
    employeeCount: number;
    status: 'Active' | 'Inactive';
}

// Designation Types
export interface Designation {
    id: string;
    name: string;
    department: string;
    level: string;
    status: 'Active' | 'Inactive';
}

// Location Types
export interface Location {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    status: 'Active' | 'Inactive';
}
