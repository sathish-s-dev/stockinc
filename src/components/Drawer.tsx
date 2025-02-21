import { cn } from "@/lib/utils/cn";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideDrawer, showDrawer } from "@/features/drawerSlice";
import { RootState } from "@/store/store";
import { X } from "react-feather";
import { Link } from "react-router";
import { drawerConfig } from "@/config/drawerConfig";

const Drawer = () => {
  const drawerState = useSelector(
    (state: RootState) => state.drawer.drawerState
  );

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < drawerConfig.BREAKPOINT) {
        dispatch(hideDrawer());
      } else {
        dispatch(showDrawer());
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <div
      className={cn(
        "fixed xl:sticky w-full top-0 left-0 z-40 max-w-[250px] h-screen p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800",
        drawerState ? "translate-x-0" : "-translate-x-full"
      )}
      tabIndex={-1}
      aria-labelledby="drawer-label"
    >
      <aside className="w-full py-6 dark:bg-gray-50 dark:text-gray-800">
        <nav className="space-y-8 text-sm">
          {drawerConfig.LINKS.map((section, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" className="w-6" />
                  <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-gray-600">
                    {section.title}
                  </h2>
                </div>
                {index === 0 && (
                  <button onClick={() => dispatch(hideDrawer())}>
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="flex flex-col space-y-1">
                {section.items.map((item, idx) => (
                  <Link
                    key={idx}
                    rel="noopener noreferrer"
                    to={item.path}
                    className="py-2 px-4 hover:bg-slate-900 hover:text-white transition-all duration-300 rounded-md"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default Drawer;
