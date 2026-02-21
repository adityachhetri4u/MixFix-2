import Dashboard from './Dashboard';
import type { AudioInfo } from '../App';

interface HomePageProps {
  isAnalyzing: boolean;
  audioUrl: string | null;
  hasLoadedFile: boolean;
  onFileUpload: (file: File) => void;
  onStartAnalysis: () => void;
  fileName?: string;
  audioInfo: AudioInfo | null;
}

export default function HomePage({
  isAnalyzing,
  audioUrl,
  hasLoadedFile,
  onFileUpload,
  onStartAnalysis,
  fileName,
  audioInfo,
}: HomePageProps) {
  return (
    <main className="app-main">
      <Dashboard
        onFileUpload={onFileUpload}
        onStartAnalysis={onStartAnalysis}
        isAnalyzing={isAnalyzing}
        audioUrl={audioUrl}
        hasLoadedFile={hasLoadedFile}
        fileName={fileName}
        audioInfo={audioInfo}
      />
    </main>
  );
}
