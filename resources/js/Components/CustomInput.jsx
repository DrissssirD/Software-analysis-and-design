import React from "react";

export default function CustomInput({
    name,
    placeholder,
    value,
    type = "text",
    className = "",
    disabled = false,
    required = false,
    autoComplete,
    onChange,
    error,
    isFocused = false,
}) {
    const input = React.useRef();

    React.useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, [isFocused]);

    return (
        <div className="flex flex-col">
            {name && (
                <label className="text-[#515B6F] text-base font-semibold mb-1" htmlFor={name}>
                    {name}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                type={type}
                name={name}
                value={value}
                className={`
                    border-2 border-[#A8ADB7] 
                    rounded-md
                    sm:w-[408px] h-[50px] 
                    mt-1 sm:px-4 sm:py-3 p-2 
                    w-full
                    focus:border-indigo-500 
                    focus:ring-indigo-500 
                    transition duration-150 ease-in-out
                    disabled:opacity-50
                    ${error ? 'border-red-500' : ''}
                    ${className}
                `}
                placeholder={placeholder}
                ref={input}
                disabled={disabled}
                onChange={onChange}
                required={required}
                autoComplete={autoComplete}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
}