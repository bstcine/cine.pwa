import { FETCH_MENTOR_STUDENT_QUIZ_WORD } from '@/constant/actionTypeMentor';
export const mentorStudentQuizWord = (state = [], { type, payload }) => {
    switch (type) {
        case FETCH_MENTOR_STUDENT_QUIZ_WORD:
            return payload;
        default:
            return state;
    }
};
