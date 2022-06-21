import { Student } from './student.model';
export class Appointment {
    id?: any;
    studentId?: any;
    student?: string;
    psychopedagogistId?: any;
    psychopedagogist?: string;
    activity?: string;
    causeDescription?: string;
    virtual?: boolean;
    date?: string;
    startTime?: string;
    endTime?: string;
    comment?: string;
    reminder?: boolean;
    rating?: any;
}
