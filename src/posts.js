export function getPosts() {
  return new Promise((resolve, reject) => {
    const posts = [
      { id: 1, title: "Post Num. " + Math.floor(Math.random() * 1000) },
      { id: 2, title: "Post Num. " + Math.floor(Math.random() * 1000) },
    ];

    const isSuccess = Math.random() < 0.25;

    setTimeout(() => {
      if (isSuccess) {
        resolve({ posts, time: Date.now() });
      } else {
        reject("Failed to fetch posts. Try again!");
      }
    }, 500);
  });
}
