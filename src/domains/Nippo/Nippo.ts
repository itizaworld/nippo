export interface Nippo {
  _id: string;
  body: string;
  date: string; // YYYY-MM-DD 形式で保持する日付
  objectiveId: string;
  createdUserId: string;
  createdAt: Date;
  updatedAt: Date;
}
