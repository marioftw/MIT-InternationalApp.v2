import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

export interface Users {
    id: number;
    userId: string;
    first_name: string;
    second_name: string;
    last_name: string;
    gender: string;
    role: string;
    email: string;
    dateOfBirth: Timestamp;
    createdOn: Timestamp;
    completed_registration_form: boolean;
}

export interface Prefered {
    prefered_family_name: string;
    prefered_first_name: string;
    title: string;
}

export interface Important {
    insurance: string;
    insurance_company: string;
    insurance_policy_file: string;
    nzqa_number: number;
    citinzenchip: string;
    passport_file: string;
    visa_file: string;
}

export interface Ethnicity {
    ethnic_group_1: string;
    ethnic_group_2: string;
    ethnic_group_3: string;
}

export interface HomeContact {
    home_address: string;
    home_city: string;
    home_country: string;
    home_phone: number;
    home_cellphone: number;
    home_email: string;
}

export interface WorkContact {
    work_company_name: string;
    work_address: string;
    work_city: string;
    work_country: string;
    work_phone: number;
    work_cellphone: number;
    work_email: string;
}

export interface NZContact {
    nz_apartment_number: string;
    nz_street: string;
    nz_suburb: string;
    nz_city: string;
    nz_postcode: number;
    nz_phone: number;
    nz_cellphone: number;
    nz_email: string;
}

export interface EmergencyConatct {
    emergency_contact_name: string;
    emergency_home_phone: number;
    emergency_work_phone: number;
    emergency_cellphone: number;
    emergency_relationship: string;
}

export interface AcademicDetails {
    school_name: string;
    school_last_year: number;
    qualification: string;
    qualification_other: string;
    first_tertiary_year: number;
    attended_tertiary: string;
    first_enrolment_year: number;
    occupation: string;
    pte_name: string;
    pte_last_year: number;
    first_language: string;
    programme_name: string;
    programme_start_date: Timestamp;
}