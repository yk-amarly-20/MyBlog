export type Tag = {
  name: string;
};

export type FrontMatter = {
  title: string;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
};

export type Header = {
  matter: FrontMatter;
  slug: string;
};

export type Article = {
  header: Header;
  context: string;
};
