import { clsx } from 'clsx';

interface LoadingProps {
  fullScreen?: boolean;
  className?: string;
}

export function Loading({ fullScreen = false, className }: LoadingProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        fullScreen && 'fixed inset-0 bg-white/80 backdrop-blur-sm',
        className
      )}
    >
      <div className="relative">
        <div className="h-16 w-16">
          <div className="absolute h-16 w-16 animate-spin">
            <div className="h-full w-full rounded-full border-4 border-blue-200 opacity-25" />
            <div className="absolute left-0 top-0 h-full w-full rounded-full border-4 border-blue-600 border-t-transparent" />
          </div>
        </div>
        <div className="mt-4 text-center text-sm font-medium text-gray-900">Loading...</div>
      </div>
    </div>
  );
} 