import React from "react";

import "./CounterControl.scss";

interface Props {
  clicked: (...args: any[]) => void;
  label: string;
}

const counterControl: React.FC<Props> = ({ clicked, label }) => (
  <div className="CounterControl" onClick={clicked}>
    {label}
  </div>
);

export default counterControl;
