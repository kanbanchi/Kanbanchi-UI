import * as React from "react";
import { IconsList } from "./utils";
import { EIconSize } from "../../src/ui/icon/types";
import { Icon } from "../../src/ui";

const Story = () => {
  const icons24 = require
    .context("!!@svgr/webpack!./../../src/assets/icons/24/", false, /\.svg$/)
    .keys()
    .map((file) => file.replace(/(\.\/|\.svg$)/g, ""));

  const icons16 = require
    .context("!!@svgr/webpack!./../../src/assets/icons/16/", false, /\.svg$/)
    .keys()
    .map((file) => file.replace(/(\.\/|\.svg$)/g, ""));

  return (
    <div className="page">
      <section>
        <Icon size={16} xlink={"account"} /> 16 account (not exists)
        <br />
        <Icon size={24} xlink={"account"} /> 24 account
        <br />
        <Icon size={16} xlink={"account1"} /> not exists at all
        <br />
        <Icon size={16} xlink={"archive"} /> 16 archive
        <br />
        <Icon size={24} xlink={"archive"} /> 24 archive
      </section>
      <section>
        <h2>16px</h2>
        <div className="icons-grid">
          {IconsList({ arr: icons16, size: EIconSize.SIZE_16 })}
        </div>
      </section>
      <section>
        <h2>24px</h2>
        <div className="icons-grid">
          {IconsList({ arr: icons24, size: EIconSize.SIZE_24 })}
        </div>
      </section>
    </div>
  );
};

export default {
  title: "Icons",
};

export const Small = () => <Story />;
