// Main App

import { Header } from './components/Header';
import { InputArea } from './components/InputArea';

export default function App() {
  return (
    <div className="flex h-screen w-full bg-wizzy-bg overflow-hidden text-wizzy-text-main">

      <div className="flex-1 flex flex-col h-full relative min-w-0">
        <Header />
        
        <main className="flex-1 overflow-y-auto w-full">
          <div className="flex flex-col items-center justify-center h-full text-wizzy-text-muted">
            <h2 className="text-2xl font-semibold mb-2">How can I help you today?</h2>
            <p className="text-sm">Load a model from the settings to begin.</p>
          </div>
        </main>

        <InputArea />
      </div>
    </div>
  );
}