// File: middleware.js

class Middleware {
  // Contoh middleware untuk mencetak waktu setiap kali ada permintaan masuk
  static logRequestTime(req, res, next) {
    console.log(`Request received at ${new Date()}`);
    next();
  }

  // Contoh middleware untuk memverifikasi apakah pengguna memiliki sesi aktif
  static authenticate(req, res, next) {
    if (req.session && req.session.user) {
      next();
    } else {
      res.status(401).send("Not Found");
    }
  }

  // Contoh middleware untuk menangani kesalahan server
  static errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  }

  static notFound(req, res, next) {
    res.status(404).json({ message: "Not Found" });
  }
  // Middleware untuk menangani kasus data tidak ditemukan
  static dataNotFound(req, res, next) {
    if (!req.data) {
      return res.status(404).json({ message: "Data not found" });
    }
    next();
  }
  // Middleware untuk menangani kesalahan server
  static handleServerError(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = Middleware;
