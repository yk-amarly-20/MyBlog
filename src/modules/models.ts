export type Tag = {
  name: string;
  count: number;
};

export type Matter = {
  title: string;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
  imageUrl?: string;
};

export type Header = {
  slug: string;
  matter: Matter;
  excerpt: string;
};

export type Article = {
  header: Header;
  bodyMdText: string;
  tocMdText: string;
};
