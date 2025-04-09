import * as React from "react";
import { Radio } from "../../src/ui";

const Story = () => {
  const [val, setVal] = React.useState();

  return (
    <div className="page">
      <section className="section-form-min">
        <h2>Radio</h2>
        <Radio
          active={val}
          onChange={(i: any) => {
            setVal(i.index);
            console.log(i.index);
          }}
        >
          <div onClick={() => console.log(0)}>Lorem ipsum</div>
          <div onClick={() => console.log(1)}>Dolor sit amet</div>
          <div onClick={() => console.log(2)} className="cusomClass">
            <b>Consectetur adipiscing elit</b>, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.
          </div>
          <div onClick={() => console.log(3)} className="disabled">
            Disabled
          </div>
        </Radio>
        <br />
        <br />
        Check empty Radio: <Radio onChange={() => {}}></Radio>
      </section>

      <section className="section-form-min">
        <h2>Left</h2>
        <Radio
          active={val}
          direction={"left"}
          onChange={(i: any) => {
            setVal(i.index);
            console.log(i.index);
          }}
        >
          <div onClick={() => console.log(0)}>Lorem ipsum</div>
          <div onClick={() => console.log(1)}>Dolor sit amet</div>
          <div onClick={() => console.log(2)} className="cusomClass">
            <b>Consectetur adipiscing elit</b>, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.
          </div>
          <div onClick={() => console.log(3)} className="disabled">
            Disabled
          </div>
        </Radio>
      </section>
    </div>
  );
};

export default {
  title: "Controls",
};

export const _Radio = () => <Story />;
