import * as React from "react";
import { Datepicker } from "../../src/ui";

const Story = () => {
  const [date, setDate] = React.useState<Date | null>(null);
  const [date01, setDate01] = React.useState<Date | null>(new Date());
  const [date02, setDate02] = React.useState<Date | null>(new Date());

  return (
    <div className="page">
      <section>
        <h2>Datepicker</h2>
        <Datepicker
          placeholderText={"placeholder"}
          selected={date}
          onChange={(val) => setDate(val)}
        />{" "}
        {date ? date.toString() : "null"}
        <br />
        <br />
        <Datepicker
          dateFormat={"dd.MM.yyyy"}
          editable={false}
          isClearable={false}
          label="Not editable input"
          minDate={new Date("2001-01-01")}
          maxDate={new Date("2049-12-31")}
          popperModifiers={[
            {
              name: "preventOverflow",
              enabled: true,
              options: {
                mainAxis: false,
                altAxis: true,
                altBoundary: true,
              },
            },
          ]}
          popperPlacement="bottom-start"
          readOnly={false}
          selected={date01}
          showMonthDropdown
          showYearDropdown
          onChange={(val) => setDate01(val)}
        />{" "}
        {date01 ? date01.toString() : "null"}
        <br />
        <br />
        <Datepicker
          label="Error"
          selected={date02}
          state={"error"}
          onChange={(val) => setDate02(val)}
        />
        <br />
        <br />
        <Datepicker
          readOnly={true}
          editable={true}
          label="Readonly"
          onChange={() => {}}
        />
        <br />
        <br />
        <Datepicker
          readOnly={true}
          editable={true}
          selected={date01}
          label="Readonly"
          onChange={() => {}}
        />
        <br />
        <br />
        <Datepicker
          disabled={true}
          editable={true}
          label="Disabled"
          onChange={() => {}}
        />
        <br />
        <br />
        <Datepicker
          disabled={true}
          editable={true}
          selected={date01}
          label="Disabled"
          onChange={() => {}}
        />
        <br />
        <br />
      </section>
    </div>
  );
};

export default {
  title: "Controls",
};

export const _Datepicker = () => <Story />;
