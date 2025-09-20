# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## BlogWebsite

A modern, responsive blog platform built with React and Vite. This project demonstrates authentication, CRUD operations for posts, and a clean UI using Tailwind CSS. It uses Appwrite for backend services (authentication, database, storage) and Redux Toolkit for state management.

# Features

Features
User authentication (signup, login, logout)
Create, edit, delete, and view blog posts
Responsive design with Tailwind CSS
Rich text editor for posts
Protected routes for authenticated users
Post listing and individual post pages
State management with Redux Toolkit
Appwrite integration for backend services

# Tech Stack
React
Vite
Tailwind CSS
Redux Toolkit
Appwrite
React Router

# Folder Structure
components – Reusable UI components (Logo, AuthLayout, PostCard, etc.)
pages – Page components (Home, Login, Signup, AddPost, EditPost, AllPosts, Post)
appwrite – Appwrite service wrappers (auth, database)
store – Redux store and slices
assets – Images and static assets

# Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.