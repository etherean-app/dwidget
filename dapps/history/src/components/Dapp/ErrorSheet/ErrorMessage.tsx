import { FunctionalComponent } from "preact";

interface Props {
  error?: string | null;
}

export const ErrorMessage: FunctionalComponent<Props> = ({
  error = "Unknown error",
}) => {
  return (
    <div className="rounded-2xl bg-error-container flex flex-col">
      <div className="flex-col gap-2.5 flex">
        <div className="px-4 py-2 flex">
          <div className="grow shrink basis-0 flex flex-col justify-center">
            <div className="text-black text-xs font-normal font-['Roboto'] leading-none">
              Message
            </div>
            <div className="grow shrink basis-0 text-zinc-800 text-base font-normal font-['Roboto'] leading-normal tracking-wide">
              {error?.toString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
