# Setup Postgres Lokal untuk Hyperdrive Development

## 1. Install Postgres

### Arch Linux (yang kamu pakai):
```bash
sudo pacman -S postgresql
```

### Ubuntu/Debian:
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

### macOS (dengan Homebrew):
```bash
brew install postgresql@15
brew services start postgresql@15
```

## 2. Setup Database

```bash
# Start Postgres service
sudo systemctl start postgresql
sudo systemctl enable postgresql  # Auto-start on boot

# Login sebagai user postgres
sudo -u postgres psql

# Di dalam psql, buat database dan user:
CREATE DATABASE whatsapp_bot;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE whatsapp_bot TO postgres;
\q
```

## 3. Setup Environment Variable

Buat file `.dev.vars` di root project (copy dari `.dev.vars.example`):

```bash
cp .dev.vars.example .dev.vars
```

Edit `.dev.vars` dan sesuaikan connection string:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/whatsapp_bot
```

**Atau** set environment variable langsung:

```bash
export WRANGLER_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE=postgresql://postgres:postgres@localhost:5432/whatsapp_bot
```

## 4. Run Database Migrations (jika ada)

```bash
pnpm drizzle-kit push
# atau
pnpm migrate
```

## 5. Test Koneksi

```bash
# Test dengan psql
psql postgresql://postgres:postgres@localhost:5432/whatsapp_bot

# Atau jalankan wrangler dev
pnpm dev
```

## Troubleshooting

### Postgres tidak jalan:
```bash
sudo systemctl status postgresql
sudo systemctl start postgresql
```

### Port 5432 sudah digunakan:
Cek dengan:
```bash
sudo lsof -i :5432
```

Ubah port di connection string atau hentikan service yang menggunakan port tersebut.

### Permission denied:
Pastikan user postgres punya akses ke database:
```sql
GRANT ALL PRIVILEGES ON DATABASE whatsapp_bot TO postgres;
```

### Connection string format:
Format yang benar: `postgresql://username:password@host:port/database_name`

Contoh:
- `postgresql://postgres:postgres@localhost:5432/whatsapp_bot`
- `postgresql://myuser:mypass@127.0.0.1:5432/mydb`
