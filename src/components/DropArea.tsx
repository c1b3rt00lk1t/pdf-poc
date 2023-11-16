/** In a first mvp the component will have an input that allows to select on pdf file from one folder and stores its content to be able to modify it in a later stage*/

import { ChangeEvent } from "react";

export interface DropAreaProps {
  handleChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
}

const DropArea = ({ handleChangeInput }: DropAreaProps) => {
  return (
    <div>
      <h1>Drop Area</h1>
      <input type="file" onChange={handleChangeInput} />
    </div>
  );
};

export default DropArea;
