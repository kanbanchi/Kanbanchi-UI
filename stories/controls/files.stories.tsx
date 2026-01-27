import * as React from "react";
import { Button, ButtonsGroup, Files, Icon } from "../../src/ui";

const Story = () => {
  const files = [
    {
      title: "Board Settings & Card Settings Lorem ipsum dolor sit amet",
      fileId: "1_Te606naPPND9KudtzAaB8bZsQJUu1C02lZOW-XkFhg",
      mimeType: "application/vnd.google-apps.document",
      url: "https://docs.google.com/document/d/1_Te606naPPND9KudtzAaB8bZsQJUu1C02lZOW-XkFhg/edit?usp=drivesdk",
      iconUrl:
        "https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document",
      thumbUrl:
        "https://drive.google.com/thumbnail?authuser=0&sz=w280&id=1_Te606naPPND9KudtzAaB8bZsQJUu1C02lZOW-XkFhg",
      bigThumbUrl:
        "https://drive.google.com/thumbnail?authuser=0&sz=w600&id=1_Te606naPPND9KudtzAaB8bZsQJUu1C02lZOW-XkFhg",
      main: true,
      orderNumber: 0,
      created: 1553758118,
      authorDetails: {
        fullName: "Olga Bakulina",
        initials: "OB",
        photoUrl:
          "https://lh6.googleusercontent.com/-za5-s8hRQ5U/AAAAAAAAAAI/AAAAAAAAAe4/vgDyUvrPWhc/photo.jpg",
        hash: "d01871623bbc11d77306357ce26b51f5",
        allowReports: false,
      },
      isImage: false,
      id: 6389525293826048,
      receiveProperty: [],
    },
    {
      title: "Tooltips.jpg",
      fileId: "1s9x0YkyXuXepYE-RuTkXsuAW9SFCczij",
      mimeType: "image/jpeg",
      url: "https://drive.google.com/a/lar.ru/file/d/1s9x0YkyXuXepYE-RuTkXsuAW9SFCczij/view?usp=drivesdk",
      iconUrl:
        "https://drive-thirdparty.googleusercontent.com/16/type/image/jpeg",
      thumbUrl:
        "https://drive.google.com/thumbnail?authuser=0&sz=w280&id=1s9x0YkyXuXepYE-RuTkXsuAW9SFCczij",
      bigThumbUrl:
        "https://drive.google.com/thumbnail?authuser=0&sz=w600&id=1s9x0YkyXuXepYE-RuTkXsuAW9SFCczij",
      main: false,
      orderNumber: 0,
      thumbWidth: 280,
      thumbHeight: 293,
      created: 1559215029,
      authorDetails: {
        fullName: "Alexey Zhivaikin",
        initials: "AZ",
        photoUrl:
          "https://lh6.googleusercontent.com/-l58Ju67wOHM/AAAAAAAAAAI/AAAAAAAAAA0/21y-bylwJEE/photo.jpg",
        hash: "5c111065ee559223cf6cfaa9b94c73ce",
        allowReports: false,
      },
      isImage: true,
      id: 5261253701009408,
      receiveProperty: [],
    },
  ];

  const cardView = (props: any) => (
    <div className={"kui-files-item"}>
      <span className="kui-files-item__col kui-files-item__col--icon">
        <img src={props.iconUrl} />
      </span>
      <span className="kui-files-item__col kui-files-item__col--title">
        <span className="kui-files-item__title">{props.title}</span>
      </span>
      <span className="kui-files-item__col kui-files-item__col--actions">
        <ButtonsGroup style={{ flexWrap: "nowrap" }}>
          <Button variant="icon">
            <Icon xlink="pin" size={24} />
          </Button>
          <Button variant="icon">
            <Icon xlink="cloud-download" size={24} />
          </Button>
          <Button variant="icon">
            <Icon xlink="delete" size={24} />
          </Button>
        </ButtonsGroup>
      </span>
    </div>
  );

  return (
    <div className="page">
      <section className="section-form-min">
        <h2>Files</h2>

        <Files files={files} onClick={() => console.log("add files click")}>
          Attach files
        </Files>

        <br />
        <br />
        <br />

        <Files
          files={files}
          FileView={cardView}
          onClick={() => console.log("add files click FileView")}
        >
          Attach files
        </Files>

        <br />
        <br />
        <br />

        <Files disabled onClick={() => console.log("add files click disabled")}>
          Disabled
        </Files>
      </section>
    </div>
  );
};

export default {
  title: "Controls",
};

export const _Files = () => <Story />;
