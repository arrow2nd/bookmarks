export type Color = `#${string}`;

export type Bookmark = {
  id: string;
  title: string;
  url: string;
  tag: string;
  description?: string;
  color?: Color;
};
