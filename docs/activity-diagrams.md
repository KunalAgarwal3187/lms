# Edemy LMS - Activity Diagrams

## 1. User Authentication Flow

```mermaid
flowchart TD
    A[User Visits Application] --> B[User Clicks Login/Register]
    B --> C{User Action}
    
    C -->|Register| D[User Fills Registration Form]
    C -->|Login| E[User Enters Credentials]
    
    D --> F[User Submits Registration]
    F --> G[Clerk Processes Registration]
    G --> H[Clerk Webhook: user.created]
    H --> I[Server Receives Webhook]
    I --> J[Verify Webhook Signature]
    J --> K{Signature Valid?}
    
    K -->|No| L[Return Error]
    K -->|Yes| M[Create User in Database]
    M --> N[Generate Referral Code]
    N --> O[Set Initial Wallet Balance]
    O --> P[User Account Created]
    
    E --> Q[Clerk Authenticates User]
    Q --> R{Authentication Success?}
    R -->|No| S[Show Error Message]
    R -->|Yes| T[Generate JWT Token]
    T --> U[Store Token in Client]
    U --> V[Redirect to Dashboard]
    
    P --> V
    S --> B
    L --> B
```

## 2. User Purchase Course Flow

```mermaid
flowchart TD
    A[User Browses Courses] --> B[User Selects Course]
    B --> C[User Clicks Purchase]
    C --> D[Check User Authentication]
    D --> E{User Authenticated?}
    
    E -->|No| F[Redirect to Login]
    E -->|Yes| G[Get Course Details]
    G --> H[Calculate Final Price with Discount]
    H --> I[Create Purchase Record]
    I --> J[Initialize Stripe Checkout]
    J --> K[Create Line Items]
    K --> L[Generate Stripe Session]
    L --> M[Return Session URL]
    M --> N[Redirect to Stripe Checkout]
    
    N --> O[User Completes Payment]
    O --> P[Stripe Webhook: payment_intent.succeeded]
    P --> Q[Server Receives Webhook]
    Q --> R[Verify Webhook Signature]
    R --> S{Signature Valid?}
    
    S -->|No| T[Log Error]
    S -->|Yes| U[Get Purchase Record]
    U --> V[Update Purchase Status to 'completed']
    V --> W[Add User to Course Enrolled Students]
    W --> X[Add Course to User's Enrolled Courses]
    X --> Y[Send Success Response]
    Y --> Z[Redirect to My Enrollments]
    
    F --> D
    T --> Z
```

## 3. Educator Upload Course Flow

```mermaid
flowchart TD
    A[Educator Logs In] --> B[Educator Clicks Add Course]
    B --> C[Check Educator Role]
    C --> D{Is Educator?}
    
    D -->|No| E[Update Role to Educator]
    E --> F[Educator Role Granted]
    D -->|Yes| G[Show Course Creation Form]
    F --> G
    
    G --> H[Educator Fills Course Details]
    H --> I[Upload Course Thumbnail]
    I --> J[Validate Form Data]
    J --> K{Data Valid?}
    
    K -->|No| L[Show Validation Errors]
    K -->|Yes| M[Upload Image to Cloudinary]
    L --> H
    
    M --> N{Upload Success?}
    N -->|No| O[Show Upload Error]
    N -->|Yes| P[Create Course in Database]
    O --> H
    
    P --> Q[Set Educator ID]
    Q --> R[Save Course Thumbnail URL]
    R --> S[Course Created Successfully]
    S --> T[Redirect to My Courses]
```

## 4. Educator Delete Course Flow

```mermaid
flowchart TD
    A[Educator Views My Courses] --> B[Educator Selects Course]
    B --> C[Educator Clicks Delete]
    C --> D[Show Confirmation Dialog]
    D --> E{Confirm Delete?}
    
    E -->|No| F[Cancel Operation]
    E -->|Yes| G[Find Course by ID]
    F --> A
    
    G --> H{Course Found?}
    H -->|No| I[Show Course Not Found Error]
    H -->|Yes| J[Check Course Ownership]
    I --> A
    
    J --> K{Is Course Owner?}
    K -->|No| L[Show Unauthorized Error]
    K -->|Yes| M[Delete Course from Database]
    L --> A
    
    M --> N[Remove Course from All Users' Enrolled Courses]
    N --> O[Delete Course Successfully]
    O --> P[Show Success Message]
    P --> Q[Refresh Course List]
    Q --> A
```

## 5. Educator Update Course Flow

```mermaid
flowchart TD
    A[Educator Views My Courses] --> B[Educator Selects Course]
    B --> C[Educator Clicks Edit]
    C --> D[Load Course Data]
    D --> E[Populate Edit Form]
    E --> F[Educator Modifies Course Details]
    
    F --> G[Educator Uploads New Thumbnail]
    G --> H{New Image Uploaded?}
    H -->|No| I[Keep Existing Thumbnail]
    H -->|Yes| J[Upload to Cloudinary]
    
    I --> K[Validate Form Data]
    J --> L{Upload Success?}
    L -->|No| M[Show Upload Error]
    L -->|Yes| N[Get New Image URL]
    M --> G
    
    K --> O{Data Valid?}
    N --> O
    O -->|No| P[Show Validation Errors]
    O -->|Yes| Q[Update Course in Database]
    P --> F
    
    Q --> R[Update Course Fields]
    R --> S[Save New Thumbnail URL if Changed]
    S --> T[Course Updated Successfully]
    T --> U[Show Success Message]
    U --> V[Redirect to My Courses]
```

## 6. Complete Course Purchase with Progress Tracking

```mermaid
flowchart TD
    A[User Purchases Course] --> B[Payment Successful]
    B --> C[User Enrolled in Course]
    C --> D[User Starts Learning]
    D --> E[User Watches Lecture]
    E --> F[Lecture Progress Tracking]
    F --> G[Update Course Progress]
    G --> H[Mark Lecture as Completed]
    H --> I{All Lectures Completed?}
    
    I -->|No| J[Continue to Next Lecture]
    I -->|Yes| K[Mark Course as Completed]
    J --> E
    
    K --> L[Update Course Completion Status]
    L --> M[Generate Certificate]
    M --> N[Course Learning Complete]
    
    E --> O[User Rates Course]
    O --> P[Submit Rating]
    P --> Q[Update Course Average Rating]
    Q --> R[Rating Saved]
```

## 7. Educator Dashboard Analytics Flow

```mermaid
flowchart TD
    A[Educator Accesses Dashboard] --> B[Fetch Educator's Courses]
    B --> C[Get Course IDs]
    C --> D[Calculate Total Courses]
    D --> E[Fetch Purchase Records]
    E --> F[Filter Completed Purchases]
    F --> G[Calculate Total Earnings]
    G --> H[Get Enrolled Students]
    H --> I[Count Total Students]
    I --> J[Calculate Monthly Revenue]
    J --> K[Display Dashboard Analytics]
    K --> L[Show Total Courses, Earnings, Students]
```

## 8. Webhook Processing Flow

```mermaid
flowchart TD
    A[External Service Sends Webhook] --> B[Server Receives Webhook]
    B --> C[Extract Webhook Headers]
    C --> D[Verify Webhook Signature]
    D --> E{Signature Valid?}
    
    E -->|No| F[Return 400 Error]
    E -->|Yes| G[Parse Webhook Body]
    F --> H[Log Security Warning]
    
    G --> I[Identify Webhook Type]
    I --> J{Webhook Type}
    
    J -->|user.created| K[Create User in Database]
    J -->|user.updated| L[Update User in Database]
    J -->|user.deleted| M[Delete User from Database]
    J -->|payment_intent.succeeded| N[Process Payment Success]
    J -->|payment_intent.failed| O[Process Payment Failure]
    
    K --> P[Generate Referral Code]
    P --> Q[Set Initial Wallet]
    Q --> R[Save User Data]
    
    L --> S[Update User Profile]
    M --> T[Remove User Data]
    
    N --> U[Get Purchase Record]
    U --> V[Update Purchase Status]
    V --> W[Enroll User in Course]
    W --> X[Add Course to User]
    
    O --> Y[Update Purchase Status to Failed]
    
    R --> Z[Return Success Response]
    S --> Z
    T --> Z
    X --> Z
    Y --> Z
    H --> Z
```

---

# Edemy LMS - Sequence Diagrams

## 1. User Authentication Sequence Diagram

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant CL as Clerk
    participant S as Server
    participant DB as Database

    Note over U,DB: Registration Flow
    U->>C: Fill Registration Form
    C->>CL: Submit Registration
    CL->>CL: Process Registration
    CL->>S: Webhook: user.created
    S->>S: Verify Webhook Signature
    alt Signature Valid
        S->>DB: Create User Record
        DB->>S: User Created
        S->>S: Generate Referral Code
        S->>S: Set Initial Wallet
        S->>CL: Success Response
    else Signature Invalid
        S->>CL: Error Response
    end

    Note over U,DB: Login Flow
    U->>C: Enter Credentials
    C->>CL: Authenticate User
    CL->>CL: Validate Credentials
    alt Authentication Success
        CL->>C: JWT Token
        C->>C: Store Token
        C->>U: Redirect to Dashboard
    else Authentication Failed
        CL->>C: Error Message
        C->>U: Show Error
    end
```

## 2. User Purchase Course Sequence Diagram

```mermaid
    sequenceDiagram
        participant U as User
        participant C as Client
        participant S as Server
        participant DB as Database
        participant ST as Stripe
        participant CL as Cloudinary

        U->>C: Browse Courses
        C->>S: Get All Courses
        S->>DB: Fetch Published Courses
        DB->>S: Course List
        S->>C: Display Courses
        C->>U: Show Course Catalog

        U->>C: Select Course & Purchase
        C->>S: Purchase Request (courseId)
        S->>S: Verify User Authentication
        S->>DB: Get Course Details
        DB->>S: Course Data
        S->>S: Calculate Final Price
        S->>DB: Create Purchase Record
        DB->>S: Purchase ID
        S->>ST: Create Checkout Session
        ST->>S: Session URL
        S->>C: Redirect to Stripe
        C->>U: Payment Page

        U->>ST: Complete Payment
        ST->>ST: Process Payment
        ST->>S: Webhook: payment_intent.succeeded
        S->>S: Verify Webhook Signature
        alt Payment Success
            S->>DB: Get Purchase Record
            DB->>S: Purchase Data
            S->>DB: Update Purchase Status
            S->>DB: Add User to Course
            S->>DB: Add Course to User
            S->>C: Success Response
            C->>U: Redirect to Enrollments
        else Payment Failed
            S->>DB: Update Purchase Status Failed
            S->>C: Error Response
            C->>U: Show Error
        end
```

## 3. Educator Course Management Sequence Diagram

```mermaid
sequenceDiagram
    participant E as Educator
    participant C as Client
    participant S as Server
    participant DB as Database
    participant CL as Cloudinary
    participant CW as Clerk

    Note over E,DB: Upload Course Flow
    E->>C: Click Add Course
    C->>S: Check Educator Role
    S->>CW: Verify Educator Status
    CW->>S: Role Information
    alt Is Educator
        S->>C: Show Course Form
        C->>E: Display Form
        E->>C: Fill Course Details + Upload Image
        C->>S: Submit Course Data
        S->>CL: Upload Image
        CL->>S: Image URL
        S->>DB: Create Course Record
        DB->>S: Course Created
        S->>C: Success Response
        C->>E: Redirect to My Courses
    else Not Educator
        S->>CW: Update Role to Educator
        CW->>S: Role Updated
        S->>C: Educator Role Granted
        C->>E: Show Course Form
    end

    Note over E,DB: Update Course Flow
    E->>C: Select Course & Edit
    C->>S: Get Course Data
    S->>DB: Fetch Course Details
    DB->>S: Course Data
    S->>C: Populate Form
    C->>E: Show Edit Form
    E->>C: Modify Details + Upload New Image
    C->>S: Submit Updated Data
    alt New Image Uploaded
        S->>CL: Upload New Image
        CL->>S: New Image URL
    end
    S->>DB: Update Course Record
    DB->>S: Course Updated
    S->>C: Success Response
    C->>E: Show Success Message

    Note over E,DB: Delete Course Flow
    E->>C: Select Course & Delete
    C->>E: Show Confirmation Dialog
    E->>C: Confirm Delete
    C->>S: Delete Course Request
    S->>DB: Find Course by ID
    DB->>S: Course Data
    S->>S: Verify Course Ownership
    alt Is Course Owner
        S->>DB: Delete Course
        S->>DB: Remove from User Enrollments
        DB->>S: Deletion Complete
        S->>C: Success Response
        C->>E: Show Success Message
    else Not Course Owner
        S->>C: Unauthorized Error
        C->>E: Show Error
    end

    Note over E,DB: Dashboard Analytics Flow
    E->>C: Access Dashboard
    C->>S: Get Dashboard Data
    S->>DB: Fetch Educator's Courses
    DB->>S: Course List
    S->>DB: Get Purchase Records
    DB->>S: Purchase Data
    S->>S: Calculate Analytics
    S->>C: Dashboard Data
    C->>E: Display Analytics
``` 