"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

function Accordion({
  className,
  ...props
}: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-[#E7EAEE] last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between py-4 sm:py-5 text-left text-[15px] sm:text-base font-semibold text-[#10151C] transition-colors duration-200 hover:text-[#00266A] cursor-pointer group data-[panel-open]:text-[#00266A]",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3 pr-4 flex-1">{children}</div>
        <Plus className="w-5 h-5 text-[#8A94A6] group-hover:text-[#00266A] shrink-0 transition-transform duration-300 ease-in-out group-data-[panel-open]:rotate-45 group-data-[panel-open]:text-[#00266A]" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionPanel({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-panel"
      className={cn(
        "h-[var(--accordion-panel-height)] overflow-hidden text-[14px] sm:text-[14.5px] text-[#5B6572] leading-relaxed transition-[height,opacity] duration-300 ease-in-out data-[starting-style]:h-0 data-[starting-style]:opacity-0 data-[ending-style]:h-0 data-[ending-style]:opacity-0",
        className
      )}
      {...props}
    >
      <div className="pb-5 pt-0">{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
  AccordionPanel as AccordionContent,
};

