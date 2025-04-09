import * as React from "react";

const Story = () => {
  return (
    <div className="page">
      <section>
        <h2>TestComponent</h2>
      </section>
    </div>
  );
};

export default {
  title: "WIP",
};

export const TestComponent = () => <Story />;

TestComponent.story = {
  name: "TestComponent",
};
