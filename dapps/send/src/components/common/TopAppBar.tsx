import { ComponentChildren, FunctionComponent } from "preact";
import { Icon } from "./Icon";

interface Props {
  onBackClick: () => void;
  title: string;
  right?: ComponentChildren;
}

// TODO: colors
export const TopAppBar: FunctionComponent<Props> = ({
  onBackClick,
  title,
  right,
}) => {
  return (
    <div className="h-16 px-1 py-2 justify-start items-center gap-1 flex">
      <div
        className="w-12 h-12 flex-col justify-center items-center gap-2.5 inline-flex"
        onClick={onBackClick}
      >
        <div className="rounded-[100px] justify-center items-center gap-2.5 inline-flex">
          <div className="p-2 justify-center items-center gap-2.5 flex">
            <Icon name="arrow_back" className="w-6 h-6 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="grow shrink basis-0 text-slate-900 text-[22px] font-normal font-['Roboto'] leading-7">
        {title}
      </div>
      {right ? (
        <div className="justify-end items-center flex">
          <div className="w-12 h-12 flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="rounded-[100px] justify-center items-center gap-2.5 inline-flex">
              <div className="p-2 justify-center items-center gap-2.5 flex">
                {right}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
