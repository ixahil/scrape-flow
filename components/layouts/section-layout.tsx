import React, { ReactElement, ReactNode } from "react";

type Props = {
  title?: string;
  subTitle?: string;
  button?: ReactNode;
  children: ReactElement;
};

const SectionLayout = ({ title, subTitle, button, children }: Props) => {
  return (
    <section className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          {title && <h1 className="text-3xl font-bold mb-2">{title}</h1>}
          {subTitle && <p className="text-muted-foreground">{subTitle}</p>}
        </div>
        {button && button}
      </div>
      <div className="h-full py-6">{children}</div>
    </section>
  );
};

export default SectionLayout;
