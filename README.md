# Save&Serve - Food Rescue Platform 🍽️

A comprehensive food rescue platform that connects food donors (restaurants, wedding venues, buffets) with volunteer organizations (shelters, food banks, community centers) to reduce food waste and address hunger, supporting UN SDG 2: Zero Hunger.

## 🚀 Features

### For Food Donors
- ⚡ Quick donation listing (<2 minutes)
- 📱 Photo upload with multiple images
- 🏷️ Food categorization and quantity estimation
- ⏰ Flexible pickup time windows
- 📍 Location-based matching
- 📊 Personal impact dashboard
- 💬 Direct messaging with organizations

### For Organizations
- 🔔 Real-time notifications for nearby donations
- 🔍 Advanced filtering by food type, distance, quantity
- ✅ One-click donation claiming
- 🚚 Driver assignment and coordination
- 📈 Impact tracking and reporting
- 🏅 Verification badge system

### Platform Features
- 🤖 Smart matching algorithm
- 🌍 Geolocation-based services
- 💬 Real-time messaging
- 📱 Progressive Web App (PWA)
- 📊 Comprehensive analytics
- 🔒 Secure authentication
- 🌐 Multi-language support ready

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **State Management:** React Context API
- **Real-time:** WebSockets
- **Maps:** Google Maps API integration
- **PWA:** Next.js PWA plugin

### Backend
- **Platform:** Appwrite (Cloud/Self-hosted)
- **Authentication:** Email/password + OAuth
- **Database:** Appwrite Database with collections
- **Storage:** File storage for images and documents
- **Functions:** Serverless functions for matching & notifications
- **Realtime:** Appwrite Realtime for live updates

## 📋 Prerequisites

Before getting started, make sure you have:

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **Appwrite** account (cloud.appwrite.io or self-hosted)
- **Google Maps API** key (optional, for enhanced location features)

## 🔧 Installation & Setup

### 1. Install Node.js

If you haven't installed Node.js yet:

1. Go to [nodejs.org](https://nodejs.org/)
2. Download and install the LTS version (18.0+)
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### 2. Install Dependencies

Navigate to the project directory and install dependencies:

```bash
npm install
# or
yarn install
```

### 3. Setup Appwrite Backend

#### Option A: Using Appwrite Cloud
1. Go to [cloud.appwrite.io](https://cloud.appwrite.io)
2. Create a new account or sign in
3. Create a new project
4. Note down your:
   - Project ID
   - Endpoint (usually `https://cloud.appwrite.io/v1`)

#### Option B: Self-hosted Appwrite
1. Install Docker on your system
2. Run Appwrite locally:
   ```bash
   docker run -it --rm \
     --volume /var/run/docker.sock:/var/run/docker.sock \
     --volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
     --entrypoint="install" \
     appwrite/appwrite:1.4.13
   ```
3. Follow the installation prompts
4. Access Appwrite console at `http://localhost`

### 4. Configure Environment Variables

1. Copy the environment template:
   ```bash
   cp .env.local .env.local
   ```

2. Update the `.env.local` file with your values:
   ```env
   # Appwrite Configuration
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id-here
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=save-serve-db
   NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID=images
   
   # Collection IDs (will be generated after database setup)
   NEXT_PUBLIC_USERS_COLLECTION_ID=users
   NEXT_PUBLIC_ORGANIZATIONS_COLLECTION_ID=organizations
   NEXT_PUBLIC_DONATIONS_COLLECTION_ID=donations
   NEXT_PUBLIC_PICKUPS_COLLECTION_ID=pickups
   NEXT_PUBLIC_MESSAGES_COLLECTION_ID=messages
   NEXT_PUBLIC_NOTIFICATIONS_COLLECTION_ID=notifications
   
   # Optional: Google Maps API
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   ```

### 5. Setup Appwrite Database

1. Open your Appwrite console
2. Go to **Databases** and create a new database named `save-serve-db`
3. Create the following collections with their respective attributes:

#### Collections to Create:

**Users Collection (`users`):**
- `email` (String, 255, Required, Unique)
- `name` (String, 255, Required)
- `phone` (String, 20, Optional)
- `role` (String, 50, Required, Default: "donor")
- `verified` (Boolean, Required, Default: false)
- `createdAt` (DateTime, Required)
- `location` (String, 1000, Optional)
- `profileImage` (String, 255, Optional)

**Organizations Collection (`organizations`):**
- `userId` (String, 255, Required)
- `organizationName` (String, 255, Required)
- `registrationNumber` (String, 100, Optional)
- `organizationType` (String, 50, Required)
- `capacity` (Integer, Required, Min: 1)
- `serviceArea` (Integer, Required, Min: 1, Default: 10)
- `vehicleInfo` (String, 500, Optional)
- `verificationStatus` (String, 50, Required, Default: "pending")
- `verificationDocs` (String, 2000, Optional)
- `preferences` (String, 2000, Required)
- `impactStats` (String, 1000, Required)
- `createdAt` (DateTime, Required)

**Donations Collection (`donations`):**
- `donorId` (String, 255, Required)
- `title` (String, 255, Required)
- `description` (String, 2000, Required)
- `foodType` (String, 500, Required)
- `quantity` (String, 500, Required)
- `images` (String, 2000, Optional)
- `location` (String, 1000, Required)
- `pickupWindow` (String, 500, Required)
- `status` (String, 50, Required, Default: "available")
- `specialInstructions` (String, 1000, Optional)
- `createdAt` (DateTime, Required)
- `claimedBy` (String, 255, Optional)
- `claimedAt` (DateTime, Optional)
- `completedAt` (DateTime, Optional)

**Pickups Collection (`pickups`):**
- `donationId` (String, 255, Required)
- `organizationId` (String, 255, Required)
- `donorId` (String, 255, Required)
- `status` (String, 50, Required, Default: "scheduled")
- `driverName` (String, 255, Optional)
- `driverPhone` (String, 20, Optional)
- `scheduledTime` (DateTime, Required)
- `actualPickupTime` (DateTime, Optional)
- `rating` (Integer, Optional, Min: 1, Max: 5)
- `feedback` (String, 1000, Optional)
- `impactCalculations` (String, 500, Required)
- `createdAt` (DateTime, Required)

**Messages Collection (`messages`):**
- `donationId` (String, 255, Required)
- `senderId` (String, 255, Required)
- `receiverId` (String, 255, Required)
- `message` (String, 2000, Required)
- `timestamp` (DateTime, Required)
- `read` (Boolean, Required, Default: false)

**Notifications Collection (`notifications`):**
- `userId` (String, 255, Required)
- `type` (String, 50, Required)
- `title` (String, 255, Required)
- `message` (String, 1000, Required)
- `data` (String, 2000, Optional)
- `read` (Boolean, Required, Default: false)
- `createdAt` (DateTime, Required)

### 6. Setup Storage Buckets

1. Go to **Storage** in Appwrite console
2. Create two buckets:
   - **images** (for food photos, profile pictures)
     - Max file size: 10MB
     - Allowed file types: jpg, jpeg, png, webp, gif
   - **documents** (for verification documents)
     - Max file size: 5MB
     - Allowed file types: pdf, doc, docx

### 7. Configure Permissions

For each collection, set up appropriate permissions:
- **Read:** Any authenticated user
- **Create:** Any authenticated user
- **Update:** Document owner and admins
- **Delete:** Document owner and admins

### 8. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔐 Authentication Setup

The platform supports multiple authentication methods:

1. **Email/Password** (Default)
2. **Google OAuth** (Optional)
3. **Facebook OAuth** (Optional)

To enable OAuth providers:
1. Go to **Auth** in Appwrite console
2. Enable desired providers
3. Configure OAuth credentials

## 📱 PWA Configuration

The app is configured as a Progressive Web App (PWA):

- **Offline support** for viewing past data
- **Push notifications** for new donations
- **Install prompts** on mobile devices
- **App-like experience** when installed

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

### Deploy to Netlify

1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables

### Self-hosted Deployment

1. Build the application:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

## 📊 Monitoring & Analytics

### Built-in Analytics
- **Impact metrics** (meals rescued, CO₂ saved)
- **User engagement** statistics
- **Platform health** monitoring

### External Integration
- Google Analytics (optional)
- Sentry for error tracking (optional)
- Appwrite Analytics dashboard

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- **Documentation:** Check this README and code comments
- **Issues:** Create an issue on GitHub
- **Community:** Join our Discord server (link coming soon)

### Common Issues

**Dependencies not installing:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Appwrite connection issues:**
- Verify your project ID and endpoint
- Check network connectivity
- Ensure API keys are correct

**Build errors:**
- Check TypeScript errors
- Verify environment variables
- Clear Next.js cache: `rm -rf .next`

## 🌟 Acknowledgments

- **UN SDG 2:** Zero Hunger initiative
- **Appwrite:** Backend-as-a-Service platform
- **Next.js:** React framework
- **Tailwind CSS:** Utility-first CSS framework
- **Lucide Icons:** Beautiful icon library

## 🗺️ Roadmap

### Phase 1 ✅
- Basic authentication system
- Donation listing and claiming
- Real-time notifications
- Impact tracking

### Phase 2 🔄
- Advanced matching algorithm
- Mobile native apps
- Gamification features
- Multi-language support

### Phase 3 📅
- AI-powered recommendations
- Blockchain certificates
- Integration with POS systems
- Advanced analytics dashboard

---

**Made with ❤️ for a hunger-free world**

