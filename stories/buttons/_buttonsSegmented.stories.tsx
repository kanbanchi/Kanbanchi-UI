import * as React from "react";
import { Button, ButtonsSegmented } from "../../src/ui";

const Story = () => {
  const [val, setVal] = React.useState(0);
  const [val01, setVal01] = React.useState(1);

  return (
    <div className="page">
      <section>
        <h2>ButtonsSegmented</h2>
        <ButtonsSegmented active={+val} onChange={(i: any) => setVal(i)}>
          <Button>Button 0</Button>
          <Button>Button 1</Button>
          <Button onClick={() => alert(2)}>Button 2</Button>
        </ButtonsSegmented>
        <div hidden={val !== 0} tabIndex={0}>
          Tab 0
        </div>
        <div hidden={val !== 1} tabIndex={0}>
          Tab 1
        </div>
        <div hidden={val !== 2} tabIndex={0}>
          Tab 2
        </div>
      </section>
      <section>
        <h4>Color="black"</h4>

        <ButtonsSegmented
          active={+val01}
          color="black"
          onChange={(i: any) => setVal01(i)}
        >
          <Button>Button 0</Button>
          <Button>Button 1</Button>
        </ButtonsSegmented>
      </section>
      Check empty ButtonsSegmented:
      <ButtonsSegmented active={0} onChange={() => {}}></ButtonsSegmented>
    </div>
  );
};

export default {
  title: "Buttons",
};

export const _ButtonsSegmented = () => <Story />;

_ButtonsSegmented.story = {
  name: "ButtonsSegmented",
};
