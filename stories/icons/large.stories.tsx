import * as React from "react";
import { IconsList } from "./utils";
import { EIconSize } from "../../src/ui/icon/types";

const Story = () => {
  const icons = require
    .context("!!@svgr/webpack!./../../src/assets/icons/96/", false, /\.svg$/)
    .keys()
    .map((file) => file.replace(/(\.\/|\.svg$)/g, ""));

  return (
    <div className="page">
      <section>
        <h2>96px</h2>
        <div className="icons-grid icons-grid--large">
          {IconsList({ arr: icons, size: EIconSize.SIZE_96 })}
        </div>
      </section>
    </div>
  );
};

export default {
  title: "Icons",
};

export const Large = () => <Story />;
