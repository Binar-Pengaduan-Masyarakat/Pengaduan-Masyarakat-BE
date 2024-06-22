#First Project
-----------------------

##Info :

- Config : Untuk mengonfigurasi / Menghubungkan Database
- Controller : Untuk Menyimpan Logic
- Models : Untuk menyimpan data dari database
- middleware : Untuk menyimpan berbagai middleware error dan lain-lain
- public : Untuk menyimpan file yang dibutuhkan untuk tampilan, seperti image, css, javascript dan lain-lain
- routes : Untuk penyimpanan file yang berisikan address (endpoint)
- services : Untuk menyimpan berbagai file service
- utils : untuk menyimpan proses validator
- views : Untuk menyimpan berbagai file layout berupa ejs, pug, atau jade

Kalau Ada tambahan boleh ya teman-teman

ketika udah di clone,jika teman-teman udah masuk di visual studio code, teman-teman buka terminal ya check terlebih dahulu branch apa yang terpakai dalam `code` teman-teamn jika branchnya `main` teman-teman nanti ubah branch ya lewat terminal, ubah branchnya ke branch `develop` ya dengan perintah :

```
git checkout develop
```

>[!NOTE]
> Penggunaan Git

Jika teman-teman udah mengedit atau menambahkan file, ada step-step untuk push ke repository ya :

1. Add terlebih dahulu dengan perintah :

```
git add . 
```

fungsi : "untuk memasukkan hasil edit ke stagging state



2. Lalu commit dengan perintah :

```
git commit -m "Pesan yang ingin di sampaikan"
```

fungsi : "untuk menyiapkan code sebelum di push "


3. Push Code teman-teman dengan perintah :

```
git push -u origin develop

```


fungsi: untuk menambahkan code teman-teman kerepository


>[!WARNING] :
> Usaha-in sebelum di push, teman-teman pull dulu ya agar nantinya code teman kita tidak hilang (tertimpa oleh kodingan kita), Oke 

>[!IMPORTANT]
>cara untuk Pull dari repository, yaitu dengan memberti perintah pada terminal dengan perintah :

```
git pull

```

fungsi: "mengambil data baru jika ada salah seorang develop mengupdate file atau code"