type Picture = {
  _id: string;
  name: string;
  urlImage: string;
  dateUpload: string;
  description: string;
  slider: number;
  category: {
    categoryID: string;
    categoryName: string;
  };
  author: {
    authorId: string;
    authorName: string;
  };
};
export default Picture;
