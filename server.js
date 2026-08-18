const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware melayani file statis dari folder public
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup penyimpanan sederhana untuk upload gambar
const upload = multer({ dest: '/tmp/' });

// Endpoint API Pengiriman Laporan
app.post('/api/laporan', upload.single('dokumentasi'), (req, res) => {
  const { tanggal, nama, nim, departemen, aktivitas } = req.body;
  const file = req.file;

  console.log('Laporan Diterima:', { tanggal, nama, nim, departemen, aktivitas, file });

  res.status(200).json({
    message: 'Laporan OJT berhasil dikirim!'
  });
});

// Route penanganan fallback untuk SPA / index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});