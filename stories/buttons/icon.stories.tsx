import * as React from "react";
import { Button, ButtonsGroup, Icon } from "../../src/ui";

const Story = () => {
  return (
    <div className="page">
      <section>
        <h2>Icon</h2>
        <p>With extended transparent interaction area for touch</p>

        <ButtonsGroup size="large">
          <Button variant="icon" title="Settings">
            <Icon xlink="settings" size={24} />
          </Button>

          <Button variant="icon" title="Disabled" disabled>
            <Icon xlink="settings" size={24} />
          </Button>
        </ButtonsGroup>
      </section>
    </div>
  );
};

export default {
  title: "Buttons",
};

export const _Icon = () => <Story />;
