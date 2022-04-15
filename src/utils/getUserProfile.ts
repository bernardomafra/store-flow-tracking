export interface User {
  email: string;
  id: string;
}

export default function getUserProfile(): Promise<User> {
  return new Promise((resolve, reject) => {
    chrome.identity.getProfileUserInfo((user) => {
      if (user) {
        resolve(user);
      } else {
        reject('error at getting user profile');
      }
    });
  });
}
