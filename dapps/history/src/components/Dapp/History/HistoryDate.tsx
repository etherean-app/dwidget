import { FunctionalComponent } from "preact";

interface Props {
  date: string;
}

export const HistoryDate: FunctionalComponent<Props> = ({ date }) => {
  return (
    <div className="px-5 py-1 justify-start items-center gap-3 inline-flex">
      <div className="text-black text-xs font-medium font-['Roboto'] leading-none">
        {date === new Date().toDateString() ? "Today" : date}
      </div>
    </div>
  );
};
