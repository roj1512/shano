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
          onClick={(e) => (e.target == e.currentTarget) && setVisible(false)}
          className={`h-screen w-full bg-shano-translucent z-[1000] flex items-center justify-center p-3 duration-100 fixed ${
            {
              entering: "opacity-1",
              entered: "opacity-1",
              exiting: "opacity-0",
              exited: "opacity-0",
              unmounted: "",
            }[state]
          }`}
        >
          <div className="rounded-2xl bg-white dark:bg-ourblack p-2 w-full max-w-xl flex flex-col shadow">
            <div
              onClick={() => setVisible(false)}
              className="w-8 h-8 absolute flex items-center justify-center self-end duration-100 hover:bg-[rgba(0,0,0,.05)] dark:hover:bg-[rgba(255,255,255,.05)] rounded-full cursor-pointer"
            >
              <TbX
                size={20}
              />
            </div>
            <div className="items-center mx-auto gap-5 flex flex-col my-20">
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
