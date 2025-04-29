const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, current) => {
    return acc + current.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const maximum = Math.max(...likes);
  const fav = blogs.filter((blog) => blog.likes === maximum);
  return fav.length === 1 ? fav[0] : fav;
};

const mostBlogs = (blogs) => {
  const groupByArray = _.groupBy(blogs, (blog) => blog.author);

  const authorBlogArray = _.map(groupByArray, (value, key) => ({
    author: key,
    blogs: value.length,
  }));
  const mostBlogsAuthor = _.maxBy(authorBlogArray, "blogs");
  console.log(mostBlogsAuthor);
  return mostBlogsAuthor;
};

const mostLikes = (blogs) => {
  const groupByAuthor = _.groupBy(blogs, (blog) => blog.author);
  const authorTotalLikes = _.map(groupByAuthor, (value, key) => {
    return { author: key, likes: totalLikes(value) };
  });
  console.log(authorTotalLikes);
  const mostLikedAuthor = _.maxBy(authorTotalLikes, "likes");
  return mostLikedAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
