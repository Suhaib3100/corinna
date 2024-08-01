import React from 'react'
import { ChromePicker } from 'react-color'

type ColorPickerProps = {
  label: string
  color: string
  onChangeComplete: (color: string) => void
}

const ColorPicker = ({ label, color, onChangeComplete }: ColorPickerProps) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <label className="font-medium">{label}</label>
      <ChromePicker
        color={color}
        onChangeComplete={(color) => onChangeComplete(color.hex)}
        disableAlpha
      />
    </div>
  )
}

export default ColorPicker
