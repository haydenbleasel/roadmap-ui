'use client';

import { cn } from '@/lib/utils';
import {
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from 'react';

type TabsRootProps = HTMLAttributes<HTMLDivElement> & {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
};

const TabsContext = createContext<{
  selectedTab?: string;
  onTabChange: (value: string) => void;
} | null>(null);

const Tabs = forwardRef<HTMLDivElement, TabsRootProps>(
  (
    { className, defaultValue, value, onValueChange, children, ...props },
    ref
  ) => {
    const [selectedTab, setSelectedTab] = useState(value || defaultValue);

    useEffect(() => {
      if (value !== undefined) {
        setSelectedTab(value);
      }
    }, [value]);

    const handleTabChange = (newValue: string) => {
      if (value === undefined) {
        setSelectedTab(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <TabsContext.Provider
        value={{ selectedTab, onTabChange: handleTabChange }}
      >
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = 'Tabs';

const TabsList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center p-2 bg-secondary text-muted-foreground border-b w-full',
        className
      )}
      {...props}
    />
  )
);
TabsList.displayName = 'TabsList';

type TabsTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
};

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const context = useContext(TabsContext);
    const isActive = context?.selectedTab === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        onClick={() => context?.onTabChange(value)}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          isActive && 'bg-background text-foreground shadow',
          className
        )}
        {...props}
      />
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const context = useContext(TabsContext);
    const isSelected = context?.selectedTab === value;

    return (
      <div
        ref={ref}
        role="tabpanel"
        aria-hidden={!isSelected}
        style={{ display: isSelected ? undefined : 'none' }}
        className={cn(
          'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          className
        )}
        {...props}
      />
    );
  }
);
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
