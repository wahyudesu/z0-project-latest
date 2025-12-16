# TypeScript Documentation for WhatsApp Bot Cloudflare Worker

## Table of Contents
1. [Overview](#overview)
2. [Type Definitions](#type-definitions)
3. [Interfaces](#interfaces)
4. [Usage Examples](#usage-examples)

## Overview

This documentation provides detailed information about the TypeScript types and interfaces used in the WhatsApp Bot Cloudflare Worker project. These types ensure type safety and better development experience when working with the codebase.

## Type Definitions

### Env
Represents the environment variables available in the Cloudflare Worker.

```typescript
interface Env {
  API_KEY: string;
  BASE_URL: string;
  SESSION: string;
  OPENROUTER_KEY: string;
  'db-tugas': D1Database;
  [key: string]: any;
}
```

### WorkerEnv
Represents the processed environment variables used throughout the application.

```typescript
interface WorkerEnv {
  APIkey: string;
  baseUrl: string;
  session: string;
  openrouterKey: string;
}
```

## Interfaces

### WhatsAppEvent
Represents a WhatsApp event received by the webhook.

```typescript
interface WhatsAppEvent {
  event: string;
  payload: WhatsAppPayload;
}
```

### WhatsAppPayload
Contains the payload data from a WhatsApp event.

```typescript
interface WhatsAppPayload {
  from: string;
  body: string;
  participant?: string;
  id: string;
  [key: string]: any;
}
```

### GroupPayload
Represents the payload for group-related events.

```typescript
interface GroupPayload {
  type: string;
  group: {
    id: string;
  };
  participants: Participant[];
}
```

### Participant
Represents a participant in a WhatsApp group.

```typescript
interface Participant {
  id: string;
}
```

### Command
Represents a bot command with its description.

```typescript
interface Command {
  command: string;
  description: string;
}
```

### Feature
Represents a feature with its details for documentation purposes.

```typescript
interface Feature {
  icon: string;
  title: string;
  description: string;
}
```

### Pantun
Represents a pantun structure from the JSON data.

```typescript
interface Pantun {
  [index: number]: string[];
}
```

### DoaHarian
Represents a daily prayer/dua structure.

```typescript
interface DoaHarian {
  title: string;
  arabic: string;
  latin: string;
  translation: string;
}
```

### MathQuestion
Represents a math question with multiple choice options.

```typescript
interface MathQuestion {
  question: string;
  answer: number;
  options: number[];
}
```

### ToxicResult
Represents the result of a toxic message detection.

```typescript
interface ToxicResult {
  isToxic: boolean;
  found: string[];
}
```

### BitcoinPriceResponse
Represents the response from the CoinGecko API for Bitcoin prices.

```typescript
interface BitcoinPriceResponse {
  bitcoin?: {
    usd?: number;
    idr?: number;
  };
}
```

### SendTextRequest
Represents the request body for sending a text message via WhatsApp API.

```typescript
interface SendTextRequest {
  chatId: string;
  text: string;
  session: string;
  reply_to?: string;
  header?: string;
  body?: string;
  footer?: string;
  buttons?: Button[];
  mentions?: string[];
}
```

### Button
Represents a button in a WhatsApp message.

```typescript
interface Button {
  type: 'reply' | 'call' | 'copy' | 'url';
  text: string;
  phoneNumber?: string;
  copyCode?: string;
  url?: string;
}
```

### SendTextResponse
Represents the response from sending a text message.

```typescript
interface SendTextResponse {
  status: string;
  sent?: SendTextRequest;
  apiResult?: string;
  result?: any;
  error?: string;
  priceUsd?: number;
  priceIdr?: number;
  questions?: MathQuestion[];
}
```

### WelcomeMessageResponse
Represents the response from sending a welcome message to new group members.

```typescript
interface WelcomeMessageResponse {
  status: string;
}
```

### HelpResponse
Represents the response from the help command.

```typescript
interface HelpResponse {
  status: string;
  result: any;
}
```

## Usage Examples

### Using Env and WorkerEnv

```typescript
// Getting environment variables
const { APIkey, baseUrl, session, openrouterKey } = await getWorkerEnv(env);

// Using in a function
async function sendMessage(env: Env, message: SendTextRequest) {
  const { APIkey, baseUrl, session } = await getWorkerEnv(env);
  // ... implementation
}
```

### Handling WhatsApp Events

```typescript
// Processing incoming WhatsApp events
if (data.event === "group.v2.participants") {
  const groupPayload: GroupPayload = data.payload;
  // ... implementation
}
```

### Working with Commands

```typescript
// Defining commands
const commands: Command[] = [
  { command: '/tagall', description: 'Mention semua anggota grup' },
  { command: '/ai <pertanyaan>', description: 'Tanya AI tentang tugas/kuliah' },
  // ... more commands
];
```

This documentation provides a comprehensive overview of the TypeScript types used in the project, ensuring type safety and clarity for developers working with the codebase.