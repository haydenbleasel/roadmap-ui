import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Range, Root, Thumb, Track } from '@radix-ui/react-slider';
import Color from 'color';
import { PipetteIcon } from 'lucide-react';
import {
  type ComponentProps,
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
  mode: string;
  setHue: (hue: number) => void;
  setSaturation: (saturation: number) => void;
  setLightness: (lightness: number) => void;
  setAlpha: (alpha: number) => void;
  setMode: (mode: string) => void;
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

export type ColorPickerProps = HTMLAttributes<HTMLDivElement> & {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export const ColorPicker = ({
  value,
  defaultValue = 'rgba(0, 0, 0, 1)',
  onChange,
  className,
  ...props
}: ColorPickerProps) => {
  // Parse default values from the defaultValue string
  const defaultColor = Color(defaultValue);
  const defaultHsl = defaultColor.hsl().object();

  const [hue, setHue] = useState(
    value ? Color(value).hsl().hue() : defaultHsl.h || 0
  );
  const [saturation, setSaturation] = useState(
    value ? Color(value).hsl().saturationl() : defaultHsl.s || 100
  );
  const [lightness, setLightness] = useState(
    value ? Color(value).hsl().lightness() : defaultHsl.l || 50
  );
  const [alpha, setAlpha] = useState(value ? Color(value).alpha() * 100 : 100);
  const [mode, setMode] = useState('hex');

  // Update color when controlled value changes
  useEffect(() => {
    if (value) {
      const color = Color(value).hsl().object();
      setHue(color.h || 0);
      setSaturation(color.s || 100);
      setLightness(color.l || 50);
      setAlpha(Color(value).alpha() * 100);
    }
  }, [value]);

  // Notify parent of changes
  useEffect(() => {
    if (onChange) {
      const color = Color.hsl(hue, saturation, lightness).alpha(alpha / 100);
      onChange(color.rgb().toString());
    }
  }, [hue, saturation, lightness, alpha, onChange]);

  return (
    <ColorPickerContext.Provider
      value={{
        hue,
        saturation,
        lightness,
        alpha,
        mode,
        setHue,
        setSaturation,
        setLightness,
        setAlpha,
        setMode,
      }}
    >
      <div
        className={cn(
          'grid w-full gap-4 rounded-md border bg-background p-4 shadow-sm',
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
        'relative aspect-[4/3] w-full cursor-crosshair rounded',
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
      <Track className="relative my-0.5 h-3 w-full grow rounded-full bg-[linear-gradient(90deg,#FF0000,#FFFF00,#00FF00,#00FFFF,#0000FF,#FF00FF,#FF0000)]">
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
      <Track
        className="relative my-0.5 h-3 w-full grow rounded-full"
        style={{
          background:
            'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==") left center',
        }}
      >
        <Range className="absolute h-full rounded-full bg-primary/50" />
      </Track>
      <Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    </Root>
  );
};

export type ColorPickerEyeDropperProps = ComponentProps<typeof Button>;

export const ColorPickerEyeDropper = ({
  className,
  ...props
}: ColorPickerEyeDropperProps) => {
  const { setHue, setSaturation, setLightness, setAlpha } = useColorPicker();

  const handleEyeDropper = async () => {
    try {
      // @ts-ignore - EyeDropper API is experimental
      const eyeDropper = new EyeDropper();
      const result = await eyeDropper.open();
      const color = Color(result.sRGBHex);
      const [h, s, l] = color.hsl().array();

      setHue(h);
      setSaturation(s);
      setLightness(l);
      setAlpha(100);
    } catch (error) {
      console.error('EyeDropper failed:', error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleEyeDropper}
      className={cn('shrink-0 text-muted-foreground', className)}
      {...props}
    >
      <PipetteIcon size={16} />
    </Button>
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

export type ColorPickerOutputProps = ComponentProps<typeof SelectTrigger>;

const formats = ['hex', 'rgb', 'css', 'hsl'];

export const ColorPickerOutput = ({
  className,
  ...props
}: ColorPickerOutputProps) => {
  const { mode, setMode } = useColorPicker();

  return (
    <Select value={mode} onValueChange={setMode}>
      <SelectTrigger className="h-8 w-[4.5rem] shrink-0 text-xs" {...props}>
        <SelectValue placeholder="Mode" />
      </SelectTrigger>
      <SelectContent>
        {formats.map((format) => (
          <SelectItem key={format} value={format}>
            {format.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

type PercentageInputProps = ComponentProps<typeof Input>;

const PercentageInput = ({ className, ...props }: PercentageInputProps) => {
  return (
    <div className="relative">
      <Input
        type="text"
        {...props}
        className={cn(
          'h-8 w-16 rounded-l-none bg-secondary px-2 text-xs shadow-none',
          className
        )}
      />
      <span className="-translate-y-1/2 absolute top-1/2 right-2 text-muted-foreground text-xs">
        %
      </span>
    </div>
  );
};

export type ColorPickerFormatProps = HTMLAttributes<HTMLDivElement>;

export const ColorPickerFormat = ({
  className,
  ...props
}: ColorPickerFormatProps) => {
  const { hue, saturation, lightness, alpha, mode } = useColorPicker();
  const color = Color.hsl(hue, saturation, lightness, alpha / 100);

  if (mode === 'hex') {
    const hex = color.hex();

    return (
      <div
        className={cn('-space-x-px flex items-center shadow-sm', className)}
        {...props}
      >
        <Input
          type="text"
          value={hex}
          className="h-8 rounded-r-none bg-secondary px-2 text-xs shadow-none"
        />
        <PercentageInput value={alpha} />
      </div>
    );
  }

  if (mode === 'rgb') {
    const rgb = color.rgb().array();

    return (
      <div
        className={cn('-space-x-px flex items-center shadow-sm', className)}
        {...props}
      >
        {rgb.map((value, index) => (
          <Input
            key={index}
            type="text"
            value={value}
            className={cn(
              'h-8 rounded-r-none bg-secondary px-2 text-xs shadow-none',
              index && 'rounded-l-none',
              className
            )}
          />
        ))}
        <PercentageInput value={alpha} />
      </div>
    );
  }

  if (mode === 'css') {
    const rgb = color.rgb().array();

    return (
      <div className={cn('shadow-sm', className)} {...props}>
        <Input
          type="text"
          className="h-8 w-24 bg-secondary px-2 text-xs shadow-none"
          value={`rgba(${rgb.join(', ')}, ${alpha}%)`}
          {...props}
        />
      </div>
    );
  }

  if (mode === 'hsl') {
    const hsl = color.hsl().array();

    return (
      <div
        className={cn('-space-x-px flex items-center shadow-sm', className)}
        {...props}
      >
        {hsl.map((value, index) => (
          <Input
            key={index}
            type="text"
            value={value}
            className={cn(
              'h-8 rounded-r-none bg-secondary px-2 text-xs shadow-none',
              index && 'rounded-l-none',
              className
            )}
          />
        ))}
        <PercentageInput value={alpha} />
      </div>
    );
  }

  return null;
};
