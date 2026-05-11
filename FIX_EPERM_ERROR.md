# 🔧 FIX: EPERM Error - Operation Not Permitted

## 🎯 Masalah

Error `EPERM: operation not permitted` terjadi karena:
1. Ada proses Node.js yang masih running dan lock file `.next`
2. Antivirus/Windows Defender scan file `.next`
3. File explorer Windows membuka folder `.next`
4. VSCode/editor lain mengakses file `.next`

---

## ✅ SOLUSI TERCEPAT (Pilih Salah Satu)

### **Opsi 1: Gunakan Script Otomatis (RECOMMENDED)**

Saya sudah buat script untuk Anda:

```bash
# Double-click file ini:
clean-and-restart.bat
```

Script ini akan:
1. Stop semua Node processes
2. Hapus folder `.next`
3. Hapus cache
4. Start development server

---

### **Opsi 2: Manual Step-by-Step**

#### **Step 1: Stop Development Server**

Di terminal yang running `npm run dev`, tekan:
```
Ctrl + C
```

Tunggu sampai benar-benar stop (prompt muncul).

#### **Step 2: Kill Semua Node Processes**

Buka **Command Prompt baru** (Run as Administrator) dan jalankan:

```bash
taskkill /F /IM node.exe
```

Atau buka **Task Manager** (Ctrl+Shift+Esc):
1. Cari "Node.js"
2. Klik kanan → "End Task"
3. Ulangi untuk semua Node.js processes

#### **Step 3: Hapus Folder .next**

```bash
cd C:\Users\WIN10\Downloads\Decoisme\decoisme
rmdir /s /q .next
```

Atau manual:
1. Buka folder `decoisme`
2. Hapus folder `.next`
3. Jika error "file in use", tunggu 10 detik dan coba lagi

#### **Step 4: Tutup VSCode/Editor**

Tutup semua editor yang membuka project ini.

#### **Step 5: Start Server Lagi**

```bash
npm run dev
```

---

### **Opsi 3: Restart Komputer (Jika Opsi 1 & 2 Gagal)**

Kadang cara paling mudah adalah restart komputer:

1. **Save semua pekerjaan**
2. **Restart komputer**
3. **Buka terminal baru**
4. **Jalankan:**
   ```bash
   cd C:\Users\WIN10\Downloads\Decoisme\decoisme
   npm run dev
   ```

---

## 🛡️ Mencegah Error Ini

### **1. Disable Antivirus Scan untuk Folder .next**

**Windows Defender:**
1. Buka "Windows Security"
2. Klik "Virus & threat protection"
3. Scroll ke "Virus & threat protection settings"
4. Klik "Manage settings"
5. Scroll ke "Exclusions"
6. Klik "Add or remove exclusions"
7. Klik "Add an exclusion" → "Folder"
8. Pilih folder: `C:\Users\WIN10\Downloads\Decoisme\decoisme\.next`

**Antivirus Lain:**
- Tambahkan `.next` folder ke exclusion list
- Atau disable real-time scanning sementara

### **2. Tutup File Explorer**

Jangan buka folder `.next` di File Explorer saat development server running.

### **3. Gunakan Terminal yang Benar**

Gunakan **Command Prompt** atau **PowerShell**, bukan Git Bash atau WSL.

### **4. Jangan Edit File di .next**

Folder `.next` adalah build output, jangan edit manual.

---

## 🔍 Troubleshooting Lanjutan

### **Problem: Folder .next Tidak Bisa Dihapus**

**Error:** "The action can't be completed because the folder is open in another program"

**Solusi:**

1. **Cek proses yang menggunakan folder:**
   - Download "Process Explorer" dari Microsoft
   - Atau gunakan command:
   ```bash
   handle .next
   ```

2. **Force delete dengan PowerShell:**
   ```powershell
   Remove-Item -Recurse -Force .next
   ```

3. **Restart Explorer.exe:**
   - Buka Task Manager (Ctrl+Shift+Esc)
   - Cari "Windows Explorer"
   - Klik kanan → "Restart"

### **Problem: Error Masih Muncul Setelah Clean**

**Solusi:**

1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

2. **Reinstall dependencies:**
   ```bash
   rmdir /s /q node_modules
   del package-lock.json
   npm install
   ```

3. **Move project ke folder lain:**
   - Folder `Downloads` kadang punya permission issues
   - Move ke `C:\Projects\decoisme`

---

## 🚀 Setelah Fix Error

Setelah error teratasi:

### **Step 1: Verify Server Running**

```bash
npm run dev
```

Tunggu sampai muncul:
```
✓ Ready in 437ms
- Local:         http://localhost:3000
```

### **Step 2: Hard Refresh Browser**

```
Ctrl + Shift + R
```

### **Step 3: Cek Console**

Buka F12 → Console, seharusnya tidak ada error EPERM lagi.

### **Step 4: Test Projects Section**

1. Scroll ke section "Projects"
2. Apakah gambar muncul?
3. Cek console untuk log "Image loaded successfully"

---

## 📋 Checklist

- [ ] Stop development server (Ctrl+C)
- [ ] Kill all Node processes (taskkill /F /IM node.exe)
- [ ] Delete .next folder (rmdir /s /q .next)
- [ ] Close VSCode/editors
- [ ] Add .next to antivirus exclusions
- [ ] Start server (npm run dev)
- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Verify no EPERM errors in console

---

## 💡 Tips

1. **Gunakan script `clean-and-restart.bat`** untuk restart cepat
2. **Jangan buka folder .next** di File Explorer
3. **Add .next ke antivirus exclusions** untuk performa lebih baik
4. **Restart komputer** jika semua cara gagal
5. **Move project** ke folder selain Downloads jika masalah persist

---

## 🎯 Quick Commands

```bash
# Stop Node processes
taskkill /F /IM node.exe

# Delete .next
rmdir /s /q .next

# Start server
npm run dev

# Or use script:
clean-and-restart.bat
```

---

## ✅ Expected Result

Setelah fix:
- ✅ No EPERM errors
- ✅ Server starts successfully
- ✅ Hot reload works
- ✅ No file permission issues

---

Gunakan script `clean-and-restart.bat` untuk restart cepat! 🚀
