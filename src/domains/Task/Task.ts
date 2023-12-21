export interface Task {
  _id: string;
  title: string;
  body: string;
  createdUserId: string;
  objectiveId: string;
  dueDate: string; // 対応日時
  createdAt: string;
  updatedAt: string;
}
