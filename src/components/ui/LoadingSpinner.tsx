// simple centered loader
export default function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center w-full py-20">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }}
            />
        </div>
    );
}