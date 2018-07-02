import { FETCH_MENTOR_STUDENT_TASK } from '@/constant/actionTypeMentor';
export const mentorStudentTask = (state = [], { type, payload }) => {
    switch (type) {
        case FETCH_MENTOR_STUDENT_TASK:
            return payload;
        default:
            return state;
    }
};
