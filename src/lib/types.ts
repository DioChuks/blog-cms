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

export interface ContentCardProps {
  data: {
    title: string;
    date: string;
    time: string;
    category: string;
    tags: string[];
    clicks: number;
    is_hidden: boolean;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: number;
  access_key: string;
  created_at: string;
  updated_at: string;
}

export interface NewUser {
  name: string;
  email: string;
  role: string;
}

export interface EditorProfile {
  id: number;
  name: string;
  category: string;
  created_at: string;
  updated_at: string;
}