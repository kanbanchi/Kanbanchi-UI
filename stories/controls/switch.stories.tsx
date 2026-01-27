import * as React from "react";
import { Switch } from "../../src/ui";

const Story = () => {
  const [val, setVal] = React.useState(false);
  const [val01, setVal01] = React.useState(true);
  const [val02, setVal02] = React.useState(true);

  return (
    <div className="page">
      <section className="section-form-min">
        <h2>Switch</h2>

        <Switch checked={val} onChange={() => setVal(!val)}>
          01. Label
        </Switch>

        <br />

        <Switch checked={val01} onChange={() => setVal01(!val01)}>
          02. Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Switch>

        <br />

        <Switch checked={val02} onChange={() => setVal02(!val02)} color="black">
          03. Black
        </Switch>

        <br />

        <Switch checked={val02} onChange={() => setVal02(!val02)} disabled>
          04. Disabled
        </Switch>

        <br />

        <Switch
          checked={val02}
          onChange={() => setVal02(!val02)}
          color="black"
          disabled
        >
          05. Disabled black
        </Switch>
      </section>

      <section className="section-form-min">
        <h2>Left</h2>

        <Switch checked={val} direction={"left"} onChange={() => setVal(!val)}>
          01. Label
        </Switch>

        <br />

        <Switch
          checked={val01}
          direction={"left"}
          onChange={() => setVal01(!val01)}
        >
          02. Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Switch>

        <br />

        <Switch
          checked={val02}
          direction={"left"}
          onChange={() => setVal02(!val02)}
          color="black"
        >
          03. Black
        </Switch>

        <br />

        <Switch
          checked={val02}
          direction={"left"}
          onChange={() => setVal02(!val02)}
          disabled
        >
          04. Disabled
        </Switch>

        <br />

        <Switch
          checked={val02}
          direction={"left"}
          onChange={() => setVal02(!val02)}
          color="black"
          disabled
        >
          05. Disabled black
        </Switch>
      </section>
    </div>
  );
};

export default {
  title: "Controls",
};

export const _Switch = () => <Story />;
