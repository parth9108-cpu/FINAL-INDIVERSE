# IndieVerse Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, or pnpm package manager

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
indieverse/
├── app/                          # Next.js App Router
│   ├── (customer)/              # Customer-facing routes
│   │   ├── page.tsx            # Homepage
│   │   ├── products/           # Product listing
│   │   ├── product/[id]/       # Product details
│   │   └── explore/            # Regional explorer
│   ├── seller/                  # Seller dashboard routes
│   │   ├── page.tsx            # Dashboard
│   │   ├── products/           # Product management
│   │   ├── orders/             # Order management
│   │   ├── analytics/          # Analytics & insights
│   │   └── ai-assistant/       # AI-powered tools
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/                  # Reusable components
│   ├── ui/                     # Base UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── badge.tsx
│   ├── navigation/             # Navigation components
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   └── seller/                 # Seller-specific components
│       └── sidebar.tsx
├── lib/                        # Utility functions
│   └── utils.ts
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies

```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Trust, reliability
- **Secondary**: Purple (#9333EA) - Innovation, AI features
- **Accent**: Orange/Green - Indian flag colors
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, gradient text for emphasis
- **Body**: Regular weight, comfortable line height

### Components
All components follow a consistent design pattern:
- Rounded corners (8px default)
- Subtle shadows for depth
- Hover states with smooth transitions
- Responsive design (mobile-first)

## 🌟 Key Features

### Customer Section
1. **Homepage** (`/`)
   - Hero section with gradient background
   - Featured products
   - Category explorer
   - Artisan stories

2. **Product Listing** (`/products`)
   - Advanced filtering (category, region, price, rating)
   - Sort options
   - Grid/list view
   - PAC verification badges

3. **Product Detail** (`/product/[id]`)
   - Image gallery
   - Blockchain verification
   - Seller information
   - Reviews and ratings
   - Related products

4. **Regional Explorer** (`/explore`)
   - Interactive map of India
   - State-wise product discovery
   - Regional craft information
   - Artisan statistics

### Seller Section
1. **Dashboard** (`/seller`)
   - Revenue and sales metrics
   - Recent orders
   - Top products
   - AI-powered insights

2. **Product Management** (`/seller/products`)
   - Product listing table
   - Bulk actions
   - Stock management
   - PAC verification status

3. **Analytics** (`/seller/analytics`)
   - Revenue trends
   - Customer insights
   - Traffic sources
   - AI predictions

4. **AI Assistant** (`/seller/ai-assistant`)
   - Image-based product recognition
   - Auto-generated descriptions
   - Smart tagging
   - Price optimization

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Blockchain Configuration (Future)
NEXT_PUBLIC_BLOCKCHAIN_NETWORK=testnet

# AI Services (Future)
OPENAI_API_KEY=your_api_key_here

# Payment Gateway (Future)
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

### Tailwind Configuration
The project uses custom Tailwind configuration with:
- Custom color scheme
- Extended animations
- Utility classes for gradients and effects

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔮 Future Enhancements

### Phase 1 (Current)
- ✅ UI/UX Design
- ✅ Customer section
- ✅ Seller dashboard
- ✅ Product management

### Phase 2 (Next)
- 🔄 Backend API integration
- 🔄 Authentication system
- 🔄 Real database integration
- 🔄 Payment gateway

### Phase 3 (Future)
- ⏳ Blockchain integration (PAC)
- ⏳ AI/ML features
- ⏳ Mobile app
- ⏳ Multi-language support

## 🐛 Troubleshooting

### Common Issues

**Issue**: Module not found errors
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Port 3000 already in use
```bash
# Solution: Use different port
npm run dev -- -p 3001
```

**Issue**: Styling not applied
```bash
# Solution: Rebuild Tailwind
npm run dev
# Refresh browser with Ctrl+Shift+R
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)
- [Framer Motion](https://www.framer.com/motion/)

## 🤝 Contributing

This is a proprietary project. For questions or support, contact the development team.

## 📄 License

Proprietary and Confidential - All Rights Reserved
