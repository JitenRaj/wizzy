// Main App

import { Header } from './components/Header';
import { InputArea } from './components/InputArea';
import { ChatArea } from './components/ChatArea';

export default function App() {
  return (
    <div className="flex h-screen w-full bg-wizzy-bg overflow-hidden text-wizzy-text-main font-sans">

      <div className="flex-1 flex flex-col h-full relative min-w-0">
        <Header />
        
        <main className="flex-1 overflow-hidden flex flex-col w-full">
           <ChatArea />
        </main>

        <InputArea />
      </div>
    </div>
  );
}