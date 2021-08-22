export interface TeacherData{
    TeacherID:number;
    Name: string;
    FatherName: string;
    CNIC:string;
    PostalAddress:string;
    PermanentAddress:string;
    ContactNumber:string;
    EmailAddress:string;
    Religion:string;
    DistrictID:number;
    District:string;
    GenderID:number;
    Gender:string;
    StatusID:number;
    Status:string;
    DesignationID:number;
    Designation:string;
    CampusID:number;
    Campus:string;
    ScaleID:number;
    Scale:string;
    Nationality:string;
    DOB:Date;
    AppointmentDate:Date;
    ConfirmationDate:Date;
}
export interface TeachersData{
    TeacherID:number;
    Name:string;
    FatherName: string;
    CNIC:string;
    PostalAddress:string;
    PermanentAddress:string;
    ContactNumber:string;
    EmailAddress:string;
    Religion:string;
    DistrictID:number;
    GenderID:number;
    StatusID:number;
    DesignationID:number;
    CampusID:number;
    ScaleID:number;
    Nationality:string
    DOB: Date;
    AppointmentDate:Date;
    ConfirmationDate:Date;
}
export interface DistrictData{
    DistrictID:number;
    name: string;
}
export interface DomicileDistrict{
    DistrictID:number;
    DistrictName:string;
}
export interface Gender{
    GenderID:number;
    Gender:string;
}
export interface MartialStatus{
    StatusID:number;
    Status:string;
}
export interface campus{
    Campus:string;
    CampusID:number;
}
export interface Designation{
    Designation:string;
    DesignationID:number;
}
export interface Scale{
    Scale:string;
    ScaleID:number;
}