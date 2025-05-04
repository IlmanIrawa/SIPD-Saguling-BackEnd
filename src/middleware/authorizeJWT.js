require("dotenv").config(); // Memuat variabel dari .env
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error("JWT_SECRET tidak ditemukan! Pastikan sudah diatur di .env");
}

function authorizeJWT(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({
      message: "Forbidden: Token tidak ditemukan. Pastikan Anda telah login.",
    });
  }

  // Pastikan token menggunakan format "Bearer <token>"
  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(403).json({
      message:
        "Forbidden: Format token tidak valid. Gunakan format 'Bearer <token>'.",
    });
  }

  const token = tokenParts[1];

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(403).json({
          message: "Forbidden: Token sudah kedaluwarsa. Silakan login kembali.",
        });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(403).json({
          message: "Forbidden: Token tidak valid. Coba login kembali.",
        });
      } else {
        return res.status(403).json({
          message: "Forbidden: Token tidak dapat diverifikasi.",
        });
      }
    }

    req.user = decoded; // Simpan informasi user yang sudah diverifikasi
    next();
  });
}

module.exports = authorizeJWT;
