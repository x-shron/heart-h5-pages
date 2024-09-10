import { Input, Picker, PickerProps } from "antd-mobile";
import React from "react";
import { RightOutline } from 'antd-mobile-icons'
import './index.less'

interface IProps extends PickerProps {
  value?: any;
  onChange?: (value: any) => void;
  placeholder?: string;
}
const InputPicker: React.FC<IProps> = ({
  onChange,
  value,
  placeholder,
  ...restProps
}) => {
  return (
    <>
      <Picker
        value={value }
        onConfirm={onChange}
        {...restProps}
      >
        {(items, { open }) => {
            const valueText = items.map((item) => item?.label).join("-");
        return (
            <div className="input-picker" onClick={open}>
                <Input className="input" readOnly clearable   value={valueText } placeholder={placeholder}  />
                <RightOutline />
            </div>
        )
      }}
      </Picker>
    </>
  );
};

export default InputPicker;
