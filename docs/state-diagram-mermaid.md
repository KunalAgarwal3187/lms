# Edemy LMS - State Diagram (Mermaid Syntax)

## Complete System State Diagram

```mermaid
stateDiagram-v2
    [*] --> Unauthenticated
    
    %% User Authentication States
    Unauthenticated --> Registering : User Registration
    Unauthenticated --> LoggingIn : User Login
    Registering --> Authenticated : Registration Success
    Registering --> Unauthenticated : Registration Failed
    LoggingIn --> Authenticated : Login Success
    LoggingIn --> Unauthenticated : Login Failed
    Authenticated --> StudentDashboard : Role = Student
    Authenticated --> EducatorDashboard : Role = Educator
    Authenticated --> Unauthenticated : Logout
    
    %% Student Dashboard States
    StudentDashboard --> BrowsingCourses : Browse Courses
    StudentDashboard --> MyEnrollments : View Enrollments
    StudentDashboard --> Profile : Manage Profile
    StudentDashboard --> Authenticated : Logout
    
    %% Course Browsing States
    BrowsingCourses --> CourseDetails : Select Course
    BrowsingCourses --> StudentDashboard : Back to Dashboard
    CourseDetails --> PaymentProcessing : Enroll in Course
    CourseDetails --> BrowsingCourses : Back to Browse
    CourseDetails --> PreviewLecture : Watch Preview
    
    %% Payment Processing States
    PaymentProcessing --> StripeCheckout : Create Checkout Session
    StripeCheckout --> PaymentPending : Payment Initiated
    StripeCheckout --> PaymentFailed : Payment Failed
    PaymentPending --> PaymentSuccess : Payment Confirmed
    PaymentPending --> PaymentFailed : Payment Failed
    PaymentSuccess --> Enrolled : Enrollment Complete
    PaymentFailed --> CourseDetails : Retry Payment
    
    %% Learning States
    Enrolled --> CoursePlayer : Start Learning
    CoursePlayer --> WatchingLecture : Play Video
    WatchingLecture --> LecturePaused : Pause Video
    WatchingLecture --> LectureCompleted : Complete Lecture
    LecturePaused --> WatchingLecture : Resume Video
    LectureCompleted --> CoursePlayer : Next Lecture
    CoursePlayer --> CourseCompleted : All Lectures Done
    CourseCompleted --> Certificate : Generate Certificate
    
    %% Educator Dashboard States
    EducatorDashboard --> CreateCourse : Create New Course
    EducatorDashboard --> ManageCourses : Manage Existing
    EducatorDashboard --> Analytics : View Analytics
    EducatorDashboard --> Authenticated : Logout
    
    %% Course Creation States
    CreateCourse --> CourseDraft : Save Draft
    CreateCourse --> CourseEditing : Edit Course
    CourseDraft --> CourseEditing : Edit Draft
    CourseEditing --> CourseDraft : Save Changes
    CourseEditing --> CourseReady : Complete Course
    CourseReady --> CoursePublished : Publish Course
    CourseReady --> CourseDraft : Save as Draft
    CoursePublished --> CourseUnpublished : Unpublish
    CourseUnpublished --> CoursePublished : Republish
    
    %% Course Management States
    ManageCourses --> CourseEditing : Edit Course
    ManageCourses --> CourseAnalytics : View Analytics
    CourseAnalytics --> ManageCourses : Back to List
    
    %% Profile Management States
    Profile --> ProfileEditing : Edit Profile
    ProfileEditing --> Profile : Save Changes
    ProfileEditing --> Profile : Cancel Changes
    Profile --> Authenticated : Logout
    
    %% Enrollment Management States
    MyEnrollments --> CoursePlayer : Continue Learning
    MyEnrollments --> StudentDashboard : Back to Dashboard
    
    %% Certificate States
    Certificate --> StudentDashboard : Back to Dashboard
    Certificate --> ShareCertificate : Share Certificate
    
    %% Analytics States
    Analytics --> RevenueAnalytics : View Revenue
    Analytics --> StudentAnalytics : View Students
    Analytics --> CourseAnalytics : View Course Performance
    RevenueAnalytics --> Analytics : Back to Analytics
    StudentAnalytics --> Analytics : Back to Analytics
    CourseAnalytics --> Analytics : Back to Analytics
    
    %% Error Handling States
    PaymentFailed --> ErrorHandling : Handle Error
    ErrorHandling --> PaymentProcessing : Retry Payment
    ErrorHandling --> CourseDetails : Cancel Payment
```

## State Descriptions

### Authentication States
- **Unauthenticated**: User not logged in
- **Registering**: User creating account
- **LoggingIn**: User attempting login
- **Authenticated**: User successfully logged in

### Student States
- **StudentDashboard**: Main student interface
- **BrowsingCourses**: Viewing available courses
- **CourseDetails**: Viewing specific course
- **PreviewLecture**: Watching free preview
- **MyEnrollments**: Viewing enrolled courses

### Payment States
- **PaymentProcessing**: Initiating enrollment
- **StripeCheckout**: Payment gateway interface
- **PaymentPending**: Payment being processed
- **PaymentSuccess**: Payment completed
- **PaymentFailed**: Payment failed
- **Enrolled**: Successfully enrolled

### Learning States
- **CoursePlayer**: Main learning interface
- **WatchingLecture**: Actively watching video
- **LecturePaused**: Video paused
- **LectureCompleted**: Lecture finished
- **CourseCompleted**: All content completed
- **Certificate**: Course completion certificate

### Educator States
- **EducatorDashboard**: Main educator interface
- **CreateCourse**: Creating new course
- **CourseDraft**: Course saved as draft
- **CourseEditing**: Modifying course
- **CourseReady**: Course content complete
- **CoursePublished**: Course live and available
- **CourseUnpublished**: Course temporarily unavailable

### Analytics States
- **Analytics**: Main analytics dashboard
- **RevenueAnalytics**: Financial performance
- **StudentAnalytics**: Student engagement
- **CourseAnalytics**: Course performance

### Profile States
- **Profile**: User profile view
- **ProfileEditing**: Modifying profile

### Error States
- **ErrorHandling**: Handling system errors 