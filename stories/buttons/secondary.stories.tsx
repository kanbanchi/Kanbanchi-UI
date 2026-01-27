import * as React from "react";
import { Button, ButtonsGroup } from "../../src/ui";

const Story = () => {
  return (
    <div className="page">
      <section>
        <h2>Secondary</h2>

        <ButtonsGroup size="large">
          <Button variant="secondary" size="large">
            Large
          </Button>
          <Button variant="secondary" size="large" disabled>
            Large Disabled
          </Button>
        </ButtonsGroup>

        <br />

        <ButtonsGroup>
          <Button variant="secondary">Small</Button>
          <Button variant="secondary" disabled>
            Small Disabled
          </Button>
        </ButtonsGroup>
      </section>
    </div>
  );
};

export default {
  title: "Buttons",
};

export const Secondary = () => <Story />;
