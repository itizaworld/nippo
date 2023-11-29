import { format } from 'date-fns';

export const getDateString = (date: string) => format(new Date(date), 'yyyy年MM月dd日');
