import * as React from "react";
import { Button } from "../../src/ui";

const Story = () => {
  return (
    <div className="page">
      <section className="section-form-min">
        <h2>Add</h2>

        <Button variant="add">Add button</Button>

        <br />
        <br />

        <Button variant="add" disabled>
          Disabled
        </Button>
      </section>
    </div>
  );
};

export default {
  title: "Buttons",
};

export const Add = () => <Story />;
