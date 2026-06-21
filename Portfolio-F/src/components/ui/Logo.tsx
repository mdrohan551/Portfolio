export default function Logo() {
    return (
        <div className="inline-flex items-center justify-center gap-1 md:gap-1">
            {/* RO badge */}
            <div className="flex items-center justify-center bg-primary dark:bg-white rounded md:rounded-md px-1 md:px-2 py-1 md:py-2">
                <span className="text-lg  font-medium md:text-4xl text-white dark:text-primary font-jakarta-Regular tracking-tighter leading-none">
                    RO
                </span>
            </div>

            {/* HAN + tagline */}
            <div className="flex flex-col items-center justify-center leading-none">
                <span className="text-lg font-light  md:text-4xl font-jakarta-Regular tracking-tighter leading-none">
                    HAN
                </span>
                <span className="text-[5px] sm:text-[9px]   text-foreground/90 ">
                    WEB DEVELOPER
                </span>
            </div>
        </div>
    );
}
