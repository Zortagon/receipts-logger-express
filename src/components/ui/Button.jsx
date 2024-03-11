import PropTypes from "prop-types";
import { cn } from "../../../lib/utils";

const Button = ({
    type = "button",
    disabled,
    color = "zinc",
    className,
    onClick = () => {},
    children,
}) => {
    const colorClasses = {
        zinc: cn(
            "border-zinc-950/20 bg-zinc-950 before:bg-zinc-50/10 text-zinc-50",
        ),
        green: cn(
            "border-green-700/20 bg-green-700 before:bg-green-50/10 text-green-50",
        ),
        blue: cn(
            "border-blue-700/20 bg-blue-700 before:bg-blue-50/10 text-blue-50",
        ),
    };
    return (
        <button
            type={type}
            onClick={() => {
                if (!disabled) onClick();
            }}
            className={cn(
                "relative",
                "inline-flex items-center justify-center",
                "w-full",
                "rounded-lg border outline-offset-2 outline-blue-500",
                "px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)]",
                "text-base/6 font-semibold sm:text-sm/6",
                "shadow-[shadow:inset_0_1px_theme(colors.white/15%)]",
                disabled && "cursor-not-allowed select-none opacity-75",
                "hover:before:opacity-100",
                !disabled &&
                    "before:absolute before:inset-0 before:rounded-lg before:opacity-0",
                "before:transition",
                colorClasses[color] ?? colorClasses["zinc"],
                className,
            )}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    type: PropTypes.string,
    disabled: PropTypes.bool,
    color: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node,
};

export default Button;
