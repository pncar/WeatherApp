ClearSky is a modern, multilingual weather app built with Next.js and TypeScript, powered by the Visual Crossing Weather API. It offers real-time weather insights, interactive visualizations, and a sleek, responsive UI that adapts to your device, theme preference, and language.

## Features

- Real-time Conditions: Displays current weather including temperature, humidity, wind, and more.
- Sunrise & Sunset Tracking: See how long until or since sunrise/sunset in your location.
- Daily Weather Graphs:
  - Humidity and precipitation trends.
  - Interactive daily summaries with min/max temperatures.
- 14-Day Forecast Visualization:
  - Scrollable temperature range graph.
  - Toggle between daily and hourly data views.
- UI Enhancements:
  - Dark/Light Mode
  - Celsius/Fahrenheit Toggle
  - Multilingual Support: English, Spanish, German, and Japanese.
  - Fully Responsive Design: Optimized for mobile, tablet, and desktop.
  - 
## Runnig & Deploying

### Run Locally

1. Clone the repository:
```
git clone https://github.com/your-username/weather-next.git
cd weather-next
```
2. Install dependencies
```
npm install
```
3. Set up environment variables:
```
WEATHER_API_KEY=your_api_key_here
```
4. Start development server
```
npm run dev
```
5. Open http://localhost:3000 to view the app in your browser. (You can set a different port, or you may be assigned a different port if 3000 is in use.)

### Deploy

You can easily deploy ClearSky using platforms that support Next.js, such as Vercel:
1. Push your code to a GitHub/GitLab/Bitbucket repo.
2. Go to vercel.com, import the project, and follow the setup steps.
3. Set your WEATHER_API_KEY in the environment variables

## Tech Stack

- Framework: Next.js
- Language: TypeScript
- Data Provider: Visual Crossing Weather API
- Charting: Recharts

_______

[Live Demo](https://clearsky2.vercel.app/)
[View on Portfolio](https://pablonicolas-portfolio.vercel.app/projects/01t1SJClJ9g5FRV9T3a9z5)






