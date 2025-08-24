# AItinerary

Create personalised itineraries for your next solo traveling destination

## Getting Started

### Prerequisites

This application requires an OpenAI API key to generate itineraries. You can get one from [OpenAI's platform](https://platform.openai.com/api-keys).

### Installation

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Environment Setup

Set up your environment:

```bash
export OPENAI_API_KEY=your-api-key
```

Or create a `.env.local` file in the root directory:

```bash
OPENAI_API_KEY=your-api-key-here
```

**Important:** Never commit your `.env.local` file to version control. The `.gitignore` file is already configured to exclude it.

### Running the Application

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
