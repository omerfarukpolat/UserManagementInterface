# User Management System

A modern, responsive, and high-performance user management system built with React, TypeScript, Redux Toolkit, and Styled Components.

## 🌐 Live Demo

**Production URL**: https://reliable-beijinho-fe7949.netlify.app

## ✨ Features

### 🎯 Core Features
- **User List**: High-performance list tested with 5000+ users
- **Search & Filtering**: Real-time search and role-based filtering
- **Pagination**: Pagination system (10/20 users per page)
- **Virtual Scrolling**: Optimized scrolling for large datasets
- **Responsive Design**: Mobile and desktop compatible

### 🎨 View Modes
- **Table View**: User list in table format
- **Card View**: User list in card format
- **Toggle System**: Instant view switching

### 👤 User Management
- **Add User**: Add new users via modal form
- **User Details**: User location with map integration
- **Role System**: Admin, User, Moderator, Editor roles
- **Form Validation**: Comprehensive input validation

### 🗺️ Map Integration
- **Leaflet Maps**: OpenStreetMap-based mapping
- **User Location**: Coordinate information for each user
- **Interactive Markers**: Clickable map markers

### 🔧 Technical Features
- **TypeScript**: Type safety
- **Redux Toolkit**: State management
- **React Router**: Page routing
- **Styled Components**: CSS-in-JS styling
- **LocalStorage**: Data persistence
- **URL State Management**: Filters stored in URL

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd untitled1
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

4. **Open in browser**
```
http://localhost:3000
```

## 📦 Available Scripts

### Development
```bash
npm start          # Start development server
npm test           # Run tests
npm run lint       # ESLint check
npm run lint:fix   # Fix ESLint errors
```

### Build & Deploy
```bash
npm run build      # Create production build
npm run deploy     # Deploy to Netlify production
npm run deploy:preview  # Deploy to Netlify preview
```

### Code Formatting
```bash
npm run format     # Format code with Prettier
npm run format:check  # Check code formatting
```

## 🚀 Deployment Steps

### Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Login to Netlify
```bash
netlify login
```

### Production Deploy
```bash
npm run deploy
```

### Preview Deploy
```bash
npm run deploy:preview
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable components
│   ├── styled/          # Styled components
│   ├── Modal.tsx        # Modal component
│   └── UserCard.tsx     # User card component
├── pages/               # Page components
│   ├── main/           # Main page
│   └── user-detail/    # User detail page
├── hooks/              # Custom React hooks
├── store/              # Redux store
├── services/           # API services
├── types/              # TypeScript type definitions
└── constants/          # Constants
```

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: Styled Components
- **Maps**: Leaflet, React Leaflet
- **Build Tool**: Create React App
- **Deployment**: Netlify
- **Code Quality**: ESLint, Prettier

## 📊 Performance

- **Bundle Size**: ~323KB (gzip)
- **CSS Size**: ~6.76KB (gzip)
- **Virtual Scrolling**: Optimized for 100+ users
- **Lazy Loading**: Chunk-based code splitting

## 🔧 Configuration

### Environment Variables
```env
REACT_APP_API_URL=your_api_url
```

### Build Optimizations
- Code splitting
- Tree shaking
- Gzip compression
- Minification

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Omer Faruk Polat**
- Email: polatfaruk06@gmail.com
- GitHub: [@omerfarukpolat](https://github.com/omerfarukpolat)

---

⭐ Don't forget to star this project if you like it!
