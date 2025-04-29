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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
