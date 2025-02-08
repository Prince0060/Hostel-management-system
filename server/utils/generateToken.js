import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

const getIdFromToken = (req,res) => {
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      var token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded.id;
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed" + error);
    }
  }
}

export { generateToken, getIdFromToken };
