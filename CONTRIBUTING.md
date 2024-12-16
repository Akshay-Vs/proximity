## Contributing

We’re excited to have you contribute to Proximity! Follow these simple steps to get started:

### How to Contribute

#### 1. Fork the Repository

- Click the **Fork** button at the top of the repository’s GitHub page.
- Clone your forked repository locally:

  ```bash
  git clone https://github.com/yourusername/proximity.git
  cd proximity
  ```

#### 2. Create a Branch

- Create a branch with a descriptive name:

  ```bash
  git checkout -b feature/your-feature-name
  ```

#### 3. Make Your Changes

- Implement your feature or fix a bug.
- Ensure your code is clean and adheres to the project’s style guide.

#### 4. Test Your Changes

- Run the project locally and thoroughly test your changes.

#### 5. Commit and Push

- Stage and commit your changes:

  ```bash
  git add .
  git commit -m "Add: Description of your changes"
  ```

- Push the changes to your branch:

  ```bash
  git push origin feature/your-feature-name
  ```

#### 6. Open a Pull Request

- Go to the original repository on GitHub and click **New Pull Request**.
- Provide a detailed description of your changes and link any relevant issues.

---

## Monorepo Architecture

Proximity uses a monorepo structure to organize its codebase efficiently. The repository is divided into the following directories:

### Apps Directory

- **web**: The Proximity web application, built with Next.js as a PWA.
- **native**: The Proximity native application, developed using React Native.
- **desktop**: The Proximity desktop application, created with Electron.

### Packages Directory

- **ui**: Houses reusable UI components and utilities for Proximity, built with React, Tailwind CSS, and ShadCN components.
- **_"name"_-config**: Contains configuration files specific to individual packages.
- **env**: Centralized management of environment variables for the entire monorepo.
- **database**: Provides Prisma-based database access for all parts of Proximity.

### Services Directory

- **services**: Contains microservices responsible for key functionalities such as:
  - **auth**: Handles authentication and user management.
  - **tldr**: Generates concise summaries for news articles.
  - **scraping**: Fetches news articles from various sources.
  - **recommendation**: Provides personalized news recommendations.
  - **search**: Enables powerful search capabilities across indexed news content.
