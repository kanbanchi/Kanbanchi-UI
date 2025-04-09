import * as React from "react";
import { Button, ButtonsGroup, Icon } from "../../src/ui";

const Story = () => {
  return (
    <div className="page">
      <section>
        <h2>IconText</h2>

        <ButtonsGroup size="large">
          <Button
            style={{ width: "160px" }}
            text="Button text"
            variant="icon-text"
          >
            <Icon xlink="knowlege" size={24} />
          </Button>

          <Button
            disabled
            text="Button text"
            title="Disabled"
            variant="icon-text"
          >
            <Icon xlink="knowlege" size={24} />
          </Button>
        </ButtonsGroup>
      </section>
    </div>
  );
};

export default {
  title: "Buttons",
};

export const IconText = () => <Story />;

IconText.story = {
  name: "IconText",
};
