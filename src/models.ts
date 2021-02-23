export type Tag = {
  name: string;
  count: number;
};

export type FrontMatter = {
  title: string;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
  imageUrl?: string;
};

export type Header = {
  matter: FrontMatter;
  slug: string;
  excerpt: string;
};

export type Article = {
  header: Header;
  bodyMdText: string;
  tocMdText: string;
};
