import React, { PropsWithChildren } from "react";
import { DemoModal } from "./DemoModal";

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};
export const TechnologyCard = ({
  name,
  description,
  documentation,
  children,
}: TechnologyCardProps & { children?: React.ReactNode }) => {
  return (
    <section className="card">
      <h2 className="name">{name}</h2>
      <p className="description">{description}</p>
      <div className="flex w-full justify-center items-center gap-4">
        <a
          className="link"
          href={documentation}
          target="_blank"
          rel="noreferrer"
        >
          Docs
        </a>
        {children && <DemoModal>{children}</DemoModal>}
      </div>
    </section>
  );
};
