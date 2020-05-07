export interface IBook {
  title: string;
  isbn: string;
  recommendDate: { year: number; month: number };
  thumbnailUrl: string;
  shortDescription: string;
  authors: string[];
  tags: string[];
  purchaseLink: string;
}

export interface IMonth {
  month: number;
  year: number;
}

export interface ITag {
  key: number;
  label: string;
}
