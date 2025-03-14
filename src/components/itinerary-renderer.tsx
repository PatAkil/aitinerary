"use client";

import React, { HTMLAttributes, TableHTMLAttributes } from "react";
import ReactMarkdown from "react-markdown";

interface ItineraryRendererProps {
  content?: string;
}

export function ItineraryRenderer({ content }: ItineraryRendererProps) {
  const renderContent = (content: string) => {
    const CustomTable = (props: TableHTMLAttributes<HTMLTableElement>) => {
      return (
        <div className="overflow-x-auto">
          <table
            className="table-auto border-collapse border border-gray-300"
            {...props}
          >
            {props.children}
          </table>
        </div>
      );
    };

    const CustomHorizontalRule = (props: HTMLAttributes<HTMLHRElement>) => {
      return (
        <hr
          {...props}
          className="border-t-2 border-gray-300 py-4" // Example styles
        />
      );
    };

    const CustomUnorderedList = (props: HTMLAttributes<HTMLUListElement>) => {
      return (
        <ul
          {...props}
          className="list-disc list-inside py-2" // Example styles
        >
          {props.children}
        </ul>
      );
    };

    return (
      <ReactMarkdown
        components={{
          table: CustomTable,
          hr: CustomHorizontalRule,
          ul: CustomUnorderedList,
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  return <div>{content && renderContent(content)}</div>;
}
