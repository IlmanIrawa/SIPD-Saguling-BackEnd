const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT
const adminAuthorization = require('./middleware/adminAuthorization')
const cors = require('cors')
const path = require("path");


app.use(express.json());
app.use(cors())
app.get('/', (req,res) => {
    console.log(tes)
    res.send('helo world')
})

const authController = require('./auth/auth.controller')
const userController = require('./user/user.controller')
const asetController = require('./Aset/aset.controller')
const beritaController = require('./Berita/berita.controller')
const laporController = require('./Lapor/lapor.controller')
const pengajuanController = require('./Pengajuan/pengajuan.controller')
const sosialController = require('./Sosial/sosial.controller')
const authorizeJWT = require('./middleware/authorizeJWT')
const pengajuanRoutes = require('./routes/pengajuan.routes')
const beritaRoutes = require('./routes/berita.routes')
const statistikController = require('./Statistik/statistik.controller')

app.use('/api/auth', authController)
app.use('/api/aset', asetController)
app.use('/api/berita', beritaController)
app.use('/api/lapor', laporController)
app.use('/api/pengajuan', pengajuanController)
app.use('/api/sosial', sosialController)
app.use('/api/user', authorizeJWT, userController)
app.use('/api', pengajuanRoutes);
app.use('/api', beritaRoutes);
app.use("/uploads", express.static(path.join(__dirname, 'middleware', 'uploads'))); 
app.use('/api/statistik', statistikController)

// export default app;
app.listen(PORT, () => {
    console.log('server berjalan port : ' + PORT)
})