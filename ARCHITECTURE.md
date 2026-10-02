# 🏛 System Architecture & Engineering Specifications

This document outlines the system architecture, authentication lifecycles, state management, error handling, and degradation strategies for the **StackTask** client application.

---

## 1. System Context & Overview

StackTask is built on a decoupled client-server architecture:
- **Client (Frontend)**: Next.js App Router (React 19) rendering interactive workspace views, managing client-side cache and modal states.
- **Backend (API)**: Express.js REST API providing business logic, session validation, and database operations.
- **Persistence**: MongoDB for data storage.

```mermaid
graph TD
    subgraph Browser ["Client Environment (Next.js)"]
        Pages["App Router Views (/[workspaceSlug])"]
        Store["Redux Store (apiSlice + UI Slices)"]
        Guard["AuthPersistenceWrapper"]
    end

    subgraph BackendGateway ["Backend API (Express)"]
        AuthMiddleware["Session & Auth Middleware"]
        Controllers["Resource Controllers (Tasks, Workspaces, Members)"]
    end

    subgraph DataStorage ["Database Layer"]
        MongoDB[(MongoDB)]
    end

    Pages -->|Dispatches Hooks| Store
    Store -->|REST API with HTTP-only Cookies| AuthMiddleware
    AuthMiddleware --> Controllers
    Controllers --> MongoDB
```

---

## 2. Authentication & Session Lifecycle

The application uses **HTTP-only cookie authentication** for enhanced security against XSS vulnerabilities.

```mermaid
sequenceDiagram
    autonumber
    actor User as User / Browser
    participant Client as Next.js Client (RTK Query)
    participant API as Express API
    participant DB as MongoDB

    User->>Client: Enters credentials & submits sign-in
    Client->>API: POST /api/auth/login (credentials: "include")
    API->>DB: Query user & verify password hash
    DB-->>API: User record verified
    API-->>Client: Set-Cookie (HTTP-only jwt_token) + User JSON
    Client->>Client: Dispatch setCredentials() to Redux Auth Slice
    Client-->>User: Navigate to /[workspaceSlug] workspace dashboard
```

### Route Protection Strategy
- **Client-Side Guarding**: `AuthPersistenceWrapper` checks authentication status and redirects unauthenticated users to `/auth/sign-in`.
- **API Guarding**: Every backend endpoint verifies the session cookie attached via `credentials: "include"`.

---

## 3. State Management & Cache Architecture

The application adopts a strict separation between **Server State** and **Client UI State**.

```mermaid
flowchart TD
    subgraph ReduxStore ["Redux Store"]
        subgraph ServerCache ["Server Cache (RTK Query: apiSlice)"]
            WS["Workspaces Cache"]
            TK["Tasks Cache"]
            MB["Members Cache"]
            LB["Labels Cache"]
        end

        subgraph ClientUI ["Client UI State (Feature Slices)"]
            ModalSlice["Global Modals Slice"]
            ThemeSlice["Theme / Display Mode"]
            FilterSlice["Task Filters & Views"]
        end
    end

    UIComponents["React Components"] <--> ReduxStore
```

### Cache Invalidation Tags
RTK Query utilizes `tagTypes` to keep data synchronized:
- `Workspace`: Invalidates when workspaces are created, updated, or deleted.
- `Tasks`: Invalidates when task status, priorities, or details are modified.
- `Members`: Invalidates when invitations are accepted or members removed.
- `Labels`: Invalidates when task labels are created or updated.

---

## 4. Error Handling & Graceful Degradation

```mermaid
flowchart TD
    Req[API Request Initiated] --> Result{Response Status}
    
    Result -->|200 OK| Success[Update RTK Query Cache & Render UI]
    
    Result -->|401 Unauthorized| Unauth[Clear Redux Auth & Redirect to /auth/sign-in]
    
    Result -->|FETCH_ERROR / Offline| Offline[Display Sonner Offline Toast & Retain Cached View]
    
    Result -->|500 Server Error| ServerErr[Trigger Error Boundary / Toast Notification]
```

### Resilience Protocols:
1. **Network Disruption**: Handled via `FETCH_ERROR` interceptor in `apiSlice` providing clear connectivity feedback.
2. **Session Expiration**: Centralized 401 interception invalidates client auth state and triggers login redirection without broken render states.
3. **Partial UI Degradation**: Secondary queries (e.g. notifications, user activity) fail without breaking primary task board views.
4. **Optimistic Updates**: Task actions (e.g. toggles, priority adjustments) can update local state immediately and rollback on mutation errors.
