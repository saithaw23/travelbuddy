# Dark Mode Fix

## Issue
The dark/light mode toggle was not working despite proper setup of ThemeProvider and ModeToggle component.

## Root Cause
The Tailwind v4 dark mode variant configuration in `app/globals.css` was incorrect:
```css
@custom-variant dark (&:is(.dark *));
```

This syntax only matched elements that were descendants of `.dark`, but not the element with `.dark` class itself.

## Solution
Updated the dark mode variant in `app/globals.css` to:
```css
@variant dark (&:where(.dark, .dark *));
```

This correctly matches both:
- Elements with the `.dark` class
- Descendants of elements with the `.dark` class

## Additional Fix
Removed invalid `experimental.turbo` configuration from `next.config.ts` that was causing build errors in Next.js 16.0.7.

## Testing
1. Run `npm run dev` to start the development server
2. Click the sun/moon icon in the header to toggle between light and dark modes
3. The theme should switch immediately with smooth transitions
4. System theme preference is respected by default

## Files Modified
- `app/globals.css` - Fixed dark mode variant syntax
- `next.config.ts` - Removed invalid turbo configuration

## Build Status
✅ Build successful with 28 routes
✅ No TypeScript errors
✅ All pages include ModeToggle component
