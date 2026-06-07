# RideFlow Frontend MVP

Ride-hailing frontend inspired by Uber and InDrive, built as a React web app with TypeScript, Tailwind CSS, React Router, and Zustand.

It includes two role-based experiences:

- Passenger/client flow
- Driver flow

All data is mocked locally. There is no backend and no real maps API. Buttons and flows are wired through frontend state for demo use.

## Tech Stack

- React 19
- TypeScript
- Tailwind CSS
- React Router
- Zustand
- Vite

## Features

### Passenger

- Login and register screens
- Home screen with map placeholder
- Pickup and destination inputs
- Fare proposal flow like InDrive
- Driver offers list
- Accept driver offer
- Ride status progression
- Driver preview
- Trip history
- Payment method screen
- Profile/settings screen
- Rating screen after ride

### Driver

- Login and register screens
- Driver dashboard
- Online/offline toggle
- Incoming ride request cards
- Accept or reject requests
- Client preview
- Navigation/map placeholder
- Active trip screen
- Complete trip action
- Earnings dashboard
- Daily, weekly, and monthly summaries
- Rewards progress for each $100 earned
- Trip history
- Ratings/reviews screen
- Driver profile/settings screen

## Run Locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Build

```bash
npm run build
```

## Type Check

```bash
npm run typecheck
```

## Folder Structure

```text
src/
  components/
  pages/
  layouts/
  store/
  data/
  types/
  utils/
```

## Demo Notes

- Use either login or register for passenger or driver.
- Passenger flow starts at `/client/home` after auth.
- Driver flow starts at `/driver/dashboard` after auth.
- Ride status and trip actions are simulated through Zustand state.
- Reward progress uses the weekly earnings total and follows:

```ts
const rewardsEarned = Math.floor(totalEarnings / 100);
const currentProgress = totalEarnings % 100;
const progressPercent = currentProgress;
```

## Future Backend Integration

Comments are included in the store where these frontend actions would later call APIs for:

- Authentication
- Ride creation
- Driver trip completion
- Earnings refresh
- Maps/navigation services
