import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

interface ToastData {
    id: number;
    message: string;
    type: 'add' | 'remove';
    onUndo?: () => void;
}

interface ToastContextType {
    showToast: (message: string, type: 'add' | 'remove', onUndo?: () => void) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used inside ToastProvider');
    return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    const showToast = useCallback((message: string, type: 'add' | 'remove', onUndo?: () => void) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type, onUndo }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    }, []);

    function dismissToast(id: number) {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div className="fixed bottom-20 md:bottom-6  right-6 z-50 flex flex-col gap-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className="flex items-center justify-between gap-4 pl-4 pr-3 py-3 rounded-lg text-sm font-medium animate-in"
                        style={{
                            background: 'rgba(251,113,133,0.1)',
                            border: '1px solid rgba(251,113,133,0.4)',
                            color: 'var(--accent)',
                        }}
                    >
                        <span>{toast.message}</span>
                        {toast.onUndo && (
                            <button
                                onClick={() => { toast.onUndo?.(); dismissToast(toast.id); }}
                                className="flex items-center text-xs font-bold px-3 py-1.5 rounded-full cursor-pointer transition-transform hover:scale-105 active:scale-95"
                                style={{ color: 'var(--bg-base)', background: 'var(--accent)' }}
                            >
                                undo
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}