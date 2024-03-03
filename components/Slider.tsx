import * as RadixSlider from '@radix-ui/react-slider'

type SliderProps = {
  value?: number
  onChange: (value: number) => void
}

const Slider: React.FC<SliderProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0])
  }
  return (
    <RadixSlider.Root
      className="relative flex h-10 w-28 touch-none select-none items-center"
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
    >
      <RadixSlider.Track className="relative h-1 grow rounded-full bg-neutral-600">
        <RadixSlider.Range className="absolute h-full rounded-full bg-white" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  )
}

export default Slider
