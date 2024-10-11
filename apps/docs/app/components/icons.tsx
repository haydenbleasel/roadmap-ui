import { cn } from '@repo/shadcn-ui/lib/utils';
import type { FC, SVGProps } from 'react';

export const RoadmapUiIcon: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => (
  <svg
    fill="none"
    height="48"
    viewBox="0 0 48 48"
    width="48"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className, 'dark:invert')}
    {...props}
  >
    <title>Roadmap UI</title>
    <clipPath id="a">
      <path d="m0 0h48v48h-48z" />
    </clipPath>
    <g clipPath="url(#a)">
      <rect fill="#0ba5ec" height="8" rx="4" width="19" x="5" y="5" />
      <rect fill="#ee46bc" height="8" rx="4" width="33" x="10" y="15" />
      <rect fill="#7a5af8" height="8" rx="4" width="23" x="17" y="25" />
      <rect fill="#17b26a" height="8" rx="4" width="18" x="25" y="35" />
      <rect
        height="47"
        rx="9.5"
        stroke="#000"
        strokeOpacity=".1"
        width="47"
        x=".5"
        y=".5"
      />
    </g>
  </svg>
);

export const TwitterIcon: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => (
  <svg
    height="300.251"
    width="300"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 300 300.251"
    className={cn(className, 'dark:invert')}
    {...props}
  >
    <title>X</title>
    <path d="m178.57 127.15 111.7-127.15h-26.46l-97.03 110.38-77.44-110.38h-89.34l117.13 166.93-117.13 133.32h26.46l102.4-116.59 81.8 116.59h89.34m-263.99-280.71h40.65l187.13 262.13h-40.66" />
  </svg>
);

export const GitHubIcon: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => (
  <svg
    fill="none"
    height="1024"
    viewBox="0 0 1024 1024"
    width="1024"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className, 'dark:invert')}
    {...props}
  >
    <title>GitHub</title>
    <path
      clipRule="evenodd"
      d="m8 0c-4.42 0-8 3.58-8 8 0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38 3.16-1.06 5.45-4.06 5.45-7.59 0-4.42-3.58-8-8-8z"
      fill="#1b1f23"
      fillRule="evenodd"
      transform="scale(64)"
    />
  </svg>
);
