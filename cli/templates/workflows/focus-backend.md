# Backend Focus Mode

When this mode is activated, the AI Agent will:

## Mindset & Priorities

1. **Backend First** - Every decision revolves around API and database.
2. **Security First** - Always consider security in every decision.
3. **Performance** - Optimize queries, caching, and response time.

## Workflow

### 1. New Requirement Analysis
1. Analyze requirements from an API perspective.
2. Identify entities and relationships.
3. Design endpoint structure.
4. Review authentication/authorization requirements.

### 2. Coding Standards
1. **Controller** - Handle HTTP requests only, NO business logic.
2. **Service** - Contains ALL business logic.
3. **Repository** - Data access and query optimization.
4. **DTO** - Input validation and output transformation.

### 3. Response Format (Mandatory)
```json
{
  "success": true,
  "data": {},
  "meta": { "page": 1, "limit": 10, "total": 100 },
  "error": null,
  "timestamp": "2024-01-20T10:00:00Z"
}
```

## Endpoint Checklist

- [ ] Input validation with DTO
- [ ] Authorization check
- [ ] Business logic in Service
- [ ] Proper error handling
- [ ] Correct HTTP status code
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Unit test for Service

## Self-Correction Questions

1. "Is this endpoint idempotent?"
2. "Is caching needed? How to invalidate?"
3. "Is there an N+1 query problem?"
4. "Is error handling specific enough?"
