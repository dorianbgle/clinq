import Image from "next/image";
import screen1 from "../../../../public/product-overview.jpg";
import screen4 from "../../../../public/product-vault.jpg";
import screen2 from "../../../../public/screen-2.png";
import screen3 from "../../../../public/screen-3.png";
import screen5 from "../../../../public/screen-5.png";
import { CardStack } from "../card-stack";

export function Screens() {
  return (
    <div className="mt-20 md:mt-[250px] relative pt-12 pb-16" id="overview">
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-center pb-14">
          <h3 className="text-4xl md:text-6xl font-medium">
            Modeling Real-world Scenarios
          </h3>
          <p className="mt-4 text-[#878787]">
            Bridging the gap between textbook knowledge and real-world
            scenarios.
          </p>
        </div>

        <CardStack
          items={[
            {
              id: 1,
              name: "Overview",
              content: (
                <Image
                  quality={100}
                  alt="Dashboard - Overview"
                  src={screen1}
                  width={1031}
                  height={670}
                  priority
                  className="border border-border"
                />
              ),
            },
            {
              id: 2,
              name: "Tracker",
              content: (
                <Image
                  quality={100}
                  alt="Dashboard - Tracker"
                  src={screen2}
                  width={1031}
                  height={670}
                  className="border border-border"
                />
              ),
            },
            {
              id: 3,
              name: "Inbox",
              content: (
                <Image
                  quality={100}
                  alt="Dashboard - Inbox"
                  src={screen3}
                  width={1031}
                  height={670}
                  className="border border-border"
                />
              ),
            },
            {
              id: 4,
              name: "Vault",
              content: (
                <Image
                  quality={100}
                  alt="Dashboard - Vault"
                  src={screen4}
                  width={1031}
                  height={670}
                  className="border border-border"
                />
              ),
            },
            {
              id: 5,
              name: "Dashboard - Transactions",
              content: (
                <Image
                  quality={100}
                  alt="Dashboard - Transactions"
                  src={screen5}
                  width={1031}
                  height={670}
                  className="border border-border"
                />
              ),
            },
          ]}
        />
      </div>

      <div className="dotted-bg absolute w-[10000px] h-full top-0 -left-[5000px]" />
    </div>
  );
}
