import * as React from "react";
import { ButtonsGroup, Input, Select, SelectList } from "../../src/ui";

const Story = () => {
  const types = [
    //'button',
    //'checkbox',
    //'color',
    //'date',
    "datetime-local",
    "email",
    //'file',
    //'hidden',
    //'image',
    "month",
    "number",
    "password",
    //'radio',
    //'range',
    //'reset',
    "search",
    //'submit',
    "tel",
    "text",
    "time",
    "url",
    //'week'
  ];

  const inputTypes = types.map((type: string) => (
    <Input
      autosize={false}
      label={type}
      type={type}
      key={type}
      style={{ width: 200 }}
    />
  ));

  const selectTypes = types.map((type: string) => (
    <Select
      editable={true}
      label={type}
      type={type}
      key={type}
      onChange={() => {}}
      style={{ width: 200 }}
    >
      <SelectList>
        <li>¯\_(ツ)_/¯</li>
      </SelectList>
    </Select>
  ));
  return (
    <div className="page">
      <section>
        <h2>Input types</h2>

        <p>This matters to phones</p>

        <ButtonsGroup size="large">{inputTypes}</ButtonsGroup>
      </section>

      <section>
        <h2>Select types</h2>
        <ButtonsGroup size="large">{selectTypes}</ButtonsGroup>
      </section>
    </div>
  );
};

export default {
  title: "Controls",
};

export const InputTypes = () => <Story />;

InputTypes.story = {
  name: "InputTypes",
};
