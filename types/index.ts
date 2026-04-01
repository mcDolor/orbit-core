export type UserRole = 'admin' | 'officer' | 'member';

export type User = {
    user_id: string;
    email: string;
    role: UserRole;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
}

export type Organization = {
    org_id: string;
    owner_id: string;
    name: string;
    venue_lat: number;
    venue_lng: number;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
}

export type OrgMember = {
    org_member_id: string;
    org_id: string;
    user_id: string;
    role: UserRole;
    joined_at: string;
    is_deleted: boolean;
}

export type Event = {
    event_id: string;
    org_id: string;
    name: string;
    event_date: string;
    timein_start: string
    timein_end: string;
    timeout_start: string;
    timeout_end: string;
    late_fine: number;
    absent_fine: number;
    event_code: string;
    status: 'active' | 'cancelled';
    created_at: string;
    updated_at: string;
}

export type AttendanceLog = {
    log_id: string;
    event_id: string;
    user_id: string;
    timein_at: string | null;
    timeout_at: string | null;
    lat_recorded: number;
    lng_recorded: number;
    created_at: string;
}

export type Fine = {
    fine_id: string;
    log_id: string;
    user_id: string;
    amount: number;
    reason: string;
    is_paid: boolean;
    created_at: string;
    updated_at: string;
}