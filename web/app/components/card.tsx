export default function Card({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
      <div className={`flex flex-col gap-y-2  dark:from-neutral-800 dark:to-neutral-900 dark:bg-neutral-800 bg-neutral-100 shadow dark:shadow-neutral-900 dark:border-white rounded-md p-2 ${className ?? ''}`}>
        {children}
      </div>
    );
  }