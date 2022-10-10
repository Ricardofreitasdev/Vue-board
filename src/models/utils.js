const utils = {
  generateId() {
    let pass = "";
    let hash = "abcdefghijklmnopqrstuvxzABCDEFGHIJKLMNOPQRSTUVXZ123456789";

    for (let i = 0, n = hash.length; i < 15; i++) {
      pass += hash.charAt(Math.floor(Math.random() * n));
    }

    return pass;
  },
};

export default utils;
