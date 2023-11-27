export interface Objective {
  _id: string;
  name: string;
  slug: string;
  description: string;
  createdUserId: string;
  status: 'INPROGRESS' | 'DONE';
  createdAt: Date;
  updatedAt: Date;
}
