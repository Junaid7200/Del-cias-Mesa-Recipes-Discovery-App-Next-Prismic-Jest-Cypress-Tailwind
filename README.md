# Delícias à Mesa - Recipe Finder

This is a frontend focused project. The goal was to make a website where people could search recipes of various dishes easily. The technical goals I had in mind were to learn Next.js thoroughly and to learn Tailwind and responsive design. Other goals include learning to use Prismic.io, Jest, Cypress, and the Spoonacular API among other tiny libraries such as clsx etc.

**Live Demo:** [dont have one yet]

## Features

* **Dynamic Recipe Search:** Instantly search thousands of recipes from the Spoonacular API.
* **Content-Driven Homepage:** Homepage content, including hero text and section titles, is fully managed via the Prismic CMS.
* **Responsive Design:** A seamless experience across desktop, tablet, and mobile devices, including a mobile navigation drawer.
* **Server-Side Rendering (SSR):** Fast initial page loads and excellent SEO thanks to Next.js.
* **End-to-End Tested:** Core user journeys are validated with Cypress tests to ensure reliability.
* **Unit Tested** Has also been tested using Jest

## Tech Stack

* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **CMS:** Prismic
* **API:** Spoonacular API
* **Testing:** Cypress (E2E), Jest & React Testing Library (Unit testing)

## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Junaid7200/Del-cias-Mesa-Recipes-Discovery-App-Next-Prismic-Jest-Cypress-Tailwind.git
    cd recipe_app
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a file named `.env.local` in the root of the project and add your Spoonacular API key:

    ```env
    SPOONACULAR_API_KEY="your_api_key_here"
    ```

4. **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running Tests

To run the end-to-end tests, use the following command:

```bash
npm run cypress:open
```

To run the unit tests, use the following command:

```bash
npm test
```
