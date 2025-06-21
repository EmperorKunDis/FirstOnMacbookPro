# SVCI - Student Vice Council Initiative

Full-stack webová aplikace pro SVCI (Student Vice Council Initiative) se 3D grafikou, autentifikací a guild member ranking systémem.

## 🏗️ Architektura

- **Frontend**: React + Vite s React Three Fiber pro 3D graphics
- **Backend**: Supabase (PostgreSQL databáze, auth, real-time API)
- **Další**: Node.js server pro guild member ranking

## 🚀 Rychlý start

### Předpoklady
- Node.js 18+
- npm nebo yarn
- Supabase account (pro produkci)

### Lokální development

1. **Klonování repozitáře**
```bash
git clone https://github.com/EmperorKunDis/FirstOnMacbookPro.git
cd FirstOnMacbookPro
```

2. **Frontend setup**
```bash
cd frontend
npm install
cp .env.example .env  # a nakonfiguruj Supabase klíče
npm run dev
```

3. **Node.js Guild Ranking Server**
```bash
# V root directory
node index.js
```

### Environment Variables

Vytvoř `.env` soubor ve `frontend/` directory:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 🌐 Deployment

### Frontend (Vercel/Netlify)
1. Připoj GitHub repozitář k Vercel/Netlify
2. Set build command: `cd frontend && npm run build`
3. Set publish directory: `frontend/dist`
4. Přidej environment variables

### Backend (Supabase)
1. Vytvoř nový projekt na [supabase.com](https://supabase.com)
2. Zkopíruj URL a keys do environment variables
3. Setup databází schema a RLS policies

## 📁 Struktura projektu

```
├── frontend/                 # React aplikace
│   ├── src/
│   │   ├── components/      # 3D komponenty (React Three Fiber)
│   │   ├── sections/        # Stránky (Hero, Login, Leadership, atd.)
│   │   ├── context/         # Auth context
│   │   └── lib/            # Supabase client
│   └── public/
├── backend/supabase/        # Supabase konfigurace
├── dev-data/               # Sample data pro guild system
├── profiles/               # User profile images
├── template/               # HTML templates pro ranking
└── index.js               # Node.js guild ranking server
```

## 🎮 Funkce

- **3D Interaktivní prostředí** pomocí React Three Fiber
- **Autentifikace** s Supabase Auth
- **Guild member ranking system**
- **Responsive design** s Tailwind CSS
- **Real-time funkce** s Supabase
- **Leadership gallery**
- **Event management**
- **Contact forms**

## 🛠️ Tech Stack

### Frontend
- React 18 + Vite
- React Three Fiber (3D graphics)
- Tailwind CSS
- React Router
- Axios
- Lucide React (ikony)

### Backend
- Supabase (PostgreSQL + Auth + API)
- Node.js + Express
- JWT autentifikace

## 📱 URL Endpointy

- **Frontend**: http://localhost:5173
- **Guild API**: http://localhost:8000
- **Supabase**: Configured via environment variables

## 🤝 Contributing

1. Fork projekt
2. Vytvoř feature branch (`git checkout -b feature/amazing-feature`)
3. Commit změny (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Otevři Pull Request

## 📝 License

MIT License - viz [LICENSE](LICENSE) soubor.

## 🐛 Issues

Pro bugs a feature requesty použij [GitHub Issues](https://github.com/EmperorKunDis/FirstOnMacbookPro/issues).