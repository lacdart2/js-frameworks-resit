import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

interface ToastData {
    id: number;
    message: string;
    type: 'add' | 'remove';
}

interface ToastContextType {
    showToast: (message: string, type: 'add' | 'remove') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    const showToast = useCallback((message: string, type: 'add' | 'remove') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);

        // auto hide after 3 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-20 md:bottom-6 right-6 z-50 flex flex-col gap-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium animate-in"
                        style={{
                            background: toast.type === 'add' ? 'var(--accent)' : 'var(--bg-card)',
                            color: toast.type === 'add' ? 'var(--bg-base)' : 'var(--text-primary)',
                            border: '1px solid var(--border)',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                        }}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used inside ToastProvider');
    return context;
}