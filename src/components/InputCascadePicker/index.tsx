import { Input, CascadePicker, CascadePickerProps } from "antd-mobile";
import React from "react";
import { RightOutline } from 'antd-mobile-icons'
import './index.less'

interface IProps extends CascadePickerProps {
  value?: any;
  onChange?: (value: any) => void;
  placeholder?: string;
}
const InputCascadePicker: React.FC<IProps> = ({
  onChange,
  value,
  placeholder,
  ...restProps
}) => {
  return (
    <>
      <CascadePicker
        value={value }
        onConfirm={onChange}
        {...restProps}
      >
        {(items, { open }) => {
            const valueText = items.map((item) => item?.label).join("-");
        return (
            <div className="input-cascade-picker" onClick={open}>
                <Input className="input" readOnly clearable   value={valueText } placeholder={placeholder}  />
                <RightOutline />
            </div>
        )
      }}
      </CascadePicker>
    </>
  );
};

export default InputCascadePicker;
