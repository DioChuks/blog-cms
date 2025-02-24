export interface EditorContent {
    content: string
    timestamp: number
}

export interface MetaPayload {
  thumbnail: string | null;
  slug: string | null;
  title: string;
  description: string;
  category: number;
  tags: string[];
}