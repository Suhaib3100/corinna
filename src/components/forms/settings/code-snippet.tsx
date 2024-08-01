'use client'
import { Section } from '@/components/section-label'
import { useToast } from '@/components/ui/use-toast'
import { Copy } from 'lucide-react'
import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Image from 'next/image'

type Props = {
  id: string
}

const CodeSnippet: React.FC<Props> = ({ id }) => {
  const { toast } = useToast()
  const [selectedOption, setSelectedOption] = useState<'html' | 'react' | 'other'>('html')

  const snippets = {
    html: `
      <iframe src="http://localhost:3000/chatbot" class="chat-frame"></iframe>
      <style>
        .chat-frame {
          position: fixed;
          bottom: 50px;
          right: 50px;
          border: none;
        }
      </style>
      <script>
        window.addEventListener("message", (e) => {
          if(e.origin !== "http://localhost:3000") return;
          const iframe = document.querySelector('.chat-frame');
          const dimensions = JSON.parse(e.data);
          iframe.width = dimensions.width;
          iframe.height = dimensions.height;
          iframe.contentWindow.postMessage("${id}", "http://localhost:3000/");
        });
      </script>
    `,
    react: `
      import React, { useEffect } from 'react';
      
      const ChatBot: React.FC = () => {
        useEffect(() => {
          const iframe = document.createElement("iframe");
          
          const iframeStyles = (styleString: string) => {
            const style = document.createElement('style');
            style.textContent = styleString;
            document.head.append(style);
          }
          
          iframeStyles('
            .chat-frame {
              position: fixed;
              bottom: 50px;
              right: 50px;
              border: none;
            }
          ')
          
          iframe.src = "http://localhost:3000/chatbot";
          iframe.classList.add('chat-frame');
          document.body.appendChild(iframe);
          
          const handleResize = (e: MessageEvent) => {
            if(e.origin !== "http://localhost:3000") return;
            let dimensions = JSON.parse(e.data);
            iframe.width = dimensions.width;
            iframe.height = dimensions.height;
            iframe.contentWindow.postMessage("${id}", "http://localhost:3000/");
          }
          
          window.addEventListener("message", handleResize);
          
          return () => {
            window.removeEventListener("message", handleResize);
          }
        }, []);
      
        return null;
      }
      
      export default ChatBot;
    `,
    other: `
      const iframe = document.createElement("iframe");
      
      const iframeStyles = (styleString: string) => {
        const style = document.createElement('style');
        style.textContent = styleString;
        document.head.append(style);
      }
      
      iframeStyles('
        .chat-frame {
          position: fixed;
          bottom: 50px;
          right: 50px;
          border: none;
        }
      ')
      
      iframe.src = "http://localhost:3000/chatbot";
      iframe.classList.add('chat-frame');
      document.body.appendChild(iframe);
      
      window.addEventListener("message", (e: MessageEvent) => {
        if(e.origin !== "http://localhost:3000") return;
        let dimensions = JSON.parse(e.data);
        iframe.width = dimensions.width;
        iframe.height = dimensions.height;
        iframe.contentWindow.postMessage("${id}", "http://localhost:3000/");
      });
    `
  }

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: 'Copied to clipboard',
      description: 'You can now paste the code inside your website',
    })
  }

  return (
    <div className="mt-10 flex flex-col gap-6 items-start">
      <Section
        label="Code Snippet"
        message="Select the code snippet that matches your website type and copy it to your clipboard."
      />
      <div className="flex mb-5 gap-2">
        <button
          className={`flex items-center px-4 py-2 rounded-l-lg border border-gray-300 transition-transform ${selectedOption === 'html' ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white transform scale-105' : 'bg-white text-gray-700'}`}
          onClick={() => setSelectedOption('html')}
        >
          <Image src="/logos/html.svg" alt="HTML" width={24} height={24} className="mr-2" />
          HTML
        </button>
        <button
          className={`flex items-center px-4 py-2 border border-gray-300 transition-transform ${selectedOption === 'react' ? 'bg-gradient-to-r from-green-500 to-green-400 text-white transform scale-105' : 'bg-white text-gray-700'}`}
          onClick={() => setSelectedOption('react')}
        >
          <Image src="/logos/react-2.svg" alt="React" width={24} height={24} className="mr-2" />
          React
        </button>
        <button
          className={`flex items-center px-4 py-2 rounded-r-lg border border-gray-300 transition-transform ${selectedOption === 'other' ? 'bg-gradient-to-r from-gray-500 to-gray-400 text-white transform scale-105' : 'bg-white text-gray-700'}`}
          onClick={() => setSelectedOption('other')}
        >
          <Image src="/logos/other.svg" alt="Other" width={24} height={24} className="mr-2" />
          Other
        </button>
      </div>
      <div className="relative bg-white shadow-lg rounded-lg p-5 border border-gray-200 transition-transform transform hover:scale-105">
        <Copy
          className="absolute top-3 right-3 text-gray-500 cursor-pointer hover:text-blue-500 transition-transform transform hover:scale-110"
          onClick={() => handleCopy(snippets[selectedOption])}
        />
        <SyntaxHighlighter language="javascript" style={solarizedlight} customStyle={{ padding: '1rem', borderRadius: '0.5rem', background: '#fafafa' }}>
          {snippets[selectedOption]}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default CodeSnippet
