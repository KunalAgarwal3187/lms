# LMS Project - Sequence Diagram

## Complete System Workflow Sequence Diagram

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Student   │    │   Educator  │    │   Frontend  │    │   Backend   │    │   Database  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘

1. USER REGISTRATION & AUTHENTICATION
─────────────────────────────────────────────────────────────────────────────────────────────

Student/Educator    Frontend        Clerk Auth      Backend         Database
     │                 │                │              │                │
     │───Register─────▶│                │              │                │
     │                 │───Auth Request─▶│              │                │
     │                 │                │───Create User─▶│                │
     │                 │                │              │───Save User────▶│
     │                 │                │              │◀──User Created─│
     │                 │                │◀──Auth Token─│                │
     │                 │◀──Login Success│              │                │
     │◀──Dashboard────│                │              │                │

2. EDUCATOR COURSE CREATION WORKFLOW
─────────────────────────────────────────────────────────────────────────────────────────────

Educator           Frontend        Backend         Database        Cloudinary
    │                 │              │                │                │
    │───Login────────▶│              │                │                │
    │                 │───Auth Check─▶│                │                │
    │                 │              │◀──Auth Success─│                │
    │                 │◀──Dashboard──│                │                │
    │───Create Course▶│              │                │                │
    │                 │───Upload Thumbnail─▶│        │                │
    │                 │              │                │───Upload──────▶│
    │                 │              │                │◀──Image URL───│
    │                 │              │───Save Course──▶│                │
    │                 │              │◀──Course Created│                │
    │                 │◀──Success────│                │                │

3. STUDENT COURSE DISCOVERY & ENROLLMENT
─────────────────────────────────────────────────────────────────────────────────────────────

Student            Frontend        Backend         Database        Stripe
    │                 │              │                │                │
    │───Browse Courses▶│              │                │                │
    │                 │───Get Courses▶│                │                │
    │                 │              │◀──Course List──│                │
    │                 │◀──Display────│                │                │
    │───Select Course▶│              │                │                │
    │                 │───Get Details▶│               │                │
    │                 │              │◀──Course Info──│                │
    │                 │◀──Show Details│               │                │
    │───Enroll───────▶│              │                │                │
    │                 │───Create Payment─▶│           │                │
    │                 │              │                │───Create Session─▶│
    │                 │              │                │◀──Session URL──│
    │                 │◀──Redirect───│                │                │
    │───Payment──────▶│              │                │                │
    │                 │              │                │◀──Payment Success│
    │                 │◀──Enrollment Success│         │                │

4. VIDEO LEARNING & PROGRESS TRACKING
─────────────────────────────────────────────────────────────────────────────────────────────

Student            Frontend        YouTube API     Backend         Database
    │                 │                │              │                │
    │───Start Lecture▶│                │              │                │
    │                 │───Load Video──▶│              │                │
    │                 │◀──Video Stream│              │                │
    │                 │◀──Display Video│             │                │
    │───Watch Video──▶│                │              │                │
    │                 │                │              │                │
    │───Complete─────▶│                │              │                │
    │                 │───Mark Complete▶│            │                │
    │                 │              │───Update Progress─▶│           │
    │                 │              │◀──Progress Updated│            │
    │                 │◀──Success────│                │                │

5. RATING & REVIEW SYSTEM
─────────────────────────────────────────────────────────────────────────────────────────────

Student            Frontend        Backend         Database
    │                 │              │                │
    │───Rate Course──▶│              │                │
    │                 │───Submit Rating▶│            │                │
    │                 │              │───Save Rating──▶│
    │                 │              │◀──Rating Saved│                │
    │                 │◀──Success────│                │

6. EDUCATOR ANALYTICS & MONITORING
─────────────────────────────────────────────────────────────────────────────────────────────

Educator           Frontend        Backend         Database
    │                 │              │                │
    │───View Analytics▶│             │                │
    │                 │───Get Data───▶│                │
    │                 │              │───Query Stats──▶│
    │                 │              │◀──Analytics Data│
    │                 │◀──Display────│                │

7. PAYMENT WEBHOOK PROCESSING
─────────────────────────────────────────────────────────────────────────────────────────────

Stripe             Backend         Database        Frontend
    │                 │                │                │
    │───Webhook──────▶│                │                │
    │                 │───Verify Signature│            │                │
    │                 │◀──Valid───────│                │
    │                 │───Process Payment▶│            │                │
    │                 │              │───Update Enrollment─▶│
    │                 │              │◀──Enrollment Updated│
    │                 │◀──Success────│                │
    │                 │───Notify User▶│                │
    │                 │              │◀──Notification Sent│

8. ERROR HANDLING & RECOVERY
─────────────────────────────────────────────────────────────────────────────────────────────

User               Frontend        Backend         Database
    │                 │              │                │
    │───Action───────▶│              │                │
    │                 │───API Call───▶│                │
    │                 │              │───Database Query▶│
    │                 │              │◀──Error────────│
    │                 │◀──Error Response│             │
    │                 │◀──User Message│               │

9. REAL-TIME PROGRESS UPDATES
─────────────────────────────────────────────────────────────────────────────────────────────

Student            Frontend        Backend         Database        Other Users
    │                 │              │                │                │
    │───Complete Action▶│            │                │                │
    │                 │───Update Progress▶│           │                │
    │                 │              │───Save Progress▶│
    │                 │              │◀──Progress Saved│
    │                 │◀──UI Update──│                │
    │                 │───Broadcast──▶│                │
    │                 │              │                │───Notify Others▶│

10. COURSE PUBLISHING WORKFLOW
─────────────────────────────────────────────────────────────────────────────────────────────

Educator           Frontend        Backend         Database        Students
    │                 │              │                │                │
    │───Publish Course▶│             │                │                │
    │                 │───Update Status▶│             │                │
    │                 │              │───Set Published▶│
    │                 │              │◀──Status Updated│
    │                 │◀──Success────│                │
    │                 │───Notify Students▶│           │                │
    │                 │              │                │───Send Notification▶│
```

## Key Workflow Components

### Authentication Flow
1. User registers/logs in through Clerk
2. JWT token is generated and validated
3. Role-based access is enforced
4. User is redirected to appropriate dashboard

### Course Creation Flow
1. Educator creates course with rich text editor
2. Thumbnail is uploaded to Cloudinary
3. Course content is organized into chapters/lectures
4. Course is published and made available to students

### Enrollment Flow
1. Student browses available courses
2. Student selects course and initiates payment
3. Stripe creates checkout session
4. Payment is processed and webhook confirms enrollment
5. Student gains access to course content

### Learning Flow
1. Student accesses enrolled course
2. Video content is loaded from YouTube
3. Progress is tracked in real-time
4. Completion is marked automatically
5. Analytics are updated for educator

### Payment Processing Flow
1. Student initiates course purchase
2. Stripe checkout session is created
3. Payment is processed securely
4. Webhook confirms successful payment
5. Student enrollment is activated
6. Educator receives payment confirmation

This sequence diagram shows the complete end-to-end workflow of your LMS system, covering all major user interactions and system processes. 