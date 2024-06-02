export default defineAppConfig({
  ui: {
    notification: {
      position: "top-0 bottom-auto",
      background: "bg-white dark:bg-[#232324]",
      container: "border border-[#dddddd] dark:border-[#2f2f2f]",
    },
    tabs: {
      wrapper: "relative  space-y-2",
      container: "relative",
      base: "focus:outline-none",
      list: {
        base: "relative flex flex-row gap-2",
        background: "",
        rounded: "rounded-lg",
        shadow: "",
        padding: "",
        height: "",
        width: "",
        marker: {
          wrapper:
            "absolute top-[4px] left-[4px] duration-200 ease-out focus:outline-none",
          base: "border-b-2 border-[#418af4]",
          background: "",
          rounded: "",
          shadow: "shadow-sm",
        },
        tab: {
          base: "relative ui-focus-visible:outline-0 ui-focus-visible:ring-2 ui-focus-visible:ring-primary-500 dark:ui-focus-visible:ring-primary-400 ui-not-focus-visible:outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors duration-200 ease-out",
          background: "bg-transparent",
          active: "dark:text-white text-[#0b5dd7]",
          inactive: "dark:text-[#c9cccf] text-[#595959]",
          height: "h-10",
          padding: "",
          size: "text-md",
          font: "font-medium",
          rounded: "",
          shadow: "",
        },
      },
    },
  },
});
