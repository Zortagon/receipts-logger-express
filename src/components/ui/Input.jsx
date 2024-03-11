import PropTypes from "prop-types";

import { cn } from "../../../lib/utils";

/**
 * InputError Component
 * Renders an error message with an icon.
 *
 * @component
 * @param {string} message - The error message to be displayed.
 * @param {string} [className] - Additional classes to be applied to the label.
 * @returns {JSX.Element} - The JSX element representing the InputError component.
 */
const InputError = ({ message, className }) => {
    return (
        <label className={cn("mt-1 flex items-center text-red-700", className)}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-1 h-3.5 w-3.5"
            >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z"></path>
            </svg>
            <span className={cn("w-full", "select-none text-sm/6 sm:text-xs/6")}>
                {message}
            </span>
        </label>
    );
};

InputError.propTypes = {
    message: PropTypes.string,
    className: PropTypes.string,
};

/**
 * Input Component
 * Renders an input field with optional error message and description.
 *
 * @component
 * @param {string} label - The label text for the input field.
 * @param {boolean} [labelHidden=false] - Whether the label should be hidden.
 * @param {string} [type="text"] - The type of the input field.
 * @param {string} name - The name attribute of the input field.
 * @param {string} id - The id attribute of the input field.
 * @param {string} [placeholder] - The placeholder text for the input field.
 * @param {string} [autoComplete] - The autoComplete attribute for the input field.
 * @param {(string|boolean)} [error=null] - The error message to be displayed, or true if there is an error without a specific message.
 * @param {boolean} [keepErrorField=false] - Whether to keep the error message field after resolving the error.
 * @param {boolean} [disabled=false] - Whether the input field should be disabled.
 * @param {string} [description] - Additional description text for the input field.
 * @param {function} [onChange] - The function to be called when the input value changes.
 * @param {string} [className] - Additional classes to be applied to the container div.
 * @returns {JSX.Element} - The JSX element representing the Input component.
 */
const Input = ({
    label,
    labelHidden = false,
    type = "text",
    name,
    id,
    placeholder,
    autoComplete,
    error = null,
    keepErrorField = false,
    disabled = false,
    description,
    onChange,
    className,
    ...props
}) => {
    return (
        <div className={cn("flex flex-col", className)}>
            <label
                htmlFor={id}
                className={cn(
                    "w-fit select-none text-base/6 font-medium text-zinc-950 sm:text-sm/6",
                    disabled === true && "opacity-75",
                    labelHidden && "sr-only",
                )}
            >
                <span>{label}</span>
            </label>
            <input
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                onChange={onChange}
                className={cn(
                    "relative block",
                    "w-full",
                    "rounded-lg border border-zinc-950/10 outline-none -outline-offset-2",
                    error && "border-red-700",
                    "mt-3",
                    keepErrorField === true && !error && "mb-7",
                    "px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)]",
                    "bg-transparent",
                    "text-base/6 text-zinc-950 sm:text-sm/6",
                    "shadow-sm transition-[outline,border-color]",
                    "hover:border-zinc-950/20",
                    error && "shadow-red-500/10 hover:border-red-700",
                    "focus:outline-blue-500",
                    error && "focus:outline-red-700",
                    "disabled:hover:border-zinc-950/10",
                    "disabled:bg-zinc-950/5",
                    "disabled:cursor-not-allowed disabled:shadow-none",
                )}
                autoComplete={autoComplete}
                disabled={disabled}
                {...props}
            />
            {error && error !== true && <InputError message={error} />}
            {description && (
                <p
                    className={cn(
                        "mt-3",
                        error && "mt-0",
                        "text-base/6 text-zinc-500 sm:text-sm/6",
                    )}
                >
                    {description}
                </p>
            )}
        </div>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    labelHidden: PropTypes.bool,
    type: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    autoComplete: PropTypes.string,
    error: PropTypes.string,
    keepErrorField: PropTypes.bool,
    disabled: PropTypes.bool,
    description: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

export default Input;
