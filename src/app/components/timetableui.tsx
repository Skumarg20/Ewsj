"use client";

import ActionAreaCard from "@/app/components/utils/card";
import TimeTables from "./utils/table";
import TypographyBlockquote from "./utils/quote";


type Props = {
  data: {
    title?: string,
    description?: string,
    schedule?: { [key: string]: string }[];
    quote?: string
  }
};

const header = ["completed","time", "topic","subject", "activity", "notes",];

export default function TimeTable({ data }: Props) {

  
  return (
    <div className="h-auto flex justify-center items-center bg-transparent text-gray-800 pb-8 pt-8">
    <div className="flex w-[70%] flex-col justify-center items-center gap-6">
      <ActionAreaCard
        title={data?.title || "Create your own time table"}
        paragraph={data?.description || "Discipline is the bridge between goals and accomplishments"}

      />
      <TimeTables
        caption="Time is your greatest asset—spend it wisely on your dreams!"
        headers={header}
        data={data?.schedule} 
      />
      <TypographyBlockquote quote={data?.quote || "Default Quote"} />
    </div>
  </div>
  );
}
