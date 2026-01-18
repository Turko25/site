export type BlockType = 'paragraph' | 'heading' | 'image' | 'list' | 'quote';

export interface Block {
  id: string; // UUID
  type: BlockType;
  content?: string; // HTML içeriği (Paragraph, Heading için)
  attributes: {
    level?: 1 | 2 | 3 | 4 | 5 | 6; // Heading için
    align?: 'left' | 'center' | 'right'; // Hizalama
    url?: string; // Image için
    alt?: string; // Image için
    caption?: string; // Image için
    placeholder?: string;
    [key: string]: any;
  };
}

export interface PostSettings {
  title: string;
  slug: string;
  status: 'publish' | 'draft' | 'private';
  visibility: 'public' | 'password';
  publishDate: string;
  authorId: string;
  categoryId: string;
  featuredImage: string | null;
  excerpt: string;
  allowComments: boolean;
}