# 🍵 Shay Sukar - Interactive Tea Shop Menu System

A real-time order management system for tea shops with customer menu and barista dashboard.

## 📦 Two Versions Available

### 1. **Standalone Version** (Currently Live)
- ✅ Works without a server
- ✅ Uses localStorage for data
- ⚠️ Single-device only (both menu and dashboard must be on same device)
- ⚠️ Has flickering/refresh issues

**Files:**
- `index.html` - Landing page
- `menu_standalone.html` - Customer menu
- `barista_standalone.html` - Barista dashboard

### 2. **Server Version** (NEW - Recommended!)
- ✅ Real-time synchronization via Socket.io
- ✅ **Multi-device support** - customers on phones, barista on tablet!
- ✅ **No flickering** - event-driven updates only
- ✅ Better performance and reliability
- ✅ Order history and analytics

**Files:**
- `menu.html` - Customer menu (server-connected)
- `barista.html` - Barista dashboard (server-connected)
- `server/server.js` - Node.js backend
- `server/package.json` - Dependencies

---

## 🚀 Quick Start (Server Version)

### Prerequisites
- Node.js 14+ installed ([Download here](https://nodejs.org/))
- npm (comes with Node.js)

### Installation

1. **Navigate to the server folder:**
```bash
cd shaysukar/server
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the server:**
```bash
npm start
```

You should see:
```
🍵 Shay Sukar Server running on port 3000
📱 Customer Menu: http://localhost:3000/menu
👨‍🍳 Barista Dashboard: http://localhost:3000/barista
```

4. **Open in browsers:**
- **Customer Menu:** http://localhost:3000/menu (or `/menu.html`)
- **Barista Dashboard:** http://localhost:3000/barista (or `/barista.html`)

### For Development (auto-restart on changes):
```bash
npm run dev
```

---

## 🌐 Deploying to Production

### Option 1: Deploy to Your Own Server

1. **Upload files to your server via FTP/cPanel:**
   - Upload the entire `shaysukar` folder

2. **SSH into your server and install dependencies:**
```bash
cd /path/to/shaysukar/server
npm install --production
```

3. **Start the server (use PM2 for production):**
```bash
npm install -g pm2
pm2 start server.js --name shaysukar
pm2 save
pm2 startup
```

4. **Configure your domain:**
   - Point your domain to the server IP
   - Set up reverse proxy with Nginx/Apache
   - Access at: `https://yourdomain.com/shaysukar/menu`

### Option 2: Deploy to Cloud Platforms

#### **Render.com (Free Tier Available)**
1. Create account at [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Set:
   - **Root Directory:** `shaysukar/server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Deploy! You'll get a URL like `https://shaysukar.onrender.com`

#### **Heroku**
```bash
cd shaysukar/server
heroku create shaysukar-menu
git push heroku main
```

#### **Railway.app**
1. Sign up at [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select repository and folder
4. Deploy automatically!

---

## 📱 How to Use

### Customer Side (Menu)
1. Open `menu.html` on customer's phone/tablet
2. Select table number
3. Enter customer name
4. Browse menu and add items to cart
5. Review order
6. Submit order
7. Get real-time status updates!

### Barista Side (Dashboard)
1. Open `barista.html` on barista's tablet/computer
2. View all incoming orders in real-time
3. Update order status:
   - **Pending** → **Preparing** → **Ready**
4. Mark orders as completed when delivered
5. View statistics (total orders, revenue, etc.)

---

## 🔧 Configuration

### Change Server URL

Edit the `SOCKET_URL` variable at the top of the `<script>` section in both files:

**menu.html:**
```javascript
const SOCKET_URL = 'http://localhost:3000'; // Change to your server URL
```

**barista.html:**
```javascript
const SOCKET_URL = 'http://localhost:3000'; // Change to your server URL
```

### Change Server Port

Edit `server/server.js`:
```javascript
const PORT = process.env.PORT || 3000; // Change 3000 to your desired port
```

Or set environment variable:
```bash
PORT=8080 npm start
```

---

## 🆚 Standalone vs Server Version

| Feature | Standalone | Server Version |
|---------|-----------|----------------|
| **Setup** | Just open HTML files | Requires Node.js server |
| **Multi-device** | ❌ Same device only | ✅ Any device |
| **Real-time updates** | ⚠️ 2-second polling | ✅ Instant (Socket.io) |
| **Flickering** | ⚠️ Yes | ✅ No |
| **Internet required** | ❌ No | ✅ Yes |
| **Order history** | ❌ Lost on refresh | ✅ Persistent |
| **Scalability** | ❌ Limited | ✅ Unlimited devices |

---

## 🛠️ Troubleshooting

### "Cannot connect to server" error
- Make sure server is running (`npm start` in server folder)
- Check `SOCKET_URL` matches your server address
- Check firewall isn't blocking port 3000

### Orders not appearing
- Check browser console for errors (F12)
- Verify Socket.io connection status (look for green indicator)
- Restart the server

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=8080 npm start
```

---

## 📊 Features

- ✅ Real-time order synchronization
- ✅ Multi-device support
- ✅ Sound notifications for new orders
- ✅ Order status tracking
- ✅ Revenue statistics
- ✅ Bilingual interface (Arabic/English)
- ✅ Responsive design
- ✅ Beautiful tea-themed UI

---

## 🔮 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication for baristas
- [ ] Order history and reports
- [ ] Customer loyalty program
- [ ] Payment integration
- [ ] SMS/Email notifications
- [ ] Multi-location support
- [ ] Inventory management

---

## 📝 License

MIT License - Feel free to use and modify!

---

## 🆘 Support

For questions or issues:
- GitHub: [w-electro/w-electro.github.io](https://github.com/w-electro/w-electro.github.io)
- Website: [www.w-electro.com](https://www.w-electro.com)

---

**Made with ❤️ for Shay Sukar Tea Shop**
