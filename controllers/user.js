export const getParticularUser = (req, res) => {
  res.status(200).json("GET /user/:id");
};

export const userSignup = (req, res) => {
  res.status(200).json("POST /user/signup");
};

export const userLogin = (req, res) => {
  res.status(200).json("POST /user/login");
};

export const editUserDetails = (req, res) => {
  res.status(200).json("PATCH /user/:id");
};
