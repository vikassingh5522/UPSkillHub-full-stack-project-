# Authentication API Documentation

## Base URL

All API endpoints are directly under `/api` (no locale prefix required).

Example base URLs:

- Development: `http://localhost:3000/api`
- Production: `https://yourdomain.com/api`

## Available Organizations

The following organizations are available for signup and signin:

1. **AI Skills Lab**
2. **AI Tools Hub**
3. **Test My Skills**

---

## Sign Up API

### Endpoint

```
POST /api/auth/signup
```

### Description

Creates a new user account and adds them to the specified organization. The user is automatically assigned the `member` role in the organization.

### Request Headers

```
Content-Type: application/json
```

### Request Body

| Field              | Type   | Required | Description                                     |
| ------------------ | ------ | -------- | ----------------------------------------------- |
| `email`            | string | Yes      | Valid email address                             |
| `password`         | string | Yes      | Minimum 8 characters                            |
| `name`             | string | No       | Minimum 2 characters if provided                |
| `organizationName` | string | Yes      | Exact name of the organization (case-sensitive) |

### cURL Example

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe",
    "organizationName": "AI Skills Lab"
  }'
```

### Success Response (201 Created)

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  },
  "organization": {
    "id": 1,
    "name": "AI Skills Lab"
  }
}
```

**Note:** The `token` field contains a JWT token that must be included in the `Authorization` header for subsequent authenticated requests. The token expires after 7 days.

### Error Responses

#### 400 Bad Request - Organization Not Found

```json
{
  "error": "Organization not found"
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "organizationName": "Invalid Organization"
  }'
```

#### 400 Bad Request - User Already Exists

```json
{
  "error": "User with this email already exists"
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "existing@example.com",
    "password": "password123",
    "organizationName": "AI Skills Lab"
  }'
```

#### 400 Bad Request - Validation Failed

```json
{
  "error": "Validation failed",
  "details": {
    "issues": [
      {
        "code": "too_small",
        "minimum": 8,
        "type": "string",
        "inclusive": true,
        "exact": false,
        "message": "Password must be at least 8 characters",
        "path": ["password"]
      }
    ]
  }
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "short",
    "organizationName": "AI Skills Lab"
  }'
```

#### 500 Internal Server Error

```json
{
  "error": "An error occurred during signup"
}
```

---

## Sign In API

### Endpoint

```
POST /api/auth/login
```

### Description

Authenticates a user and creates a session for the specified organization. The user must already be a member of the organization.

### Request Headers

```
Content-Type: application/json
```

### Request Body

| Field              | Type   | Required | Description                                     |
| ------------------ | ------ | -------- | ----------------------------------------------- |
| `email`            | string | Yes      | User's email address                            |
| `password`         | string | Yes      | User's password                                 |
| `organizationName` | string | Yes      | Exact name of the organization (case-sensitive) |

### cURL Example

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "organizationName": "AI Skills Lab"
  }'
```

### Success Response (200 OK)

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "organizationId": 1,
    "organizations": [
      {
        "id": 1,
        "name": "AI Skills Lab",
        "role": "member"
      },
      {
        "id": 2,
        "name": "AI Tools Hub",
        "role": "member"
      }
    ]
  }
}
```

**Note:**

- The `token` field contains a JWT token that must be included in the `Authorization` header for subsequent authenticated requests.
- The token expires after 7 days.
- The `organizationId` field indicates the currently active organization.
- The `organizations` array contains all organizations the user belongs to.

### Error Responses

#### 400 Bad Request - Organization Not Found

```json
{
  "error": "Organization not found"
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "organizationName": "Invalid Organization"
  }'
```

#### 401 Unauthorized - Invalid Credentials

```json
{
  "error": "Invalid email or password"
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "wrongpassword",
    "organizationName": "AI Skills Lab"
  }'
```

#### 403 Forbidden - No Organization Access

```json
{
  "error": "You do not have access to this organization"
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "organizationName": "AI Tools Hub"
  }'
```

_Note: This error occurs when the user exists and credentials are correct, but the user is not a member of the specified organization._

#### 400 Bad Request - Validation Failed

```json
{
  "error": "Validation failed",
  "details": {
    "issues": [
      {
        "code": "invalid_type",
        "expected": "string",
        "received": "undefined",
        "path": ["organizationName"],
        "message": "Organization name is required"
      }
    ]
  }
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

#### 500 Internal Server Error

```json
{
  "error": "An error occurred during login"
}
```

---

## Authentication with JWT Tokens

### JWT Token

Both signup and signin endpoints return a JWT token in the response body. This token:

- Must be included in the `Authorization` header for authenticated requests
- Expires after 7 days
- Contains user information and organization context
- Uses HS256 algorithm for signing

### Using the Token

After successful signup or signin, extract the `token` from the response and include it in the `Authorization` header for all subsequent authenticated requests.

**Format:** `Authorization: Bearer <token>`

**Example authenticated request:**

```bash
curl -X GET http://localhost:3000/api/counter \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Complete flow example:**

```bash
# 1. Sign in and save token
RESPONSE=$(curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "organizationName": "AI Skills Lab"
  }')

# Extract token (using jq)
TOKEN=$(echo $RESPONSE | jq -r '.token')

# 2. Use token in subsequent requests
curl -X GET http://localhost:3000/api/counter \
  -H "Authorization: Bearer $TOKEN"
```

**Without jq (manual extraction):**

```bash
# Sign in
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "organizationName": "AI Skills Lab"
  }'

# Copy the token from response and use it:
curl -X GET http://localhost:3000/api/counter \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Complete Examples

### Sign Up Flow

```bash
# 1. Sign up a new user
RESPONSE=$(curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "securepass123",
    "name": "Jane Smith",
    "organizationName": "AI Tools Hub"
  }')

# Response:
# {
#   "success": true,
#   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#   "user": {
#     "id": 2,
#     "email": "newuser@example.com",
#     "name": "Jane Smith"
#   },
#   "organization": {
#     "id": 2,
#     "name": "AI Tools Hub"
#   }
# }

# 2. Extract token
TOKEN=$(echo $RESPONSE | jq -r '.token')

# 3. Use token for authenticated requests
curl -X GET http://localhost:3000/api/counter \
  -H "Authorization: Bearer $TOKEN"
```

### Sign In Flow

```bash
# 1. Sign in with existing user
RESPONSE=$(curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "securepass123",
    "organizationName": "AI Tools Hub"
  }')

# Response:
# {
#   "success": true,
#   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#   "user": {
#     "id": 2,
#     "email": "newuser@example.com",
#     "name": "Jane Smith",
#     "organizationId": 2,
#     "organizations": [
#       {
#         "id": 2,
#         "name": "AI Tools Hub",
#         "role": "member"
#       }
#     ]
#   }
# }

# 2. Extract token
TOKEN=$(echo $RESPONSE | jq -r '.token')

# 3. Use token for authenticated requests
curl -X GET http://localhost:3000/api/counter \
  -H "Authorization: Bearer $TOKEN"
```

---

## Notes

1. **Organization Names**: Organization names are case-sensitive and must match exactly:

   - ✅ `"AI Skills Lab"`
   - ❌ `"ai skills lab"` or `"AI Skills Lab "` (trailing space)

2. **Multiple Organizations**: Users can belong to multiple organizations. When signing in, specify which organization you want to access.

3. **Password Requirements**:

   - Minimum 8 characters
   - No maximum length specified

4. **Email Uniqueness**: Each email can only be registered once across all organizations.

5. **Token Scope**: The JWT token is scoped to a specific organization. To switch organizations, use the `/api/organization/switch` endpoint, which returns a new token.
