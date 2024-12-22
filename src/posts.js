const posts = [
  { id: 1, title: "Post Num. " + Math.floor(Math.random() * 1000) },
  { id: 2, title: "Post Num. " + Math.floor(Math.random() * 1000) },
];

export function getPosts() {
  return new Promise((resolve, reject) => {
    const isSuccess = Math.random() < 0.25;

    setTimeout(() => {
      if (isSuccess) {
        resolve({ posts: [...posts], time: Date.now() });
      } else {
        reject("Failed to fetch posts. Try again!");
      }
    }, 500);
  });
}

export function addNewPost() {
  return new Promise((resolve, reject) => {
    const isSuccess = Math.random() < 0.25;

    setTimeout(() => {
      if (isSuccess) {
        posts.push({
          id: new Date(),
          title: "Post Num. " + Math.floor(Math.random() * 1000),
        });
        resolve("Post added.");
      } else {
        reject("Failed to add post. Try again!");
      }
    }, 500);
  });
}

export function getPostDetail() {
  return new Promise((resolve, reject) => {
    const detail = "detail " + Math.floor(Math.random() * 1000);

    const user = Math.floor(Math.random() * 1000);

    const isSuccess = Math.random() < 0.25;

    setTimeout(() => {
      if (isSuccess) {
        resolve({ detail, user });
      } else {
        reject("Failed to fetch detail. Try again!");
      }
    }, 500);
  });
}

export function getUser(id) {
  return new Promise((resolve, reject) => {
    if (!id) reject("id is required!");
    const user =
      "Info for user " +
      id +
      ": information info info " +
      Math.floor(Math.random() * 1000);

    const isSuccess = Math.random() < 0.25;

    console.log({ user, isSuccess });

    setTimeout(() => {
      if (isSuccess) {
        resolve({ user });
      } else {
        reject("Failed to fetch user. Try again!");
      }
    }, 500);
  });
}
