---
description: /frontend - Frontend Focus Mode for UI/UX development
trigger: "/frontend"
---

# Frontend Focus Mode

When this mode is activated, the AI Agent will:

## Mindset & Priorities

1. **User Experience First** - Every decision must prioritize the best UX.
2. **Performance** - Lazy loading, code splitting, optimize renders.
3. **Accessibility** - a11y must be considered in every component.

## Workflow

### 1. Requirements Analysis
1. Define component structure.
2. Determine necessary state management.
3. Define data fetching strategy.
4. Review responsive design requirements.

### 2. Coding Standards
1. **Props typing** - Full TypeScript definition.
2. **Destructure props** - In function signature.
3. **Memoize** - Expensive computations.
4. **Error boundary** - For critical components.

### 3. State Management Rules
- Local UI state → `useState`
- Server state → React Query / SWR
- Global state → Only for auth, theme, i18n

## Component Template

```tsx
interface ComponentProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Component = ({ title, children, className }: ComponentProps) => {
  return (
    <div className={cn('base-class', className)}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};
```

## Component Checklist

- [ ] TypeScript props interface
- [ ] Responsive design (mobile-first)
- [ ] Loading state
- [ ] Error state
- [ ] Empty state
- [ ] Accessibility (aria labels, keyboard nav)
- [ ] Unit test

## Self-Correction Questions

1. "Does this component re-render unnecessarily?"
2. "Is skeleton loading needed?"
3. "How does it look on mobile?"
4. "Can user navigate via keyboard?"
