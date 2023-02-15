const utils = {
  generateId() {
    let pass = "";
    let hash = "vue1234567890";

    for (let i = 0, n = hash.length; i < 5; i++) {
      pass += hash.charAt(Math.floor(Math.random() * n));
    }

    return pass;
  },
};

export default utils;
