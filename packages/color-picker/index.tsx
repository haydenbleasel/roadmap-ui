import { cn } from '@/lib/utils';
import { Range, Root, Thumb, Track } from '@radix-ui/react-slider';
import {
  type HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createContext, useContext } from 'react';

interface ColorPickerContextValue {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
  setHue: (hue: number) => void;
  setSaturation: (saturation: number) => void;
  setLightness: (lightness: number) => void;
  setAlpha: (alpha: number) => void;
}

const ColorPickerContext = createContext<ColorPickerContextValue | undefined>(
  undefined
);

export const useColorPicker = () => {
  const context = useContext(ColorPickerContext);

  if (!context) {
    throw new Error('useColorPicker must be used within a ColorPickerProvider');
  }

  return context;
};

export type ColorPickerProps = HTMLAttributes<HTMLDivElement>;

export const ColorPicker = ({ className, ...props }: ColorPickerProps) => {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [alpha, setAlpha] = useState(100);

  return (
    <ColorPickerContext.Provider
      value={{
        hue,
        saturation,
        lightness,
        alpha,
        setHue,
        setSaturation,
        setLightness,
        setAlpha,
      }}
    >
      <div
        className={cn(
          'w-full rounded-md border bg-background p-4 shadow-sm',
          className
        )}
        {...props}
      />
    </ColorPickerContext.Provider>
  );
};

export type ColorPickerSelectionProps = HTMLAttributes<HTMLDivElement>;

export const ColorPickerSelection = ({
  className,
  ...props
}: ColorPickerSelectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { hue, setSaturation } = useColorPicker();

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (!isDragging || !containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(
        0,
        Math.min(1, (event.clientX - rect.left) / rect.width)
      );
      const y = Math.max(
        0,
        Math.min(1, (event.clientY - rect.top) / rect.height)
      );

      setPosition({ x, y });
      setSaturation((1 - y) * 100);
    },
    [isDragging, setSaturation]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', () => setIsDragging(false));
    };
  }, [isDragging, handlePointerMove]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative aspect-[4/3] w-full cursor-crosshair rounded-sm',
        `bg-[linear-gradient(0deg,rgb(0,0,0),transparent),linear-gradient(90deg,rgb(255,255,255),hsl(${hue},100%,50%))]`,
        className
      )}
      onPointerDown={(e) => {
        e.preventDefault();
        setIsDragging(true);
        handlePointerMove(e.nativeEvent);
      }}
      {...props}
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute h-4 w-4 rounded-full border-2 border-white"
        style={{
          left: `${position.x * 100}%`,
          top: `${position.y * 100}%`,
          boxShadow: '0 0 0 1px rgba(0,0,0,0.5)',
        }}
      />
    </div>
  );
};

export type ColorPickerHueProps = HTMLAttributes<HTMLDivElement>;

export const ColorPickerHue = ({
  className,
  ...props
}: ColorPickerHueProps) => {
  const { setHue } = useColorPicker();

  return (
    <Root
      defaultValue={[0]}
      max={360}
      step={1}
      className={cn('relative flex h-4 w-full touch-none', className)}
      onValueChange={([hue]) => setHue(hue)}
      {...props}
    >
      <Track className="relative h-2 w-full grow bg-[linear-gradient(90deg,#FF0000,#FFFF00,#00FF00,#00FFFF,#0000FF,#FF00FF,#FF0000)]">
        <Range className="absolute h-full" />
      </Track>
      <Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    </Root>
  );
};

export type ColorPickerAlphaProps = HTMLAttributes<HTMLDivElement>;

export const ColorPickerAlpha = ({
  className,
  ...props
}: ColorPickerAlphaProps) => {
  const { setAlpha } = useColorPicker();

  return (
    <Root
      defaultValue={[100]}
      max={100}
      step={1}
      className={cn('relative flex h-4 w-full touch-none', className)}
      onValueChange={([alpha]) => setAlpha(alpha)}
      {...props}
    >
      <Track className="relative h-2 w-full grow rounded-full bg-secondary">
        <Range className="absolute h-full rounded-full bg-primary" />
      </Track>
      <Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    </Root>
  );
};

export type ColorPickerPreviewProps = HTMLAttributes<HTMLDivElement>;

export const ColorPickerPreview = ({
  className,
  ...props
}: ColorPickerPreviewProps) => {
  const { hue, saturation, lightness, alpha } = useColorPicker();

  return (
    <div
      className={cn('h-10 w-10 rounded-sm', className)}
      style={{
        backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%, ${alpha}%)`,
      }}
      {...props}
    />
  );
};

export type ColorPickerOutputProps = HTMLAttributes<HTMLDivElement>;

export const ColorPickerOutput = ({
  className,
  ...props
}: ColorPickerOutputProps) => {
  const { hue, saturation, lightness, alpha } = useColorPicker();
  const [mode, setMode] = useState<'hex' | 'rgba' | 'hsla'>('hex');

  // Convert HSL to RGB
  const hslToRgb = useCallback((h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [
      Math.round(255 * f(0)),
      Math.round(255 * f(8)),
      Math.round(255 * f(4)),
    ];
  }, []);

  // Convert RGB to Hex
  const rgbToHex = useCallback((r: number, g: number, b: number) => {
    return (
      '#' +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
    );
  }, []);

  const [r, g, b] = hslToRgb(hue, saturation, lightness);
  const hex = rgbToHex(r, g, b);

  const formats = {
    hex: hex,
    rgba: `rgba(${r}, ${g}, ${b}, ${alpha / 100})`,
    hsla: `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha}%)`,
  };

  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setMode('hex')}
          className={cn(
            'rounded px-2 py-1 text-sm',
            mode === 'hex'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary'
          )}
        >
          HEX
        </button>
        <button
          type="button"
          onClick={() => setMode('rgba')}
          className={cn(
            'rounded px-2 py-1 text-sm',
            mode === 'rgba'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary'
          )}
        >
          RGBA
        </button>
        <button
          type="button"
          onClick={() => setMode('hsla')}
          className={cn(
            'rounded px-2 py-1 text-sm',
            mode === 'hsla'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary'
          )}
        >
          HSLA
        </button>
      </div>
      <div className="font-mono text-sm">{formats[mode]}</div>
    </div>
  );
};
