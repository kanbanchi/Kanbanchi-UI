import * as React from "react";
import { Button, ButtonsGroup } from "../../src/ui";

const Story = () => {
  return (
    <div className="page">
      <section>
        <h2>ButtonsGroup</h2>
        <ButtonsGroup>
          <Button>Ok</Button>
          <Button variant="secondary">Cancel</Button>
        </ButtonsGroup>
      </section>

      <section>
        <h4>Size="large"</h4>
        <ButtonsGroup size="large">
          <Button size="large">Ok</Button>
          <Button size="large" variant="secondary">
            Cancel
          </Button>
        </ButtonsGroup>
      </section>
    </div>
  );
};

export default {
  title: "Buttons",
};

export const _ButtonsGroup = () => <Story />;

_ButtonsGroup.story = {
  name: "ButtonsGroup",
};
