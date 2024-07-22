> [!NOTE]
> Informasi Tentang Server

# **PENGADUAN MASYARAKAT BAGIAN - BE (Server)**

Dokumentasi API: https://documenter.getpostman.com/view/23290974/2sA3kUH2zP

## PENEJALASAN SERVER

---

Server Pengaduan Masyarakat ini berisikan banyak logic yang dimana logicnya antara lain :

> - Logic CRUD User
> - Logic CRUD Admin Institut
> - Logic CRUD Report (Laporan)
> - Logic CRUD Report Response (Respon Laporan)
> - Logic CRUD Result Report (Hasil Laporan)
> - Logic CRUD SameReporter (Laporan Yang sama)
> - Logic CRUD Category
> - Logic Authentikasi
> - Logic view Chart (Tampilan Grafik)

...

Serta API Routing yang telah di setting atau di atur sedemikian rupa agar dapat dipakai oleh sistem yang akan menggunakannya.
dilengkapi dengan beberapa `middleware` yaitu `authenticate` dan `checkUserExit`.

```
Server Terbuat dari : `Express.Js`
Tipe Database : `Postgres SQL`
Tipe querybuilder : `knex.js`
Tipe testing Backend : `Jest`
Tipe enkripsi key : `bycript`
```
