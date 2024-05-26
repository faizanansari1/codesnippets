import { SnapshotOptions } from 'firebase/firestore';

export type AllSnippetsResult = SnapshotOptions & {
  id: string;
  title?: string;
};

export type Snippet = {
  title: string;
  code: string;
};
