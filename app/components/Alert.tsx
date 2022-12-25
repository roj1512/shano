import { TbX } from "react-icons/tb";
import { useAlert } from "~/contexts/alert";

export default function Alert() {
  const [alert, setAlert] = useAlert();

  return (
    <>
      {alert && (
        <div
          onClick={(e) => (e.target == e.currentTarget) && setAlert(null)}
          className="h-screen w-full fixed bg-shano-translucent z-[1000] flex items-center justify-center p-3"
        >
          <div className="rounded-2xl bg-white dark:bg-ourblack p-2 w-full max-w-xl flex flex-col shadow">
            <div className="w-8 h-8 absolute flex items-center justify-center self-end duration-100 hover:bg-[rgba(0,0,0,.05)] dark:hover:bg-[rgba(255,255,255,.05)] rounded-full cursor-pointer">
              <TbX
                size={20}
              />
            </div>
            <div className="items-center mx-auto gap-5 flex flex-col my-14">
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold">{alert.title}</h1>
                <p>{alert?.body}</p>
              </div>
              <button
                onClick={() => setAlert(null)}
                className="duration-100 flex-grow block w-full rounded-full px-5 py-2 bg-[rgba(0,0,0,0.07)] dark:bg-[rgba(255,255,255,0.07)] hover:bg-[rgba(0,0,0,0.15)] dark:hover:bg-[rgba(255,255,255,0.15)] flex items-center justify-center gap-1.5"
              >
                باشە
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
