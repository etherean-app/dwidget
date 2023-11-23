import { FunctionalComponent } from "preact";

export interface HistoryContentProps {
  top: string;
  bottom: string;
  right: string;
}

export const HistoryContent: FunctionalComponent<HistoryContentProps> = ({
  top,
  bottom,
  right,
}) => {
  return (
    <>
      <div className="grow shrink basis-0 self-stretch flex-col justify-center items-start inline-flex">
        <div className="self-stretch text-zinc-700 text-xs font-medium font-['Roboto'] leading-none">
          {top}
        </div>
        <div className="self-stretch text-zinc-900 text-base font-normal font-['Roboto'] leading-normal">
          {bottom}
        </div>
      </div>
      <div className="text-right text-zinc-700 text-[11px] font-medium font-['Roboto'] leading-none">
        {right}
      </div>
    </>
  );
};
