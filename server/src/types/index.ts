export type Photo = {
  title: string;
  link: string;
  media: {
    m: string;
  };
  published: string;
  tags: string;
  url: string;
};

export type PhotoId = {
  id: string;
};

export type PhotoIds = string[];