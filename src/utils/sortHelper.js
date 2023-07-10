const sortHelper = (posts, sortby) => {
  posts = [...posts];
  if (sortby === "latest") {
    posts.sort((a, b) => {
      const timeA = Number(
        a.createdAt
          .replaceAll(" ", "")
          .replaceAll(":", "")
          .replaceAll(".", "")
          .replaceAll("T", "")
          .replaceAll("Z", "")
          .replaceAll("-", "")
      );
      const timeB = Number(
        b.createdAt
          .replaceAll(" ", "")
          .replaceAll(":", "")
          .replaceAll(".", "")
          .replaceAll("T", "")
          .replaceAll("Z", "")
          .replaceAll("-", "")
      );
      console.log(timeA, timeB);
      return timeB - timeA;
    });
  }

  if (sortby === "likes") {
    posts.sort((a, b) => b.likes.length - a.likes.length);
  }
  return posts;
};

export default sortHelper;
