import { useEffect, useState } from "react";
import { TbX } from "react-icons/tb";
import { Transition } from "react-transition-group";
import { useAlert } from "~/contexts/alert";

export default function Alert() {
  const [alert, setAlert] = useAlert();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (alert != null) {
      setVisible(true);
    }
  }, [alert]);

  return (
    <Transition
      in={visible}
      timeout={100}
      unmountOnExit={true}
      onExited={() => setAlert(null)}
    >
      {(state) => (
        <div
          onClick={(e) => e.target == e.currentTarget && setVisible(false)}
          className={`fixed z-[1000] flex h-screen w-full items-center justify-center bg-shano-translucent p-3 duration-100 ${
            {
              entering: "opacity-1",
              entered: "opacity-1",
              exiting: "opacity-0",
              exited: "opacity-0",
              unmounted: "",
            }[state]
          }`}
        >
          <div className="flex w-full max-w-xl flex-col rounded-2xl bg-white p-2 shadow dark:bg-ourblack">
            <div
              onClick={() => setVisible(false)}
              className="absolute flex h-8 w-8 cursor-pointer items-center justify-center self-end rounded-full duration-100 hover:bg-[rgba(0,0,0,.05)] dark:hover:bg-[rgba(255,255,255,.05)]"
            >
              <TbX size={20} />
            </div>
            <div className="mx-auto my-20 flex flex-col items-center gap-5">
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold">{alert?.title}</h1>
                <p>{alert?.body}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
}
