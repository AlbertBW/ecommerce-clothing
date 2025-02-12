import React from "react";

export default function AdminContentLayout({
  sidebar,
  content,
}: // pageination,
{
  sidebar: React.ReactNode;
  content: React.ReactNode;
  // pageination: React.ReactNode;
}) {
  return (
    <div className="flex">
      {sidebar}
      <section className="flex flex-col w-full max-w-screen-2xl mx-auto overflow-y-visible">
        {content}
      </section>
      {/* {pageination} */}
    </div>
  );
}
