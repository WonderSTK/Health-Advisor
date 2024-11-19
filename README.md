# Health Advisor 🏥

## Overview

Health Advisor is an AI-powered health management application that provides personalized health insights, tracks symptoms, medications, and appointments, and offers tailored recommendations for a healthier lifestyle.

## Features

- 🧠 AI-powered health analysis
- 📊 Symptom timeline tracking
- 💊 Medication management
- 🎯 Health goal setting and tracking
- 📅 Appointment scheduling
- 📝 Health journal for mood and daily observations
- 📄 Medical report upload and analysis
- 💡 Personalized health tips

## Technologies Used

- React
- Redux Toolkit
- Tailwind CSS
- shadcn/ui components
- Google Gemini API

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/health-advisor.git
   cd health-advisor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Google Gemini API key:
   ```
   REACT_APP_GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Enter your health data:
   - Add symptoms to the timeline
   - Log your medications
   - Set health goals
   - Schedule appointments
   - Write journal entries

2. Alternatively, upload a medical report for analysis.

3. Click the "Analyze Health Data" button to receive AI-powered insights and recommendations.

4. View your personalized health tips and adjust your lifestyle accordingly.

## Project Structure

```
health-advisor/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   ├── tabs.jsx
│   │   │   └── textarea.jsx
│   │   ├── AppointmentScheduler.js
│   │   ├── FileUpload.js
│   │   ├── HealthGoalTracker.js
│   │   ├── HealthJournal.js
│   │   ├── HealthTipsGenerator.js
│   │   ├── MedicationTracker.js
│   │   ├── Results.js
│   │   └── SymptomTimeline.js
│   ├── lib/
│   │   └── utils.js
│   ├── services/
│   │   └── geminiService.js
│   ├── store/
│   │   └── healthSlice.js
│   ├── App.js
│   └── index.js
├── public/
├── .env
├── package.json
├── README.md
└── tailwind.config.js
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Google Gemini API](https://ai.google.dev/)

## Contact

Mehul Kumar - [GitHub](https://github.com/WonderSTK)

Project Link: [https://github.com/WonderSTK/health-advisor](https://github.com/WonderSTK/health-advisor)