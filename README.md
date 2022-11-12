# Emersoft hometask

This Next.js application shows an example of React blog application.

Since the basic implementation of this task as has been said should take 2-3 hours on average there are some stuff left for improvements, namely (points below are applicable for real-world production blog):

- Make app fully compliant with WAI-ARIA (even though some of parts of the app can be detected and interacted by screen readers, but it'd be great to have a full WAI-ARIA coverage when it comes to real-world blog)
- Add tests coverage
- Provide better type safety
- Get rid of redundant re-renders (e.g. leverage `useReducer` hook to set a few pieces of state in one action)
- Create documentation for components and functions (e.g. Storybook)
- Provide caching (SWR internal functionality)
- Add better error handing and some error tracking software (e.g. Sentry)
- Organize tailwind classes in alises for reusability
- Add authentication for endpoints so they cannot be triggered for malicious purposes
- SEO integration, so the posts can be indexed by search engines
- Paginate JSON file asyncronously for faster searching, filtering (using some semblance of multithreaded)
- And so many other stuff

<a href="emersoft-hometask.vercel.app" target="_blank">DEMO</a>

## 🚀 Quick start

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the packages installation:

```bash
yarn
```

Run dev server:

```bash
yarn dev
```

Build app and run:

```bash
yarn build

yarn start
```

## 📄 Task

### Technology Requirements

1. latest NextJS
2. tailwindcss

### Task Description

1. Simple Blog page with SSR.
2. Create simple API endpoints to fetch, search and filter blog posts
3. Simple pagination - button `next` and `prev` page
4. Search blog posts by title
5. Simple Filter by Category
6. Simple page to display blog post - title, image, excerpt, list of categories.
7. Use provided JSON file with example posts.
