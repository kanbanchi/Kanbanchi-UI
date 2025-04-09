import * as React from "react";
import { Checkbox, Button } from "../../src/ui";

const Story = () => {
  const [val, setVal] = React.useState(false);
  const [val01, setVal01] = React.useState(true);
  const [val02, setVal02] = React.useState(false);
  const [val03, setVal03] = React.useState(true);
  const [val04, setVal04] = React.useState(true);
  const [val05, setVal05] = React.useState(false);
  const [val06, setVal06] = React.useState(true);
  const [val07, setVal07] = React.useState(false);

  return (
    <div className="page">
      <section className="section-form-min">
        <h2>Checkbox</h2>

        <Button onClick={() => setVal(!val)}>Toggle</Button>

        <br />
        <br />

        <Checkbox checked={val} onChange={() => setVal(!val)}>
          Label
        </Checkbox>

        <br />

        <Checkbox checked={val01} onChange={() => setVal01(!val01)}>
          Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Checkbox>

        <br />

        <Checkbox checked={val02} onChange={() => setVal02(!val02)} disabled>
          Disabled
        </Checkbox>
      </section>

      <section className="section-form-min">
        <h2>Left</h2>

        <Checkbox
          checked={val}
          direction={"left"}
          isIndeterminate
          onChange={() => setVal(!val)}
        >
          Indeterminate
        </Checkbox>

        <br />

        <Checkbox
          checked={val01}
          direction={"left"}
          onChange={() => setVal01(!val01)}
        >
          Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Checkbox>

        <br />

        <Checkbox
          checked={val02}
          direction={"left"}
          onChange={() => setVal02(!val02)}
          disabled
        >
          Disabled
        </Checkbox>
      </section>

      <section className="section-form-min">
        <h4>Color="black"</h4>
        <Checkbox
          checked={val03}
          color="black"
          onChange={() => setVal03(!val03)}
        >
          Black checkbox
        </Checkbox>

        <br />

        <Checkbox
          checked={val04}
          color="black"
          onChange={() => setVal04(!val04)}
          disabled
        >
          Disabled
        </Checkbox>
      </section>

      <section className="section-form-min">
        <h4>Color="light"</h4>
        <Checkbox
          checked={val05}
          color="light"
          onChange={() => setVal05(!val05)}
        >
          Light checkbox
        </Checkbox>

        <br />

        <Checkbox
          checked={val06}
          color="light"
          onChange={() => setVal06(!val06)}
          disabled
        >
          Disabled
        </Checkbox>

        <Checkbox
          checked={val07}
          color="light"
          onChange={() => setVal06(!val07)}
          disabled
        >
          Disabled
        </Checkbox>
      </section>
    </div>
  );
};

export default {
  title: "Controls",
};

export const _Checkbox = () => <Story />;
