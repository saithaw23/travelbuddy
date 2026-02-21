# MongoDB Schema Design - TravelBuddy

**Database:** MongoDB Atlas  
**ODM:** Mongoose (recommended for NestJS)  
**Last Updated:** February 11, 2026

---

## 📊 Database Overview

### Collections
1. **users** - User accounts and profiles
2. **conversations** - Chat conversations with AI
3. **trips** - Trip plans and itineraries
4. **bookings** - Confirmed bookings
5. **collaborations** - Trip collaboration data (votes, comments)
6. **notifications** - User notifications
7. **reviews** - User reviews and ratings
8. **sessions** - User sessions (optional, can use Redis)

---

## 🗂️ Collection Schemas

### 1. Users Collection

```javascript
{
  _id: ObjectId,
  email: String,              // unique, required
  emailVerified: Boolean,
  password: String,           // hashed, optional (for OAuth users)
  name: String,
  avatar: String,             // URL
  
  // OAuth
  providers: [{
    provider: String,         // 'google', 'facebook'
    providerId: String,
    accessToken: String,
    refreshToken: String
  }],
  
  // Profile
  profile: {
    phone: String,
    dateOfBirth: Date,
    nationality: String,
    passportNumber: String,
    passportExpiry: Date,
    
    // Travel Preferences
    preferences: {
      adventureLevel: Number,     // 1-5
      travelStyle: [String],      // ['luxury', 'budget-friendly', 'local-experiences']
      interests: [String],        // ['food', 'museums', 'photography', 'art']
      budgetRange: {
        min: Number,
        max: Number
      },
      favoriteDestinations: [String],
      dietaryRestrictions: [String]
    }
  },
  
  // Stats
  stats: {
    totalTrips: Number,
    totalCountries: Number,
    totalSpent: Number,
    averageTripCost: Number,
    favoriteRegion: String,
    tripsPerYear: Number,
    memberSince: Date
  },
  
  // Settings
  settings: {
    notifications: {
      email: Boolean,
      push: Boolean,
      sms: Boolean
    },
    privacy: {
      profilePublic: Boolean,
      showTravelHistory: Boolean
    },
    language: String,
    currency: String,
    timezone: String
  },
  
  // Metadata
  role: String,               // 'user', 'admin'
  status: String,             // 'active', 'suspended', 'deleted'
  loyaltyStatus: String,      // 'bronze', 'silver', 'gold', 'platinum'
  loyaltyPoints: Number,
  
  createdAt: Date,
  updatedAt: Date,
  lastLoginAt: Date
}
```

**Indexes:**
```javascript
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ "providers.providerId": 1 })
db.users.createIndex({ createdAt: -1 })
```

---

### 2. Conversations Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId,           // ref: users
  
  // Conversation Data
  messages: [{
    role: String,             // 'user' or 'assistant'
    content: String,
    timestamp: Date,
    metadata: {
      model: String,          // 'gpt-4', 'claude-3'
      tokens: Number,
      cost: Number
    }
  }],
  
  // Extracted Data
  extractedData: {
    destination: String,
    dates: {
      start: Date,
      end: Date,
      flexible: Boolean
    },
    travelers: {
      adults: Number,
      children: Number,
      infants: Number
    },
    budget: {
      amount: Number,
      currency: String,
      flexibility: String     // 'strict', 'flexible', 'very-flexible'
    },
    interests: [String],
    preferences: {
      pace: String,           // 'relaxed', 'moderate', 'packed'
      accommodation: String,  // 'budget', 'mid-range', 'luxury'
      transportation: String  // 'public', 'rental-car', 'private'
    }
  },
  
  // Status
  status: String,             // 'active', 'completed', 'abandoned'
  completionRate: Number,     // 0-100
  
  // Generated Trip
  generatedTripId: ObjectId,  // ref: trips
  
  // Metadata
  createdAt: Date,
  updatedAt: Date,
  completedAt: Date
}
```

**Indexes:**
```javascript
db.conversations.createIndex({ userId: 1, createdAt: -1 })
db.conversations.createIndex({ status: 1 })
db.conversations.createIndex({ generatedTripId: 1 })
```

---

### 3. Trips Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId,           // ref: users (owner)
  conversationId: ObjectId,   // ref: conversations (optional)
  
  // Trip Details
  title: String,
  destination: String,
  description: String,
  coverImage: String,         // URL
  
  dates: {
    start: Date,
    end: Date,
    duration: Number          // days
  },
  
  travelers: {
    adults: Number,
    children: Number,
    infants: Number,
    total: Number
  },
  
  // Budget
  budget: {
    total: Number,
    currency: String,
    breakdown: {
      flights: Number,
      accommodation: Number,
      activities: Number,
      food: Number,
      transportation: Number,
      other: Number
    },
    spent: Number,
    remaining: Number
  },
  
  // Itinerary Items
  itinerary: [{
    _id: ObjectId,
    type: String,             // 'flight', 'hotel', 'restaurant', 'activity'
    day: Number,
    
    // Common Fields
    name: String,
    description: String,
    image: String,
    location: {
      address: String,
      city: String,
      country: String,
      coordinates: {
        lat: Number,
        lng: Number
      }
    },
    
    // Timing
    startTime: Date,
    endTime: Date,
    duration: Number,         // minutes
    
    // Pricing
    price: {
      amount: Number,
      currency: String,
      breakdown: {
        base: Number,
        taxes: Number,
        fees: Number
      }
    },
    
    // Booking
    bookingStatus: String,    // 'pending', 'confirmed', 'cancelled'
    bookingReference: String,
    bookingUrl: String,
    
    // External Data
    externalId: String,       // Amadeus/Foursquare ID
    externalProvider: String, // 'amadeus', 'foursquare'
    
    // Collaboration
    votes: {
      yes: Number,
      no: Number,
      maybe: Number
    },
    comments: [{
      userId: ObjectId,
      text: String,
      timestamp: Date
    }],
    
    // Type-Specific Data
    flightDetails: {
      airline: String,
      flightNumber: String,
      departure: {
        airport: String,
        terminal: String,
        gate: String,
        time: Date
      },
      arrival: {
        airport: String,
        terminal: String,
        gate: String,
        time: Date
      },
      class: String,
      baggage: String
    },
    
    hotelDetails: {
      stars: Number,
      checkIn: Date,
      checkOut: Date,
      roomType: String,
      amenities: [String],
      cancellationPolicy: String
    },
    
    restaurantDetails: {
      cuisine: String,
      priceRange: String,
      rating: Number,
      reservationRequired: Boolean,
      dietaryOptions: [String]
    },
    
    activityDetails: {
      category: String,
      difficulty: String,
      duration: Number,
      groupSize: Number,
      included: [String],
      requirements: [String]
    }
  }],
  
  // Collaboration
  collaborators: [{
    userId: ObjectId,
    role: String,             // 'owner', 'editor', 'viewer'
    invitedAt: Date,
    joinedAt: Date,
    status: String            // 'pending', 'accepted', 'declined'
  }],
  
  // Status
  status: String,             // 'draft', 'planning', 'confirmed', 'completed', 'cancelled'
  visibility: String,         // 'private', 'shared', 'public'
  
  // AI Data
  aiGenerated: Boolean,
  aiConfidence: Number,       // 0-100
  aiModel: String,
  
  // Metadata
  tags: [String],
  notes: String,
  version: Number,
  
  createdAt: Date,
  updatedAt: Date,
  completedAt: Date
}
```

**Indexes:**
```javascript
db.trips.createIndex({ userId: 1, createdAt: -1 })
db.trips.createIndex({ "collaborators.userId": 1 })
db.trips.createIndex({ status: 1 })
db.trips.createIndex({ "dates.start": 1 })
db.trips.createIndex({ destination: 1 })
```

---

### 4. Bookings Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId,           // ref: users
  tripId: ObjectId,           // ref: trips
  
  // Booking Details
  bookingReference: String,   // unique
  status: String,             // 'pending', 'confirmed', 'cancelled', 'completed'
  
  // Items
  items: [{
    itineraryItemId: ObjectId,
    type: String,
    name: String,
    quantity: Number,
    price: {
      amount: Number,
      currency: String
    },
    externalBookingId: String,
    externalProvider: String
  }],
  
  // Pricing
  pricing: {
    subtotal: Number,
    taxes: Number,
    fees: Number,
    discount: Number,
    total: Number,
    currency: String
  },
  
  // Payment
  payment: {
    method: String,           // 'card', 'paypal', 'bank_transfer'
    status: String,           // 'pending', 'completed', 'failed', 'refunded'
    transactionId: String,
    stripePaymentIntentId: String,
    paidAt: Date,
    refundedAt: Date,
    refundAmount: Number
  },
  
  // Traveler Details
  travelers: [{
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    dateOfBirth: Date,
    passportNumber: String,
    passportExpiry: Date,
    nationality: String
  }],
  
  // Contact
  contactEmail: String,
  contactPhone: String,
  
  // Confirmation
  confirmationSent: Boolean,
  confirmationSentAt: Date,
  
  // Metadata
  notes: String,
  specialRequests: String,
  
  createdAt: Date,
  updatedAt: Date,
  confirmedAt: Date,
  cancelledAt: Date
}
```

**Indexes:**
```javascript
db.bookings.createIndex({ userId: 1, createdAt: -1 })
db.bookings.createIndex({ tripId: 1 })
db.bookings.createIndex({ bookingReference: 1 }, { unique: true })
db.bookings.createIndex({ status: 1 })
db.bookings.createIndex({ "payment.stripePaymentIntentId": 1 })
```

---

### 5. Collaborations Collection

```javascript
{
  _id: ObjectId,
  tripId: ObjectId,           // ref: trips
  
  // Votes
  votes: [{
    userId: ObjectId,
    itineraryItemId: ObjectId,
    vote: String,             // 'yes', 'no', 'maybe'
    timestamp: Date
  }],
  
  // Comments
  comments: [{
    _id: ObjectId,
    userId: ObjectId,
    itineraryItemId: ObjectId,
    text: String,
    parentCommentId: ObjectId, // for replies
    likes: [ObjectId],        // user IDs who liked
    timestamp: Date,
    edited: Boolean,
    editedAt: Date
  }],
  
  // Activity Log
  activities: [{
    userId: ObjectId,
    action: String,           // 'joined', 'voted', 'commented', 'edited', 'left'
    details: Object,
    timestamp: Date
  }],
  
  // Consensus
  consensus: {
    totalVotes: Number,
    itemsApproved: Number,
    itemsRejected: Number,
    itemsPending: Number,
    consensusReached: Boolean
  },
  
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
```javascript
db.collaborations.createIndex({ tripId: 1 })
db.collaborations.createIndex({ "votes.userId": 1 })
db.collaborations.createIndex({ "comments.userId": 1 })
```

---

### 6. Notifications Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId,           // ref: users
  
  // Notification Details
  type: String,               // 'booking_confirmed', 'invite', 'vote', 'comment', 'price_alert'
  title: String,
  message: String,
  
  // Related Data
  relatedId: ObjectId,        // trip/booking/comment ID
  relatedType: String,        // 'trip', 'booking', 'comment'
  
  // Action
  actionUrl: String,
  actionText: String,
  
  // Status
  read: Boolean,
  readAt: Date,
  
  // Delivery
  channels: {
    email: {
      sent: Boolean,
      sentAt: Date
    },
    push: {
      sent: Boolean,
      sentAt: Date
    },
    inApp: {
      displayed: Boolean,
      displayedAt: Date
    }
  },
  
  createdAt: Date,
  expiresAt: Date
}
```

**Indexes:**
```javascript
db.notifications.createIndex({ userId: 1, createdAt: -1 })
db.notifications.createIndex({ read: 1 })
db.notifications.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
```

---

### 7. Reviews Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId,           // ref: users
  tripId: ObjectId,           // ref: trips
  
  // Review Target
  targetType: String,         // 'flight', 'hotel', 'restaurant', 'activity'
  targetId: String,           // external ID
  targetName: String,
  
  // Rating
  rating: Number,             // 1-5
  
  // Review Content
  title: String,
  text: String,
  pros: [String],
  cons: [String],
  
  // Media
  photos: [String],           // URLs
  videos: [String],           // URLs
  
  // Verification
  verified: Boolean,          // verified traveler
  
  // Engagement
  helpful: [ObjectId],        // user IDs who found helpful
  helpfulCount: Number,
  
  // Moderation
  status: String,             // 'pending', 'approved', 'rejected'
  moderatedBy: ObjectId,
  moderatedAt: Date,
  
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
```javascript
db.reviews.createIndex({ userId: 1, createdAt: -1 })
db.reviews.createIndex({ tripId: 1 })
db.reviews.createIndex({ targetId: 1, targetType: 1 })
db.reviews.createIndex({ rating: 1 })
db.reviews.createIndex({ status: 1 })
```

---

### 8. Sessions Collection (Optional - can use Redis)

```javascript
{
  _id: String,                // session ID
  userId: ObjectId,           // ref: users
  
  // Session Data
  data: Object,               // session data
  
  // Device Info
  device: {
    userAgent: String,
    ip: String,
    browser: String,
    os: String
  },
  
  // Timestamps
  createdAt: Date,
  expiresAt: Date
}
```

**Indexes:**
```javascript
db.sessions.createIndex({ userId: 1 })
db.sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
```

---

## 🔧 Mongoose Setup

### MongoDB Atlas Free Tier (M0) Specifications

**What You Get:**
- ✅ 512 MB storage
- ✅ Shared RAM
- ✅ Shared vCPU
- ✅ No credit card required
- ✅ Suitable for development and small projects
- ✅ Up to 100 database connections
- ✅ Basic monitoring and alerts

**Limitations:**
- ⚠️ 512 MB storage limit (monitor usage carefully)
- ⚠️ Shared resources (performance may vary)
- ⚠️ No backups (manual exports recommended)
- ⚠️ Limited to 3 free clusters per project
- ⚠️ Pauses after 60 days of inactivity

**Estimated Capacity:**
- ~5,000-10,000 users (with basic profiles)
- ~50,000-100,000 trips (depending on itinerary size)
- ~500,000 messages (chat conversations)
- Perfect for MVP and initial launch

**When to Upgrade:**
- Storage exceeds 400 MB (80% capacity)
- Need automated backups
- Performance becomes an issue
- Need dedicated resources
- Upgrade to M10 ($25/month) for production

### Installation

```bash
npm install mongoose @nestjs/mongoose
npm install --save-dev @types/mongoose
```

### Configuration

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true, // Build indexes in development
    }),
  ],
})
export class AppModule {}
```

### Environment Variables

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travelbuddy?retryWrites=true&w=majority
MONGODB_DB_NAME=travelbuddy

# Redis (for caching)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

---

## 📝 Example Mongoose Schema

```typescript
// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop()
  password?: string;

  @Prop()
  name: string;

  @Prop()
  avatar?: string;

  @Prop({ type: Object })
  profile: {
    phone?: string;
    dateOfBirth?: Date;
    nationality?: string;
    preferences: {
      adventureLevel: number;
      travelStyle: string[];
      interests: string[];
      budgetRange: {
        min: number;
        max: number;
      };
    };
  };

  @Prop({ type: Object })
  stats: {
    totalTrips: number;
    totalCountries: number;
    totalSpent: number;
    memberSince: Date;
  };

  @Prop({ default: 'user' })
  role: string;

  @Prop({ default: 'active' })
  status: string;

  @Prop()
  lastLoginAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Indexes
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ createdAt: -1 });
```

---

## 🚀 Migration from Mock Data

### Step 1: Seed Initial Data

```typescript
// seed.ts
import { MongoClient } from 'mongodb';
import { mockUsers, mockTrips } from './lib/mockData';

async function seed() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('travelbuddy');

  // Seed users
  await db.collection('users').insertMany(mockUsers);
  
  // Seed trips
  await db.collection('trips').insertMany(mockTrips);

  console.log('Database seeded successfully');
  await client.close();
}

seed();
```

### Step 2: Update API Routes

```typescript
// app/api/trips/route.ts
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(req: Request) {
  const { db } = await connectToDatabase();
  
  const trips = await db
    .collection('trips')
    .find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .toArray();

  return Response.json(trips);
}
```

---

## 📊 Database Optimization

### Free Tier Optimization Strategies

**1. Storage Optimization**
```javascript
// Keep documents lean - avoid storing large data
// ❌ Bad: Store full images in database
{
  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..." // Large base64
}

// ✅ Good: Store image URLs only
{
  image: "https://cdn.example.com/images/trip-123.jpg"
}

// ❌ Bad: Store entire conversation history in trip
{
  conversationHistory: [...1000 messages]
}

// ✅ Good: Reference conversation by ID
{
  conversationId: ObjectId("...")
}
```

**2. Aggressive Caching**
```javascript
// Cache frequently accessed data in Redis
// - User profiles (1 hour TTL)
// - Trip lists (5 minutes TTL)
// - API responses (24 hours TTL)

// Example: Cache user profile
const cacheKey = `user:${userId}`;
let user = await redis.get(cacheKey);

if (!user) {
  user = await db.collection('users').findOne({ _id: userId });
  await redis.setex(cacheKey, 3600, JSON.stringify(user));
}
```

**3. Data Cleanup**
```javascript
// Regularly clean up old data
// - Delete abandoned conversations (>30 days old)
// - Archive completed trips (>1 year old)
// - Remove expired notifications

// Example: Cleanup script
db.conversations.deleteMany({
  status: 'abandoned',
  updatedAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
});

db.notifications.deleteMany({
  read: true,
  createdAt: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
});
```

**4. Limit Embedded Arrays**
```javascript
// ❌ Bad: Unlimited array growth
{
  messages: [...10000 messages] // Can exceed 16MB document limit
}

// ✅ Good: Limit array size or paginate
{
  messages: [...100 messages], // Keep last 100 only
  messageCount: 10000,
  olderMessagesArchived: true
}
```

**5. Use Projections**
```javascript
// ❌ Bad: Fetch entire document
const trips = await db.collection('trips').find({ userId }).toArray();

// ✅ Good: Fetch only needed fields
const trips = await db.collection('trips')
  .find({ userId })
  .project({ title: 1, destination: 1, dates: 1, status: 1 })
  .toArray();
```

**6. Monitor Storage Usage**
```javascript
// Check database size regularly
db.stats(); // Returns database statistics

// Monitor collection sizes
db.trips.stats();
db.conversations.stats();

// Set up alerts when approaching 400MB (80% of 512MB)
```

### Indexing Strategy
- Index frequently queried fields (userId, status, dates)
- Compound indexes for common query patterns
- TTL indexes for sessions and notifications

### Caching Strategy
- Use Redis for:
  - Session data
  - API responses (Amadeus, Foursquare)
  - User preferences
  - Frequently accessed trips

### Aggregation Pipelines
```javascript
// Get user stats
db.trips.aggregate([
  { $match: { userId: ObjectId("...") } },
  { $group: {
    _id: "$userId",
    totalTrips: { $sum: 1 },
    totalSpent: { $sum: "$budget.spent" },
    avgTripCost: { $avg: "$budget.total" }
  }}
])
```

---

## 🔒 Security Best Practices

1. **Connection Security**
   - Use MongoDB Atlas with IP whitelist
   - Enable authentication
   - Use TLS/SSL connections

2. **Data Validation**
   - Use Mongoose schema validation
   - Validate input on API layer
   - Sanitize user input

3. **Access Control**
   - Implement role-based access control (RBAC)
   - Use MongoDB user roles
   - Audit sensitive operations

4. **Backup Strategy**
   - Enable automated backups (MongoDB Atlas)
   - Test restore procedures
   - Keep backups for 30 days

---

## 📈 Monitoring

### Free Tier Monitoring Checklist

**Daily Checks:**
- [ ] Storage usage (should stay under 400MB)
- [ ] Connection count (should stay under 80)
- [ ] Slow queries (optimize if >1s)

**Weekly Checks:**
- [ ] Collection sizes (identify growth patterns)
- [ ] Index usage (remove unused indexes)
- [ ] Error rates in logs

**Monthly Checks:**
- [ ] Data cleanup (remove old/unused data)
- [ ] Performance review
- [ ] Capacity planning

### Storage Usage Monitoring

```javascript
// Add to your backend monitoring
async function checkStorageUsage() {
  const stats = await db.stats();
  const usedMB = stats.dataSize / (1024 * 1024);
  const limitMB = 512;
  const percentUsed = (usedMB / limitMB) * 100;
  
  console.log(`Storage: ${usedMB.toFixed(2)}MB / ${limitMB}MB (${percentUsed.toFixed(1)}%)`);
  
  if (percentUsed > 80) {
    console.warn('⚠️ Storage usage above 80%! Consider cleanup or upgrade.');
  }
  
  return { usedMB, limitMB, percentUsed };
}

// Run daily
setInterval(checkStorageUsage, 24 * 60 * 60 * 1000);
```

### When to Upgrade to Paid Tier

**Upgrade Triggers:**
- 🔴 Storage consistently above 400MB (80%)
- 🔴 Performance issues (slow queries, timeouts)
- 🔴 Need automated backups
- 🔴 More than 1,000 active users
- 🔴 Business-critical application

**Upgrade Path:**
1. **M10 ($25/month)** - 10GB storage, 2GB RAM, dedicated cluster
2. **M20 ($75/month)** - 20GB storage, 4GB RAM, better performance
3. **M30 ($150/month)** - 40GB storage, 8GB RAM, production-ready

### Key Metrics to Track
- Query performance (slow queries)
- Connection pool usage
- Database size growth
- Index usage statistics
- Error rates

### Tools
- MongoDB Atlas monitoring
- Mongoose query logging
- Custom metrics (Prometheus/Grafana)

---

## 🎯 Next Steps

1. Set up MongoDB Atlas cluster
2. Install Mongoose and dependencies
3. Create schema files for each collection
4. Implement database connection module
5. Create seed script with mock data
6. Update API routes to use MongoDB
7. Test CRUD operations
8. Set up indexes
9. Configure Redis for caching
10. Deploy and monitor

---

**Questions?** See:
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [NestJS MongoDB Guide](https://docs.nestjs.com/techniques/mongodb)
