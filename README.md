# MixFix - Audio Analysis for Music Producers

A modern web application that helps music producers analyze and improve their audio files using AI-powered analysis. This is the frontend scaffold with modular, flexible architecture ready for backend and ML model integration.

## 🎯 Features

- **Audio File Upload**: Drag-and-drop or click to upload audio files
- **AI-Powered Analysis**: Quality scoring and issue detection (mock data for now)
- **Issue Labeling**: Categorized problems (clipping, noise, dynamic range, etc.)
- **Visual Dashboard**: Waveform display with issue markers
- **Real-time Metrics**: Display audio metrics (dynamic range, peak level, RMS, frequency range)
- **Improvement Recommendations**: Actionable suggestions for producers

## 📁 Project Structure

```
src/
├── components/
│   ├── FileUpload.tsx        # Audio file upload component
│   ├── AnalysisResults.tsx   # Results display with issues
│   └── Dashboard.tsx         # Metrics and waveform visualization
├── styles/
│   ├── index.css             # Global styles
│   ├── App.css               # Main app styles
│   ├── FileUpload.css        # Upload component styles
│   ├── AnalysisResults.css   # Results component styles
│   └── Dashboard.css         # Dashboard component styles
├── App.tsx                   # Main app component
└── main.tsx                  # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## 🔗 Integration Points

The application is designed to be flexible for easy integration:

### Backend Integration
- Modify the `handleFileUpload` function in `App.tsx` to send files to your backend API
- Replace mock analysis data with real API responses

### ML Model Integration
- Create a new service file: `src/services/analysisService.ts`
- Implement API calls to your ML model endpoint
- Update `App.tsx` to use the new service

### Example Integration Pattern
```typescript
// src/services/analysisService.ts
export const analyzeAudio = async (file: File): Promise<AnalysisData> => {
  const formData = new FormData();
  formData.append('audio', file);
  
  const response = await fetch('/api/analyze', {
    method: 'POST',
    body: formData
  });
  
  return response.json();
}
```

## 🎨 Customization

### Styling
- Global theme colors are defined in CSS files
- Use CSS variables for consistency
- Responsive design with mobile-first approach

### Adding New Features
1. Create new component in `src/components/`
2. Add corresponding styles in `src/styles/`
3. Import and use in `App.tsx`

## 📊 Supported Audio Formats

- MP3
- WAV
- FLAC
- OGG
- M4A

## 🛠️ Technologies Used

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **CSS3**: Styling with gradients and animations

## 📝 Notes

- Currently uses mock data for analysis results
- File upload is simulated with 2-second delay
- Ready for backend and ML model integration
- All components are modular and reusable

## 🔄 Future Enhancements

- [ ] Backend API integration
- [ ] ML model integration for real audio analysis
- [ ] User authentication
- [ ] Project history and saved analyses
- [ ] Export analysis reports
- [ ] Real-time audio playback with waveform
- [ ] Comparison between analyses
- [ ] Batch file processing

## 📄 License

MIT
