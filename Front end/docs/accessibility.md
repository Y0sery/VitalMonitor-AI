# Accessibility Guidelines - Refresh Your Heart

## Overview
This project adheres to **WCAG 2.1 AA** standards. All components are designed to be accessible to users with disabilities, including those using screen readers, keyboard navigation, and other assistive technologies.

## Core Principles
1.  **Perceivable**: Information and user interface components must be presentable to users in ways they can perceive.
2.  **Operable**: User interface components and navigation must be operable.
3.  **Understandable**: Information and the operation of user interface must be understandable.
4.  **Robust**: Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies.

## Implementation Details

### Keyboard Navigation
-   **Focus Management**: All interactive elements (buttons, links, inputs) must be focusable via the `Tab` key.
-   **Focus Visible**: A clear visual indicator (outline/ring) must be present when an element receives focus.
-   **Skip Links**: A "Skip to Main Content" link should be the first focusable element on the page.
-   **Modals**:
    -   Focus should be trapped within the modal when open.
    -   `Esc` key should close the modal.
    -   Focus should return to the triggering element upon closing.

### Screen Reader Support (ARIA)
-   **Labels**: All form inputs must have associated `<label>` elements or `aria-label`/`aria-labelledby` attributes.
-   **Roles**: Use semantic HTML5 elements (`<nav>`, `<main>`, `<article>`, `<button>`) whenever possible. Use ARIA roles (`role="dialog"`, `role="alert"`) only when necessary.
-   **Live Regions**: Use `aria-live="polite"` for non-urgent updates (e.g., loading states) and `aria-live="assertive"` for urgent notifications (e.g., error toasts).
-   **Images**: All informative images must have descriptive `alt` text. Decorative images should have `alt=""`.

### Color & Contrast
-   **Text Contrast**: Body text must have a contrast ratio of at least **4.5:1** against the background. Large text (18pt+ or 14pt+ bold) must have at least **3:1**.
-   **Color Independence**: Information should not be conveyed by color alone (e.g., error states should have an icon or text label in addition to red color).

### Responsive Design
-   The layout is responsive and functions correctly at 200% zoom without loss of content or functionality.
-   Touch targets on mobile devices are at least 44x44 CSS pixels.

## Checklist for Developers
-   [ ] Run automated accessibility tests (e.g., axe-core) on new components.
-   [ ] Manually test keyboard navigation (Tab, Enter, Space, Esc).
-   [ ] Verify color contrast using a contrast checker tool.
-   [ ] Ensure screen reader announcements make sense.
