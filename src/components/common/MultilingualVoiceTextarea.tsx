import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Globe, AlertCircle, Sparkles, Volume2 } from 'lucide-react';

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}

export const INDIAN_LANGUAGES: LanguageOption[] = [
  { code: 'en-IN', name: 'English (India)', nativeName: 'English' },
  { code: 'hi-IN', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta-IN', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te-IN', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr-IN', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'bn-IN', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'gu-IN', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn-IN', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml-IN', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa-IN', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'or-IN', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
];

export interface MultilingualVoiceTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  helperText?: string;
  containerClassName?: string;
}

export const MultilingualVoiceTextarea: React.FC<MultilingualVoiceTextareaProps> = ({
  label,
  helperText,
  containerClassName = '',
  value = '',
  onChange,
  placeholder,
  rows = 4,
  required,
  className = '',
  id,
  name,
  disabled,
  ...rest
}) => {
  const [selectedLang, setSelectedLang] = useState<string>('en-IN');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(false);

  const recognitionRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isListeningRef = useRef<boolean>(false);
  const currentValueRef = useRef<string>(String(value));

  // Sync value to ref
  useEffect(() => {
    currentValueRef.current = String(value);
  }, [value]);

  // Check Web Speech API support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      setIsSupported(Boolean(SpeechRecognition));
    }
  }, []);

  // Cleanup recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  const triggerChange = (newText: string) => {
    if (onChange) {
      const syntheticEvent = {
        target: { value: newText, name: name || '' },
        currentTarget: { value: newText, name: name || '' },
      } as React.ChangeEvent<HTMLTextAreaElement>;
      onChange(syntheticEvent);
    }
  };

  const handleAppendText = (transcriptChunk: string) => {
    const trimmedChunk = transcriptChunk.trim();
    if (!trimmedChunk) return;

    const current = currentValueRef.current;
    let nextValue = '';

    if (!current || current.trim().length === 0) {
      nextValue = trimmedChunk;
    } else {
      const needsSpace = !current.endsWith(' ') && !current.endsWith('\n');
      nextValue = `${current}${needsSpace ? ' ' : ''}${trimmedChunk}`;
    }

    currentValueRef.current = nextValue;
    triggerChange(nextValue);
  };

  const stopListening = () => {
    isListeningRef.current = false;
    setIsListening(false);
    setInterimTranscript('');
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
  };

  const startListening = () => {
    setErrorMessage(null);

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLang;

      recognition.onstart = () => {
        isListeningRef.current = true;
        setIsListening(true);
        setErrorMessage(null);
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const trans = event.results[i][0]?.transcript || '';
          if (event.results[i].isFinal) {
            final += trans;
          } else {
            interim += trans;
          }
        }

        if (final) {
          handleAppendText(final);
        }
        setInterimTranscript(interim);
      };

      recognition.onerror = (event: any) => {
        if (event.error === 'no-speech') {
          // No speech detected, keep listening unless user cancels
          return;
        }

        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setErrorMessage('Microphone access was denied. Please allow microphone access in your browser.');
        } else if (event.error === 'network') {
          setErrorMessage('Speech recognition network error. Please check your internet connection.');
        } else if (event.error !== 'aborted') {
          setErrorMessage(`Voice recognition note: ${event.error}`);
        }

        isListeningRef.current = false;
        setIsListening(false);
        setInterimTranscript('');
      };

      recognition.onend = () => {
        setIsListening(false);
        isListeningRef.current = false;
        setInterimTranscript('');
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.warn('Failed to start speech recognition:', err);
      setErrorMessage('Could not initialize voice recognition. Please try typing directly.');
      setIsListening(false);
      isListeningRef.current = false;
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const selectedLangObj = INDIAN_LANGUAGES.find((l) => l.code === selectedLang) || INDIAN_LANGUAGES[0];

  return (
    <div className={`space-y-1.5 ${containerClassName}`}>
      {/* Label and Voice Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {label && (
          <label htmlFor={id} className="block text-xs font-bold text-[#1C252C]">
            {label}
          </label>
        )}

        {/* Multilingual Voice Toolbar (renders only if Web Speech is supported) */}
        {isSupported && (
          <div className="flex items-center gap-2 ml-auto">
            {/* Language Selector Dropdown */}
            <div className="relative inline-flex items-center">
              <label htmlFor={`voice-lang-select-${id || 'default'}`} className="sr-only">
                Select Speech Language
              </label>
              <div className="flex items-center gap-1 px-2 py-1 bg-[#F1F5F8] hover:bg-[#E4ECF2] border border-[#CCD7E0] rounded text-[11px] text-[#12304A] font-medium transition-colors">
                <Globe className="w-3 h-3 text-[#1D60A1] shrink-0" aria-hidden="true" />
                <select
                  id={`voice-lang-select-${id || 'default'}`}
                  value={selectedLang}
                  disabled={isListening || disabled}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="bg-transparent text-[11px] font-semibold text-[#12304A] outline-none cursor-pointer pr-1 disabled:opacity-50"
                  title="Choose input speech language"
                >
                  {INDIAN_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code} className="text-gray-900 bg-white">
                      {lang.nativeName} ({lang.name.split(' ')[0]})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mic Toggle Button */}
            {!isListening ? (
              <button
                type="button"
                onClick={toggleListening}
                disabled={disabled}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#12304A] text-white text-[11px] font-semibold hover:bg-[#0B2235] active:scale-95 transition-all shadow-xs disabled:opacity-50"
                title={`Click to speak in ${selectedLangObj.nativeName}`}
                aria-label={`Start voice input in ${selectedLangObj.name}`}
              >
                <Mic className="w-3.5 h-3.5 text-emerald-300" />
                <span>Speak ({selectedLangObj.nativeName})</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={stopListening}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#8B2626] text-white text-[11px] font-bold hover:bg-[#721E1E] active:scale-95 transition-all animate-pulse shadow-sm"
                title="Stop recording voice"
                aria-label="Stop voice input"
              >
                <MicOff className="w-3.5 h-3.5" />
                <span>Stop Listening</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Active Listening Animated Indicator Banner */}
      {isListening && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center justify-between px-3 py-2 rounded-md bg-rose-50 border border-rose-200 text-xs text-[#8B2626]"
        >
          <div className="flex items-center gap-2.5">
            {/* Pulsing indicator dot */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
            </span>

            <span className="font-semibold text-xs text-[#8B2626]">
              Listening in <strong>{selectedLangObj.nativeName} ({selectedLangObj.name})</strong>... Speak clearly into your mic.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Volume2 className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <button
              type="button"
              onClick={stopListening}
              className="text-[11px] font-bold underline text-[#8B2626] hover:text-[#5E1616]"
            >
              Done speaking
            </button>
          </div>
        </div>
      )}

      {/* Error Message if speech recognition fails or permissions denied */}
      {errorMessage && (
        <div className="flex items-start gap-2 p-2.5 rounded-md bg-[#FFF5F5] border border-[#FED7D7] text-xs text-[#9B2C2C]">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-[11px] font-bold text-[#9B2C2C] hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Textarea Container */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full px-3 py-2 text-sm bg-[#FBFBFA] border border-[#DDE2E4] rounded-md focus:bg-white focus:border-[#12304A] focus:outline-none transition-colors ${
            isListening ? 'border-rose-300 ring-1 ring-rose-200' : ''
          } ${className}`}
          {...rest}
        />

        {/* Live Interim Transcript Bubble Overlay */}
        {isListening && interimTranscript && (
          <div className="absolute bottom-2 left-2 right-2 p-2 rounded bg-[#12304A]/90 backdrop-blur-xs text-white text-xs flex items-center gap-2 shadow-md animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0 animate-spin" />
            <span className="italic truncate text-slate-200 font-medium">
              "{interimTranscript}"
            </span>
          </div>
        )}
      </div>

      {/* Helper text or multilingual accessibility hint */}
      <div className="flex items-center justify-between text-[11px] text-[#5E6B73]">
        {helperText ? <span>{helperText}</span> : <span />}
        {isSupported && !isListening && (
          <span className="text-[11px] text-[#5E6B73] flex items-center gap-1">
            <span>Supports 11 Indian languages via voice dictation</span>
          </span>
        )}
      </div>
    </div>
  );
};
