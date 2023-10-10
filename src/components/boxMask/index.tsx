import React, { CSSProperties, PropsWithChildren } from 'react';
interface Props extends PropsWithChildren {
  id: string;
  style: CSSProperties;
  onClose: () => void;
  className: string;
}

const BoxMask: React.FC<Props> = ({ style, children, className, id, onClose }) => {
  const allStyle: CSSProperties = {
    ...style,
    position: 'fixed',
    background: 'red'
  };

  const onMouseLeave = () => {
    onClose();
  };

  return (
    <div id={id} className={className} style={allStyle} onMouseLeave={onMouseLeave}>
      {children}
    </div>
  );
};

export default BoxMask;
